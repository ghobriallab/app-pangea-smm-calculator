import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ResearchSection } from './components/layout/ResearchSection';
import { PatientInputForm } from './components/calculator/PatientInputForm';
import { RiskPredictionSummary } from './components/calculator/RiskPredictionSummary';
import { ProgressionChart } from './components/calculator/ProgressionChart';
import { HistoricalLabWork } from './components/calculator/HistoricalLabWork';
import { fetchPrediction } from './api/mockApi';
import { useValidation } from './hooks/useValidation';
import type { PredictionResult, HistoricalEntry } from './types';

function App() {
  const validation = useValidation();

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (error) {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
      errorTimerRef.current = setTimeout(() => setError(null), 10000);
    }
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, [error]);
  const [historicalEntries, setHistoricalEntries] = useState<HistoricalEntry[]>([]);
  const [historicalResult] = useState<PredictionResult | null>(null);

  const handleSubmit = async () => {
    const isValid = validation.validateAll(validation.rawValues);
    if (!isValid) return;

    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const prediction = await fetchPrediction(validation.getParsedInputs(), historicalEntries);
      setResult(prediction);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLabEntry = (entry: HistoricalEntry) => {
    setHistoricalEntries(prev => [entry, ...prev]);
  };

  const handleDeleteLabEntry = (index: number) => {
    setHistoricalEntries(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <div className="bg-amber-400 text-amber-900 text-center text-sm font-semibold py-2 px-4">
        ⚠ This tool is under active development and is not intended for clinical use.
      </div>
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {/* Sidebar: Patient Values */}
          <aside className="lg:col-span-3 space-y-6">
            <PatientInputForm
              rawValues={validation.rawValues}
              validationState={validation.validationState}
              onInputChange={validation.handleChange}
              onBlur={validation.handleBlur}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              hasErrors={validation.hasErrors}
            />

            {/* Historical Lab Work */}
            <HistoricalLabWork
              entries={historicalEntries}
              onAddEntry={handleAddLabEntry}
              onDeleteEntry={handleDeleteLabEntry}
              currentInputs={validation.getParsedInputs()}
            />
          </aside>

          {/* Main Content: Risk Predictions */}
          <div className="lg:col-span-9 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {/* 20/2/20 Prediction Card */}
              <div className={`md:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border-l-4 border border-slate-200 dark:border-slate-800 ${
                result && result.dd2dScore > 0 && result.riskColor === 'green' ? 'border-l-green-500' :
                result && result.dd2dScore > 0 && result.riskColor === 'orange' ? 'border-l-orange-500' :
                result && result.dd2dScore > 0 && result.riskColor === 'red' ? 'border-l-red-500' :
                'border-l-slate-300 dark:border-l-slate-600'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-slate-900 dark:text-white">20/2/20 Prediction</h4>
                  {result && result.dd2dScore > 0 && (
                    <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full ${
                      result.riskColor === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      result.riskColor === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' :
                      result.riskColor === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                      'bg-primary/15 dark:bg-primary/20 text-primary'
                    }`}>
                      {result.riskLabel}
                    </span>
                  )}
                </div>
                {result && result.dd2dScore > 0 ? (
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    According to the 20/2/20 model, the patient has an <span className={`font-bold ${
                      result.riskColor === 'green' ? 'text-green-600 dark:text-green-400' :
                      result.riskColor === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                      result.riskColor === 'red' ? 'text-red-600 dark:text-red-400' :
                      'text-slate-900 dark:text-white'
                    }`}>{result.riskLabel} ({(result.dd2dScore * 100).toFixed(1)}%)</span> risk of progressing to multiple myeloma in two years.
                  </p>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-500 text-center py-6">
                    {result ? 'Provide bone marrow % to calculate the 20/2/20 score.' : 'Enter patient values and click Calculate Risk to see the prediction.'}
                  </p>
                )}
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium italic">
                  <span className="material-symbols-outlined text-sm">menu_book</span>
                  Ref: Mayo Clinic Proceedings (2020)
                </div>
              </div>

              {/* Risk Prediction Summary Card */}
              <div className="sm:col-span-2 md:col-span-2">
                <RiskPredictionSummary
                  riskLabel={result?.riskLabel || ''}
                  riskColor={result?.riskColor || ''}
                  dd2dScore={result?.dd2dScore || 0}
                  riskSummary={result?.riskSummary || null}
                  historicalRiskSummary={historicalResult?.riskSummary || null}
                />
              </div>
            </div>

            {/* Progression Chart */}
            <ProgressionChart data={result?.progressionChart || null} />

          </div>
        </div>
      </main>

      <ResearchSection />
      <Footer />

      {/* Floating Error Banner */}
      {error && (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full">
          <div className="p-4 bg-red-50 dark:bg-red-900/95 border-t border-red-200 dark:border-red-700 shadow-xl flex items-center gap-3 max-w-7xl mx-auto w-full">
            <span className="material-symbols-outlined text-red-500 dark:text-red-400 mt-0.5 shrink-0">error</span>
            <div className="flex-1">
              <p className="font-semibold text-red-700 dark:text-red-300 text-sm">Unable to calculate risk score</p>
              <p className="text-red-600 dark:text-red-400 text-sm mt-0.5">
                Please check that all required fields are filled in correctly and try again. If the problem persists, the service may be temporarily unavailable.
              </p>
            </div>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 dark:hover:text-red-300 shrink-0 transition-colors">
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
