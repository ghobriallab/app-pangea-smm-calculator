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
    { label: 'Serum Free Light Chain Ratio', key: 'sflcRatio' as const, placeholder: 'Enter ratio (e.g. 15.5)' },
    { label: 'M-Spike (g/dL)', key: 'mSpike' as const, placeholder: 'e.g. 3.0' },
    { label: 'Age (years)', key: 'age' as const, placeholder: '65' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold mb-6">Current Patient Values</h3>
      <div className="space-y-5">
        {fields.map(({ label, key, placeholder }) => (
          <label key={key} className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              {label}
            </span>
            <input
              type="number"
              value={inputs[key] || ''}
              onChange={(e) => onInputChange(key, parseFloat(e.target.value) || 0)}
              placeholder={placeholder}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all hover:border-slate-400 dark:hover:border-slate-500"
              disabled={isLoading}
            />
          </label>
        ))}

        {/* Bone Marrow Section */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <label className="flex items-center gap-3 cursor-pointer group mb-4">
            <input
              type="checkbox"
              className="w-5 h-5 rounded text-primary focus:ring-primary border-slate-300 accent-primary"
              defaultChecked={inputs.boneMarrow > 0}
              onChange={(e) => onInputChange('boneMarrow', e.target.checked ? 1 : 0)}
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
              Bone Marrow Biopsy Taken?
            </span>
          </label>
          <label className={`block pl-8 ${inputs.boneMarrow === 0 ? 'opacity-50' : ''}`}>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              % Plasma Cells
            </span>
            <input
              type="number"
              value={inputs.boneMarrow || ''}
              onChange={(e) => onInputChange('boneMarrow', parseFloat(e.target.value) || 0)}
              placeholder="e.g. 15"
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all hover:border-slate-400 dark:hover:border-slate-500 disabled:opacity-50"
              disabled={inputs.boneMarrow === 0 || isLoading}
            />
          </label>
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
      >
        {isLoading ? 'Calculating...' : 'Calculate Risk'}
      </button>
    </div>
  );
}
