import type { RiskSummary } from '../../types';

interface RiskPredictionSummaryProps {
  riskLabel: string;
  riskColor: string;
  dd2dScore: number;
  riskSummary: RiskSummary | null;
  historicalRiskSummary?: RiskSummary | null;
  dynamicRiskLabel?: string;
  dynamicRiskColor?: string;
}

function colorClasses(color: string) {
  if (color === 'green') return {
    border: 'border-l-green-500',
    badge: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    text: 'text-green-600 dark:text-green-400',
  };
  if (color === 'red') return {
    border: 'border-l-red-500',
    badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    text: 'text-red-600 dark:text-red-400',
  };
  if (color === 'orange') return {
    border: 'border-l-orange-500',
    badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    text: 'text-orange-600 dark:text-orange-400',
  };
  return { border: 'border-l-slate-300 dark:border-l-slate-600', badge: '', text: 'text-slate-500' };
}

export function RiskPredictionSummary({
  riskLabel,
  riskColor,
  riskSummary,
  historicalRiskSummary,
  dynamicRiskLabel,
  dynamicRiskColor,
}: RiskPredictionSummaryProps) {
  const staticColors = colorClasses(riskColor);
  const dynamicColors = colorClasses(dynamicRiskColor ?? '');

  if (!riskSummary) {
    return (
      <div className={`bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-sm border-l-4 ${staticColors.border} border border-slate-200 dark:border-slate-800`}>
        <div className="flex justify-between items-start mb-4">
          <h4 className="font-bold text-slate-900 dark:text-white">PANGEA Risk Prediction</h4>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-500 text-center py-6">
          Enter patient values and click Calculate Risk to see the prediction.
        </p>
      </div>
    );
  }

  const years: { label: string; key: keyof RiskSummary }[] = [
    { label: '1 Year', key: 'year1' },
    { label: '2 Years', key: 'year2' },
    { label: '5 Years', key: 'year5' },
    { label: '10 Years', key: 'year10' },
  ];

  return (
    <div className={`bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border-l-4 ${staticColors.border} border border-slate-200 dark:border-slate-800`}>
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold text-slate-900 dark:text-white">PANGEA Risk Prediction</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <th className="pb-2 font-black">Timeline</th>
              <th className="pb-2 font-black text-right">
                <span className="sm:hidden">Baseline</span>
                <span className="hidden sm:inline">Probability of Progression<br /><span className="text-[9px] font-normal">baseline model</span></span>
              </th>
              <th className="pb-2 font-black text-right">
                <span className="sm:hidden">Updated</span>
                <span className="hidden sm:inline">Probability of Progression<br /><span className="text-[9px] font-normal">complete model</span></span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 font-black">Risk</td>
              <td className="py-2 text-right">
                {riskLabel && (
                  <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full ${staticColors.badge}`}>
                    {riskLabel}
                  </span>
                )}
              </td>
              <td className="py-2 text-right">
                {dynamicRiskLabel ? (
                  <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full ${dynamicColors.badge}`}>
                    {dynamicRiskLabel}
                  </span>
                ) : (
                  <span className="text-slate-400 dark:text-slate-600">-</span>
                )}
              </td>
            </tr>
            {years.map(({ label, key }) => {
              const value = riskSummary[key];
              const historicalValue = historicalRiskSummary?.[key];
              return (
                <tr key={label}>
                  <td className="py-2.5 font-medium text-slate-900 dark:text-slate-100">{label}</td>
                  <td className={`py-2.5 text-right font-bold ${staticColors.text}`}>{value.toFixed(1)}%</td>
                  <td className={`py-2.5 text-right font-bold ${historicalValue !== undefined ? dynamicColors.text : 'text-slate-400 dark:text-slate-600'}`}>
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
