import { useState } from 'react';
import type { HistoricalEntry, PatientInputs } from '../../types';
import { LabEntryDialog } from './DatePickerDialog';

interface HistoricalLabWorkProps {
  entries: HistoricalEntry[];
  onAddEntry: (entry: HistoricalEntry) => void;
  onDeleteEntry: (index: number) => void;
  onEditEntry: (index: number, entry: HistoricalEntry) => void;
  currentDate: string;
}

export function HistoricalLabWork({
  entries,
  onAddEntry,
  onDeleteEntry,
  onEditEntry,
  currentDate,
}: HistoricalLabWorkProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddNew = () => {
    setEditingIndex(null);
    setIsDialogOpen(true);
  };

  const handleEditEntry = (index: number) => {
    setEditingIndex(index);
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = (date: string, rawDate: string, inputs: PatientInputs) => {
    const entry: HistoricalEntry = {
      date,
      rawDate,
      mSpike: inputs.mSpike,
      sflcRatio: inputs.sflcRatio,
      creatinine: inputs.creatinine,
      hemoglobin: inputs.hemoglobin,
    };

    if (editingIndex !== null) {
      onEditEntry(editingIndex, entry);
    } else {
      onAddEntry(entry);
    }
  };

  const addButton = (
    <button
      onClick={handleAddNew}
      className="shrink-0 flex items-center justify-center gap-1 w-full px-3 py-2 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 text-sm font-bold hover:border-primary hover:text-primary transition-all"
    >
      <span className="material-symbols-outlined text-sm">add</span>
      Add
    </button>
  );

  return (
    <>
      <div className="h-full bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col w-fit">
        <h3 className="text-lg font-bold mb-4 shrink-0">Previous Patient Data</h3>
        {entries.length === 0 ? (
          addButton
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2 mb-3 overflow-y-auto max-h-32 justify-items-start">
              {entries.map((entry, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 px-2 py-1 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 w-fit"
                >
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">{entry.date}</span>
                  <button
                    onClick={() => handleEditEntry(idx)}
                    className="text-slate-400 hover:text-primary transition-colors"
                    title="Edit"
                  >
                    <span className="material-symbols-outlined text-sm leading-none">edit</span>
                  </button>
                  <button
                    onClick={() => onDeleteEntry(idx)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <span className="material-symbols-outlined text-sm leading-none">delete</span>
                  </button>
                </div>
              ))}
            </div>
            {addButton}
          </>
        )}
      </div>

      <LabEntryDialog
        key={isDialogOpen ? `${editingIndex ?? 'new'}` : 'closed'}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingIndex(null);
        }}
        onSubmit={handleDialogSubmit}
        currentDate={currentDate}
        initialInputs={
          editingIndex !== null
            ? {
                mSpike: entries[editingIndex].mSpike,
                sflcRatio: entries[editingIndex].sflcRatio,
                age: 0,
                boneMarrow: 0,
                creatinine: entries[editingIndex].creatinine,
                hemoglobin: entries[editingIndex].hemoglobin,
              }
            : undefined
        }
        initialDate={editingIndex !== null ? entries[editingIndex].rawDate : undefined}
      />
    </>
  );
}
