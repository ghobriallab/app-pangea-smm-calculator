import { useState } from 'react';
import type { HistoricalEntry, PatientInputs } from '../../types';
import { LabEntryDialog } from './DatePickerDialog';

interface HistoricalLabWorkProps {
  entries: HistoricalEntry[];
  onAddEntry: (entry: HistoricalEntry) => void;
  onDeleteEntry: (index: number) => void;
  currentInputs: PatientInputs;
}

export function HistoricalLabWork({
  entries,
  onAddEntry,
  onDeleteEntry,
  currentInputs,
}: HistoricalLabWorkProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add-current' | 'add-new' | 'edit'>('add-current');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddCurrent = () => {
    setDialogMode('add-current');
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setDialogMode('add-new');
    setEditingIndex(null);
    setIsDialogOpen(true);
  };

  const handleEditEntry = (index: number) => {
    setDialogMode('edit');
    setEditingIndex(index);
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = (date: string, inputs: PatientInputs) => {
    const entry: HistoricalEntry = {
      date,
      mSpike: inputs.mSpike,
      sflcRatio: inputs.sflcRatio,
      age: inputs.age,
    };

    if (dialogMode === 'edit' && editingIndex !== null) {
      const updatedEntries = [...entries];
      updatedEntries[editingIndex] = entry;
      entries.forEach((_, i) => {
        if (i !== editingIndex) return;
        onDeleteEntry(i);
      });
      updatedEntries.forEach(e => onAddEntry(e));
    } else {
      onAddEntry(entry);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between mb-4 hover:opacity-75 transition-opacity"
        >
          <h3 className="text-lg font-bold">Historical Lab Work</h3>
          <span className={`material-symbols-outlined transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </button>
        {isExpanded && (
          <>
            {entries.length === 0 ? (
              <button
                onClick={handleAddCurrent}
                className="w-full px-4 py-3 text-center text-slate-500 font-bold hover:text-primary transition-colors"
              >
                Add current values to history
              </button>
            ) : (
              <>
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {entries.map((entry, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
                      onClick={() => handleEditEntry(idx)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Previous Entry</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteEntry(idx);
                          }}
                          className="text-slate-400 hover:text-red-500 text-sm transition-colors"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                      <p className="text-sm font-medium">{entry.date}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAddNew}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 font-bold hover:border-primary hover:text-primary transition-all"
                >
                  <span className="material-symbols-outlined">add</span>
                  Add Lab Result
                </button>
              </>
            )}
          </>
        )}
      </div>

      <LabEntryDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingIndex(null);
        }}
        onSubmit={handleDialogSubmit}
        initialInputs={
          dialogMode === 'add-current'
            ? currentInputs
            : dialogMode === 'edit' && editingIndex !== null
            ? {
                mSpike: entries[editingIndex].mSpike,
                sflcRatio: entries[editingIndex].sflcRatio || 0,
                age: entries[editingIndex].age || 0,
                boneMarrow: 0,
                creatinine: 0,
                hemoglobin: 0,
              }
            : undefined
        }
        initialDate={dialogMode === 'edit' && editingIndex !== null ? entries[editingIndex].date : undefined}
      />
    </>
  );
}
