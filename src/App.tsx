import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ResearchSection } from './components/layout/ResearchSection';
import { PatientInputForm } from './components/calculator/PatientInputForm';
import { RiskPredictionSummary } from './components/calculator/RiskPredictionSummary';
import { ProgressionChart } from './components/calculator/ProgressionChart';
import { HistoricalLabWork } from './components/calculator/HistoricalLabWork';
import { fetchPrediction } from './api/mockApi';
import type { PatientInputs, PredictionResult, HistoricalEntry } from './types';

function App() {
  const [inputs, setInputs] = useState<PatientInputs>({
    mSpike: 0,
    sflcRatio: 0,
    boneMarrow: 0,
    age: 0,
    creatinine: 0,
    hemoglobin: 0,
  });

  // Default example result data to show on initial load
  const [result, setResult] = useState<PredictionResult>({
    riskLabel: 'INTERMEDIATE RISK',
    riskColor: 'orange',
    dd2dScore: 0.43,
    riskSummary: {
      year1: 6.1,
      year2: 8.4,
      year5: 16.3,
      year10: 34.6,
    },
    progressionChart: [
      { year: 0, predicted: 0, lower: 0, upper: 0 },
      { year: 1, predicted: 6.1, lower: 3.2, upper: 9.8 },
      { year: 2, predicted: 8.4, lower: 5.1, upper: 13.2 },
      { year: 5, predicted: 16.3, lower: 10.5, upper: 23.4 },
      { year: 10, predicted: 34.6, lower: 24.1, upper: 46.2 },
    ],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [historicalEntries, setHistoricalEntries] = useState<HistoricalEntry[]>([]);
  const [historicalResult] = useState<PredictionResult | null>(null);

  const handleInputChange = (field: keyof PatientInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const prediction = await fetchPrediction();
      setResult(prediction);
    } catch (error) {
      console.error('Error fetching prediction:', error);
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
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Hero Section */}
        <section className="mb-3 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent dark:from-primary/25 dark:via-primary/10 dark:to-transparent z-0"></div>
          <div className="relative z-10 px-8 py-6 md:py-8 text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3 leading-tight">
              Welcome to the PANGEA-SMM Calculator
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
              The PANGEA-SMM Model predicts your risk of progression from SMM to multiple myeloma.
              The clinical gold-standard calculator for 20-2-20 criteria is also integrated below for comprehensive assessment.
            </p>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar: Patient Values */}
          <aside className="lg:col-span-3 space-y-6">
            <PatientInputForm
              inputs={inputs}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />

            {/* Historical Lab Work */}
            <HistoricalLabWork
              entries={historicalEntries}
              onAddEntry={handleAddLabEntry}
              onDeleteEntry={handleDeleteLabEntry}
              currentInputs={inputs}
            />
          </aside>

          {/* Main Content: Risk Predictions */}
          <div className="lg:col-span-9 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 20/2/20 Prediction Card */}
              <div className={`md:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border-l-4 border border-slate-200 dark:border-slate-800 ${
                result?.riskColor === 'green' ? 'border-l-green-500' :
                result?.riskColor === 'orange' ? 'border-l-orange-500' :
                result?.riskColor === 'red' ? 'border-l-red-500' :
                'border-l-primary'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-slate-900 dark:text-white">20/2/20 Prediction</h4>
                  {result && (
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
                {result ? (
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    According to the 20/2/20 model, the patient has an <span className={`font-bold ${
                      result.riskColor === 'green' ? 'text-green-600 dark:text-green-400' :
                      result.riskColor === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                      result.riskColor === 'red' ? 'text-red-600 dark:text-red-400' :
                      'text-slate-900 dark:text-white'
                    }`}>{result.riskLabel} (17.9%)</span> risk of progressing to multiple myeloma in two years.
                  </p>
                ) : (
                  <p className="text-sm text-slate-500 text-center py-6">
                    Prediction will appear here
                  </p>
                )}
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium italic">
                  <span className="material-symbols-outlined text-sm">menu_book</span>
                  Ref: Mayo Clinic Proceedings (2020)
                </div>
              </div>

              {/* Risk Prediction Summary Card */}
              <div className="md:col-span-2">
                <RiskPredictionSummary
                  riskLabel={result?.riskLabel || ''}
                  riskColor={result?.riskColor || 'orange'}
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
    </div>
  );
}

export default App;
