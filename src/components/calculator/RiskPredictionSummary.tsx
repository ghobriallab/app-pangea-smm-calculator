import type { RiskSummary } from '../../types';

interface RiskPredictionSummaryProps {
  riskLabel: string;
  riskColor: string;
  dd2dScore: number;
  riskSummary: RiskSummary | null;
  historicalRiskSummary?: RiskSummary | null;
}

export function RiskPredictionSummary({
  riskSummary,
  historicalRiskSummary,
}: RiskPredictionSummaryProps) {
  if (!riskSummary) {
    return (
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-sm border-l-4 border-l-emerald-500 border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-start mb-4">
          <h4 className="font-bold text-slate-900 dark:text-white">PANGEA Risk Prediction</h4>
        </div>
        <p className="text-sm text-slate-500 text-center py-6">
          Submit patient values to generate predictions
        </p>
      </div>
    );
  }

  const years = [
    { label: '1 Year', value: riskSummary.year1 },
    { label: '2 Years', value: riskSummary.year2 },
    { label: '5 Years', value: riskSummary.year5 },
    { label: '10 Years', value: riskSummary.year10 },
  ];

  // Always show emerald for low risk as in the mock
  const riskBgColor = 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400';

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border-l-4 border-l-emerald-500 border border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold text-slate-900 dark:text-white">PANGEA Risk Prediction</h4>
        <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full ${riskBgColor}`}>
          Low Risk
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <th className="pb-2 font-black">Timeline</th>
              <th className="pb-2 font-black text-right">
                <span className="sm:hidden">Latest</span>
                <span className="hidden sm:inline">Probability of Progression<br /><span className="text-[9px] font-normal">with latest labwork</span></span>
              </th>
              <th className="pb-2 font-black text-right">
                <span className="sm:hidden">Historical</span>
                <span className="hidden sm:inline">Probability of Progression<br /><span className="text-[9px] font-normal">with history labwork</span></span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {years.map(({ label, value }) => {
              const historicalValue = historicalRiskSummary?.[label.split(' ')[0].toLowerCase() as keyof RiskSummary];
              return (
                <tr key={label}>
                  <td className="py-2.5 font-medium text-slate-900 dark:text-slate-100">{label}</td>
                  <td className="py-2.5 text-right font-bold text-primary">{value.toFixed(1)}%</td>
                  <td className="py-2.5 text-right font-bold text-slate-500 dark:text-slate-400">
                    {historicalValue !== undefined ? `${historicalValue.toFixed(1)}%` : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
