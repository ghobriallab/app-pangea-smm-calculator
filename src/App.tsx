import { useState, useEffect, useRef, useMemo } from 'react';
import { Navbar, type Page } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatIsPangea } from './components/pages/WhatIsPangea';
import { ResearchSection } from './components/layout/ResearchSection';
import { PatientInputForm } from './components/calculator/PatientInputForm';
import { RiskPredictionSummary } from './components/calculator/RiskPredictionSummary';
import { ProgressionChart } from './components/calculator/ProgressionChart';
import { HistoricalLabWork } from './components/calculator/HistoricalLabWork';
import { fetchPrediction, ApiUnavailableError } from './api/mockApi';
import { useValidation } from './hooks/useValidation';
import type { PredictionResult, HistoricalEntry, PatientInputs } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('calculator');
  const validation = useValidation();

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [dynamicResult, setDynamicResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUnavailableError, setIsUnavailableError] = useState(false);
  const [lastCalculatedInputs, setLastCalculatedInputs] = useState<PatientInputs | null>(null);
  const [lastCalculatedEntries, setLastCalculatedEntries] = useState<HistoricalEntry[]>([]);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (error) {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
      errorTimerRef.current = setTimeout(() => setError(null), isUnavailableError ? 30000 : 10000);
    }
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, [error, isUnavailableError]);
  const [historicalEntries, setHistoricalEntries] = useState<HistoricalEntry[]>([]);
  const [currentDate, setCurrentDate] = useState<string>('');

  const handleSubmit = async () => {
    const isValid = validation.validateAll(validation.rawValues, historicalEntries.length > 0);
    if (!isValid) return;

    setIsLoading(true);
    setError(null);
    setIsUnavailableError(false);
    setResult(null);
    setDynamicResult(null);
    try {
      const inputs = validation.getParsedInputs();
      const hasDynamic = inputs.hemoglobin > 0 && historicalEntries.length > 0;
      const [staticPrediction, dynPrediction] = await Promise.all([
        fetchPrediction(inputs, currentDate),
        hasDynamic ? fetchPrediction(inputs, currentDate, historicalEntries) : Promise.resolve(null),
      ]);
      setResult(staticPrediction);
      setDynamicResult(dynPrediction);
      setLastCalculatedInputs(inputs);
      setLastCalculatedEntries([...historicalEntries]);
    } catch (err) {
      console.error('Prediction error:', err);
      if (err instanceof ApiUnavailableError) {
        setIsUnavailableError(true);
        setError('unavailable');
      } else {
        setIsUnavailableError(false);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLabEntry = (entry: HistoricalEntry) => {
    setHistoricalEntries(prev => {
      const next = [entry, ...prev];
      validation.setRequireHemoglobin(next.length > 0);
      return next;
    });
  };

  const handleDeleteLabEntry = (index: number) => {
    setHistoricalEntries(prev => {
      const next = prev.filter((_, i) => i !== index);
      validation.setRequireHemoglobin(next.length > 0);
      return next;
    });
  };

  const handleEditLabEntry = (index: number, entry: HistoricalEntry) => {
    setHistoricalEntries(prev => prev.map((e, i) => (i === index ? entry : e)));
  };

  const hasChangedSinceLastCalc = useMemo(() => {
    if (!lastCalculatedInputs) return true;
    const currentInputs = validation.getParsedInputs();
    return (
      JSON.stringify(currentInputs) !== JSON.stringify(lastCalculatedInputs) ||
      JSON.stringify(historicalEntries) !== JSON.stringify(lastCalculatedEntries)
    );
  }, [validation.rawValues, historicalEntries, lastCalculatedInputs, lastCalculatedEntries]);

  const buttonLabel = isLoading
    ? 'Calculating...'
    : result && !hasChangedSinceLastCalc
    ? 'Score Up to Date'
    : result
    ? 'Update Score'
    : 'Calculate Risk';

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <div className="bg-amber-400 text-amber-900 text-center text-sm font-semibold py-2 px-4">
        ⚠ This tool is under active development and is not intended for clinical use.
      </div>
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      {currentPage === 'what-is-pangea' && <WhatIsPangea />}

      <main className={`flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6${currentPage !== 'calculator' ? ' hidden' : ''}`}>
        {/* Hero Section */}
        <section className="mb-3 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent dark:from-primary/25 dark:via-primary/10 dark:to-transparent z-0"></div>
          <div className="relative z-10 px-4 sm:px-6 md:px-8 py-5 md:py-8 text-center max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-3 leading-tight">
              Welcome to the PANGEA-SMM Calculator
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
              The PANGEA-SMM Model predicts your risk of progression from SMM to multiple myeloma.
              The clinical gold-standard calculator for 20-2-20 criteria is also integrated below for comprehensive assessment.
            </p>
          </div>
        </section>

        {/* Row 1: Current Patient Inputs + Historical Lab Work */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-stretch">
          <div className="flex-1">
            <PatientInputForm
              rawValues={validation.rawValues}
              validationState={validation.validationState}
              onInputChange={validation.handleChange}
              onBlur={validation.handleBlur}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              hasErrors={validation.hasErrors}
              buttonLabel={buttonLabel}
              isDisabled={!hasChangedSinceLastCalc && result !== null}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              hasHistoricalEntries={historicalEntries.length > 0}
            />
          </div>
          <div className="w-full lg:w-fit flex flex-col">
            <HistoricalLabWork
              entries={historicalEntries}
              onAddEntry={handleAddLabEntry}
              onDeleteEntry={handleDeleteLabEntry}
              onEditEntry={handleEditLabEntry}
              currentDate={currentDate}
            />
          </div>
        </div>

        {/* Row 3: Results */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {/* 20/2/20 Prediction Card */}
            {(() => {
              const c = result?.dd2dColor;
              const borderCls = result && result.dd2dScore > 0
                ? c === 'green' ? 'border-l-green-500' : c === 'red' ? 'border-l-red-500' : 'border-l-orange-500'
                : 'border-l-slate-300 dark:border-l-slate-600';
              const badgeCls = c === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : c === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                : c === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                : 'bg-primary/15 dark:bg-primary/20 text-primary';
              const textCls = c === 'green' ? 'text-green-600 dark:text-green-400'
                : c === 'red' ? 'text-red-600 dark:text-red-400'
                : c === 'orange' ? 'text-orange-600 dark:text-orange-400'
                : 'text-slate-900 dark:text-white';
              return (
                <div className={`md:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border-l-4 border border-slate-200 dark:border-slate-800 h-full flex flex-col ${borderCls}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-slate-900 dark:text-white">20/2/20 Prediction</h4>
                    {result && result.dd2dScore > 0 && (
                      <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full ${badgeCls}`}>
                        {result.dd2dLabel}
                      </span>
                    )}
                  </div>
                  {result && result.dd2dScore > 0 ? (
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-1">
                      According to the 20/2/20 model, the patient has an <span className={`font-bold ${textCls}`}>{result.dd2dLabel} ({(result.dd2dScore * 100).toFixed(1)}%)</span> risk of progressing to multiple myeloma in two years.
                    </p>
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-500 text-center py-6 flex-1">
                      {result ? 'Provide bone marrow % to calculate the 20/2/20 score.' : 'Enter patient values and click Calculate Risk to see the prediction.'}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium italic">
                    <span className="material-symbols-outlined text-sm">menu_book</span>
                    Ref: Mayo Clinic Proceedings (2020)
                  </div>
                </div>
              );
            })()}

            {/* Risk Prediction Summary Card */}
            <div className="sm:col-span-2 md:col-span-2 h-full">
              <RiskPredictionSummary
                riskLabel={result?.riskLabel || ''}
                riskColor={result?.riskColor || ''}
                dd2dScore={result?.dd2dScore || 0}
                riskSummary={result?.riskSummary || null}
                historicalRiskSummary={dynamicResult?.riskSummary || null}
                dynamicRiskLabel={dynamicResult?.riskLabel}
                dynamicRiskColor={dynamicResult?.riskColor}
              />
            </div>
          </div>

          {/* Progression Chart */}
          <ProgressionChart data={result?.progressionChart || null} dynamicData={dynamicResult?.progressionChart || null} riskColor={result?.riskColor} dynamicRiskColor={dynamicResult?.riskColor} />
        </div>
      </main>

      {currentPage === 'calculator' && <ResearchSection />}
      <Footer />

      {/* Floating Error Banner */}
      {error && (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full">
          <div className="p-4 bg-red-50 dark:bg-red-900/95 border-t border-red-200 dark:border-red-700 shadow-xl flex items-center gap-3 max-w-7xl mx-auto w-full">
            <span className="material-symbols-outlined text-red-500 dark:text-red-400 mt-0.5 shrink-0">
              {isUnavailableError ? 'cloud_off' : 'error'}
            </span>
            <div className="flex-1">
              <p className="font-semibold text-red-700 dark:text-red-300 text-sm">
                {isUnavailableError ? 'Service temporarily unavailable' : 'Unable to calculate risk score'}
              </p>
              <p className="text-red-600 dark:text-red-400 text-sm mt-0.5">
                {isUnavailableError
                  ? 'The service may be undergoing an update. Please wait a few minutes and try again.'
                  : 'Please check that all required fields are filled in correctly and try again.'}
              </p>
            </div>
            <button onClick={() => { setError(null); setIsUnavailableError(false); }} className="text-red-400 hover:text-red-600 dark:hover:text-red-300 shrink-0 transition-colors">
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
