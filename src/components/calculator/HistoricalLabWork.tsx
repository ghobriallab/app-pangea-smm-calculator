import type { HistoricalEntry, PatientInputs } from '../../types';

interface HistoricalLabWorkProps {
  entries: HistoricalEntry[];
  onAddEntry: (inputs: PatientInputs) => void;
  currentInputs: PatientInputs;
}

export function HistoricalLabWork({
  entries,
  onAddEntry,
  currentInputs,
}: HistoricalLabWorkProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold mb-6">Historical Lab Work</h3>
      {entries.length > 0 && (
        <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
          {entries.map((entry, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Previous Entry</span>
                <button className="text-slate-400 hover:text-red-500 text-sm">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Date</p>
                  <p className="text-sm font-medium">{entry.date}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">M-Spike</p>
                  <p className="text-sm font-medium">{entry.mSpike.toFixed(1)} g/dL</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => onAddEntry(currentInputs)}
        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 font-bold hover:border-primary hover:text-primary transition-all"
      >
        <span className="material-symbols-outlined">add</span>
        Add Lab Result
      </button>
    </div>
  );
}
