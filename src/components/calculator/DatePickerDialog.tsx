import { useState } from 'react';
import type { PatientInputs } from '../../types';

interface LabEntryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (displayDate: string, rawDate: string, inputs: PatientInputs) => void;
  title?: string;
  initialInputs?: PatientInputs;
  initialDate?: string;
}

export function LabEntryDialog({
  isOpen,
  onClose,
  onSubmit,
  initialInputs,
  initialDate,
}: LabEntryDialogProps) {
  const getInitialDate = () => {
    if (initialDate) {
      const date = new Date(initialDate);
      return date.toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState(getInitialDate());
  const [inputs, setInputs] = useState<PatientInputs>(
    initialInputs || {
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
    { label: 'Age (years)', key: 'age' as const, placeholder: '65', required: true },
    { label: 'Hemoglobin (g/dL)', key: 'hemoglobin' as const, placeholder: 'e.g. 10.5', required: false },
  ];

  const handleInputChange = (field: keyof PatientInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
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
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-5 sm:p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="space-y-3">
          {/* Date */}
          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Date
            </span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all hover:border-slate-400 dark:hover:border-slate-500"
            />
          </label>

          {/* Main Fields */}
          {fields.map(({ label, key, placeholder, required }) => (
            <label key={key} className="block">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
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

          {/* Bone Marrow Section */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
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
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
