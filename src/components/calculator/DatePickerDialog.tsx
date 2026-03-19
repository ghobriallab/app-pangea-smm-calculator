import { useState } from 'react';
import type { PatientInputs } from '../../types';

interface LabEntryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (displayDate: string, rawDate: string, inputs: PatientInputs) => void;
  title?: string;
  initialInputs?: PatientInputs;
  initialDate?: string; // YYYY-MM-DD stored in entry, we use YYYY-MM for the picker
  currentDate: string; // YYYY-MM — most recent observation date for validation
}

function isDateInRange(selectedMonth: string, currentDate: string): boolean {
  if (!selectedMonth || !currentDate) return false;
  const [selYear, selMonth] = selectedMonth.split('-').map(Number);
  const [curYear, curMonth] = currentDate.split('-').map(Number);
  const selTotal = selYear * 12 + selMonth;
  const curTotal = curYear * 12 + curMonth;
  // must be strictly before current month and within 24 months
  return selTotal < curTotal && curTotal - selTotal <= 24;
}

export function LabEntryDialog({
  isOpen,
  onClose,
  onSubmit,
  initialInputs,
  initialDate,
  currentDate,
}: LabEntryDialogProps) {
  const toMonthStr = (dateStr?: string) => {
    if (!dateStr) return '';
    return dateStr.substring(0, 7); // YYYY-MM
  };

  const [selectedMonth, setSelectedMonth] = useState(toMonthStr(initialDate));
  const [inputs, setInputs] = useState<PatientInputs>(
    initialInputs ?? {
      mSpike: 0,
      sflcRatio: 0,
      boneMarrow: 0,
      age: 0,
      creatinine: 0,
      hemoglobin: 0,
    }
  );

  const fields = [
    { label: 'Serum Free Light Chain Ratio', key: 'sflcRatio' as const, placeholder: 'Enter ratio (e.g. 15.5)', required: true },
    { label: 'M-Spike (g/dL)', key: 'mSpike' as const, placeholder: 'e.g. 3.0', required: true },
    { label: 'Creatinine (mg/dL)', key: 'creatinine' as const, placeholder: 'e.g. 1.2', required: true },
    { label: 'Hemoglobin (g/dL)', key: 'hemoglobin' as const, placeholder: 'e.g. 10.5', required: true },
  ];

  const handleInputChange = (field: keyof PatientInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const dateValid = isDateInRange(selectedMonth, currentDate);
  const dateError = selectedMonth && !dateValid
    ? 'Date must be within 2 years before the most recent observation date'
    : null;

  const canSubmit =
    dateValid &&
    fields.every(f => !f.required || (inputs[f.key] ?? 0) > 0);

  const handleSubmit = () => {
    if (!canSubmit) return;
    const [year, month] = selectedMonth.split('-').map(Number);
    const formattedDate = new Date(year, month - 1).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
    onSubmit(formattedDate, `${selectedMonth}-01`, inputs);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 px-0 sm:px-4">
      <div className="bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl shadow-lg p-4 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {initialDate ? 'Edit Past Entry' : 'Add Past Entry'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
          {/* Month/Year picker */}
          <div className="sm:col-span-1">
            <label className="flex flex-col">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 h-8 flex items-end leading-tight">
                Date (Month &amp; Year)<span className="text-red-500 ml-1">*</span>
              </span>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                max={currentDate || undefined}
                className={`w-full px-3 py-2 bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:outline-none transition-all ${
                  dateError
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-slate-300 dark:border-slate-600 focus:ring-primary/50 focus:border-primary hover:border-slate-400 dark:hover:border-slate-500'
                }`}
              />
              {dateError && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-start gap-0.5">
                  <span className="material-symbols-outlined text-sm leading-none shrink-0">error</span>
                  {dateError}
                </p>
              )}
            </label>
          </div>

          {/* Main fields */}
          {fields.map(({ label, key, placeholder, required }) => (
            <label key={key} className="flex flex-col">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 h-8 flex items-end leading-tight">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </span>
              <input
                type="number"
                value={inputs[key] || ''}
                onChange={(e) => handleInputChange(key, parseFloat(e.target.value) || 0)}
                placeholder={placeholder}
                required={required}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all hover:border-slate-400 dark:hover:border-slate-500"
              />
            </label>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
