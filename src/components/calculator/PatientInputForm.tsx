import type { PatientInputs } from '../../types';

interface PatientInputFormProps {
  inputs: PatientInputs;
  onInputChange: (field: keyof PatientInputs, value: number) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function PatientInputForm({
  inputs,
  onInputChange,
  onSubmit,
  isLoading,
}: PatientInputFormProps) {
  const fields = [
    { label: 'Serum Free Light Chain Ratio', key: 'sflcRatio' as const, placeholder: 'Enter ratio (e.g. 15.5)', required: true },
    { label: 'M-Spike (g/dL)', key: 'mSpike' as const, placeholder: 'e.g. 3.0', required: true },
    { label: 'Creatinine (mg/dL)', key: 'creatinine' as const, placeholder: 'e.g. 1.2', required: true },
    { label: 'Age (years)', key: 'age' as const, placeholder: '65', required: true },
    { label: 'Hemoglobin (g/dL)', key: 'hemoglobin' as const, placeholder: 'e.g. 10.5', required: false },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold mb-6">Current Patient Values</h3>
      <div className="lg:space-y-3 grid lg:grid-cols-1 grid-cols-1 md:grid-cols-3 gap-4">
        {fields.map(({ label, key, placeholder, required }) => (
          <label key={key} className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </span>
            <input
              type="number"
              value={inputs[key] || ''}
              onChange={(e) => onInputChange(key, parseFloat(e.target.value) || 0)}
              placeholder={placeholder}
              required={required}
              className="w-full md:w-auto lg:w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all hover:border-slate-400 dark:hover:border-slate-500"
              disabled={isLoading}
            />
          </label>
        ))}
      </div>

      <div className="flex flex-col lg:flex-col md:flex-row md:items-end md:gap-4">
        {/* Bone Marrow Section */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 lg:border-t lg:pt-4 md:border-t-0 md:pt-8 md:flex-1">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Bone Marrow Biopsy (% Plasma Cells)
            </span>
            <input
              type="number"
              value={inputs.boneMarrow || ''}
              onChange={(e) => onInputChange('boneMarrow', parseFloat(e.target.value) || 0)}
              placeholder="e.g. 15"
              className="w-full md:w-auto lg:w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all hover:border-slate-400 dark:hover:border-slate-500"
              disabled={isLoading}
            />
          </label>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="mt-6 md:mt-0 md:max-w-xs lg:w-full bg-primary text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
        >
          {isLoading ? 'Calculating...' : 'Calculate Risk'}
        </button>
      </div>
    </div>
  );
}
