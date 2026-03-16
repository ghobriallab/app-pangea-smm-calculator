import { useState } from 'react';
import type { PatientInputs } from '../../types';

interface LabEntryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (displayDate: string, rawDate: string, inputs: PatientInputs) => void;
  title?: string;
  initialInputs?: PatientInputs;
  initialDate?: string;
  currentAge?: number;
}

function computeAgeAtDate(currentAge: number, labDateStr: string): number {
  const today = new Date();
  const labDate = new Date(labDateStr);
  const yearDiff = today.getFullYear() - labDate.getFullYear();
  const monthDiff = today.getMonth() - labDate.getMonth();
  // subtract an extra year if we haven't yet reached that month/day this year
  const adj = monthDiff < 0 || (monthDiff === 0 && today.getDate() < labDate.getDate()) ? 1 : 0;
  return Math.max(0, currentAge - yearDiff + adj);
}

export function LabEntryDialog({
  isOpen,
  onClose,
  onSubmit,
  initialInputs,
  initialDate,
  currentAge,
}: LabEntryDialogProps) {
  const getInitialDate = () => {
    if (initialDate) {
      const date = new Date(initialDate);
      return date.toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  };

  const getInitialAge = (dateStr: string) => {
    if (initialInputs?.age && initialInputs.age > 0) return initialInputs.age;
    if (currentAge && currentAge > 0) return computeAgeAtDate(currentAge, dateStr);
    return 0;
  };

  const initialDateStr = getInitialDate();
  const [selectedDate, setSelectedDate] = useState(initialDateStr);
  const [inputs, setInputs] = useState<PatientInputs>(
    initialInputs
      ? { ...initialInputs, age: getInitialAge(initialDateStr) }
      : {
          mSpike: 0,
          sflcRatio: 0,
          boneMarrow: 0,
          age: currentAge && currentAge > 0 ? computeAgeAtDate(currentAge, initialDateStr) : 0,
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

  const handleDateChange = (dateStr: string) => {
    setSelectedDate(dateStr);
    if (currentAge && currentAge > 0 && dateStr) {
      setInputs(prev => ({ ...prev, age: computeAgeAtDate(currentAge, dateStr) }));
    }
  };

  const handleInputChange = (field: keyof PatientInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const canSubmit = fields.every(f => !f.required || (inputs[f.key] ?? 0) > 0) && !!selectedDate;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const date = new Date(selectedDate);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
    onSubmit(formattedDate, selectedDate, inputs);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-5 sm:p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
          {/* Date */}
          <label className="flex flex-col">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 h-8 flex items-end leading-tight">
              Date
            </span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all hover:border-slate-400 dark:hover:border-slate-500"
            />
          </label>

          {/* Age below Date */}
          <label className="flex flex-col">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 h-8 flex items-end leading-tight">
              Age (years)<span className="text-red-500 ml-1">*</span>
            </span>
            <input
              type="number"
              value={inputs.age || ''}
              onChange={(e) => handleInputChange('age', parseFloat(e.target.value) || 0)}
              placeholder="65"
              required
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all hover:border-slate-400 dark:hover:border-slate-500"
            />
          </label>

          {/* Main Fields */}
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

          {/* Bone Marrow */}
          <label className="flex flex-col">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 h-8 flex items-end leading-tight">
              Bone Marrow Biopsy (% Plasma Cells)
            </span>
            <input
              type="number"
              value={inputs.boneMarrow || ''}
              onChange={(e) => handleInputChange('boneMarrow', parseFloat(e.target.value) || 0)}
              placeholder="e.g. 15"
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all hover:border-slate-400 dark:hover:border-slate-500"
            />
          </label>
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
