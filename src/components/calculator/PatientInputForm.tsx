import type { PatientInputs, ValidationState } from '../../types';

interface PatientInputFormProps {
  rawValues: Partial<Record<keyof PatientInputs, string>>;
  validationState: ValidationState;
  onInputChange: (field: keyof PatientInputs, value: string) => void;
  onBlur: (field: keyof PatientInputs, value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  hasErrors: boolean;
  buttonLabel: string;
  isDisabled: boolean;
}

function inputClass(severity: 'error' | 'warning' | undefined): string {
  if (severity === 'error') return 'border-red-500 focus:ring-red-500/50 focus:border-red-500';
  if (severity === 'warning') return 'border-amber-400 focus:ring-amber-400/50 focus:border-amber-400';
  return 'border-slate-300 dark:border-slate-600 focus:ring-primary/50 focus:border-primary hover:border-slate-400 dark:hover:border-slate-500';
}

function ValidationMessage({ field, validationState }: { field: keyof PatientInputs; validationState: ValidationState }) {
  const v = validationState[field];
  if (!v) return null;
  return (
    <p
      id={`${field}-validation`}
      role="alert"
      aria-live="polite"
      className={`text-xs mt-1 flex items-center gap-0.5 ${
        v.severity === 'error' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-500'
      }`}
    >
      {v.severity === 'warning' && (
        <span className="material-symbols-outlined text-sm leading-none">warning</span>
      )}
      {v.severity === 'error' && (
        <span className="material-symbols-outlined text-sm leading-none">error</span>
      )}
      {v.message}
    </p>
  );
}

export function PatientInputForm({
  rawValues,
  validationState,
  onInputChange,
  onBlur,
  onSubmit,
  isLoading,
  hasErrors,
  buttonLabel,
  isDisabled,
}: PatientInputFormProps) {
  const fields = [
    { label: 'Age (years)', key: 'age' as const, placeholder: '65', required: true },
    { label: 'Serum Free Light Chain Ratio', key: 'sflcRatio' as const, placeholder: 'Enter ratio (e.g. 15.5)', required: true },
    { label: 'M-Spike (g/dL)', key: 'mSpike' as const, placeholder: 'e.g. 3.0', required: true },
    { label: 'Creatinine (mg/dL)', key: 'creatinine' as const, placeholder: 'e.g. 1.2', required: true },
    { label: 'Hemoglobin (g/dL)', key: 'hemoglobin' as const, placeholder: 'e.g. 10.5', required: false },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold mb-4">Current Patient Values</h3>
      <div className="flex flex-wrap gap-4 items-start">
        {fields.map(({ label, key, placeholder, required }) => (
          <div key={key} className="min-w-[120px] max-w-[160px] flex-1">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-end mb-1.5 h-8 leading-tight">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </span>
              <div className="relative">
                <input
                  type="number"
                  value={rawValues[key] ?? ''}
                  onChange={(e) => onInputChange(key, e.target.value)}
                  onBlur={(e) => onBlur(key, e.target.value)}
                  placeholder={placeholder}
                  aria-describedby={validationState[key] ? `${key}-validation` : undefined}
                  className={`w-full px-3 py-2 bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:outline-none transition-all ${inputClass(validationState[key]?.severity)}`}
                  disabled={isLoading}
                />
                <div className="absolute top-full left-0 w-full pt-0.5">
                  <ValidationMessage field={key} validationState={validationState} />
                </div>
              </div>
            </label>
          </div>
        ))}

        {/* Bone Marrow field inline */}
        <div className="min-w-[120px] max-w-[160px] flex-1">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-end mb-1.5 h-8 leading-tight">
              Bone Marrow (% Plasma Cells)
            </span>
            <div className="relative">
              <input
                type="number"
                value={rawValues.boneMarrow ?? ''}
                onChange={(e) => onInputChange('boneMarrow', e.target.value)}
                onBlur={(e) => onBlur('boneMarrow', e.target.value)}
                placeholder="e.g. 15"
                aria-describedby={validationState.boneMarrow ? 'boneMarrow-validation' : undefined}
                className={`w-full px-3 py-2 bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:outline-none transition-all ${inputClass(validationState.boneMarrow?.severity)}`}
                disabled={isLoading}
              />
              <div className="absolute top-full left-0 w-full pt-0.5">
                <ValidationMessage field="boneMarrow" validationState={validationState} />
              </div>
            </div>
          </label>
        </div>
        {/* Calculate button aligned with inputs */}
        <div className="ml-auto flex-shrink-0 self-end">
          <button
            onClick={onSubmit}
            disabled={isLoading || isDisabled}
            aria-disabled={hasErrors || isDisabled}
            className={`bg-primary text-white px-6 py-2 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 whitespace-nowrap ${
              isLoading || isDisabled ? 'opacity-50 cursor-not-allowed' : hasErrors ? 'opacity-60' : ''
            }`}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
