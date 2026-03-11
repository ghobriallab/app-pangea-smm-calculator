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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
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
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all hover:border-slate-400 dark:hover:border-slate-500"
              disabled={isLoading}
            />
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {/* Bone Marrow Section */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Bone Marrow Biopsy (% Plasma Cells)
            </span>
            <input
              type="number"
              value={inputs.boneMarrow || ''}
              onChange={(e) => onInputChange('boneMarrow', parseFloat(e.target.value) || 0)}
              placeholder="e.g. 15"
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all hover:border-slate-400 dark:hover:border-slate-500"
              disabled={isLoading}
            />
          </label>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full bg-primary text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
        >
          {isLoading ? 'Calculating...' : 'Calculate Risk'}
        </button>
      </div>
    </div>
  );
}
