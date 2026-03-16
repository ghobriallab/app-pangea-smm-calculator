import {
  Line,
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ChartDataPoint } from '../../types';

interface ProgressionChartProps {
  data: ChartDataPoint[] | null;
  dynamicData?: ChartDataPoint[] | null;
  riskColor?: string;
  dynamicRiskColor?: string;
}

const PRIMARY_BLUE = '#6B8FC4';

function riskColorToHex(color: string | undefined): string {
  if (color === 'green') return '#16a34a';   // text-green-600
  if (color === 'red') return '#dc2626';     // text-red-600
  if (color === 'orange') return '#ea580c';  // text-orange-600
  return PRIMARY_BLUE;
}

function transformForCIBand(data: ChartDataPoint[], prefix = '') {
  return data.map((pt) => ({
    year: pt.year,
    [`${prefix}predicted`]: pt.predicted,
    [`${prefix}lowerBase`]: pt.lower,
    [`${prefix}band`]: pt.upper - pt.lower,
  }));
}

// Merge static and dynamic arrays by year index
function mergeChartData(
  staticData: ChartDataPoint[],
  dynamicData: ChartDataPoint[] | null | undefined,
) {
  const staticTransformed = transformForCIBand(staticData, '');
  if (!dynamicData || dynamicData.length === 0) return staticTransformed;
  const dynTransformed = transformForCIBand(dynamicData, 'dyn_');
  return staticTransformed.map((pt, i) => ({ ...pt, ...(dynTransformed[i] ?? {}) }));
}

export function ProgressionChart({ data, dynamicData, riskColor, dynamicRiskColor }: ProgressionChartProps) {
  const staticColor = riskColorToHex(riskColor);
  const dynamicColor = riskColorToHex(dynamicRiskColor);
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6 md:mb-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Predicted Progression to Multiple Myeloma</h3>
            <p className="text-sm text-slate-500">Longitudinal projection based on current clinical markers</p>
          </div>
        </div>
        <div className="h-48 sm:h-64 flex items-center justify-center text-slate-400">
          <p>Chart will appear after calculation</p>
        </div>
      </div>
    );
  }

  const chartData = mergeChartData(data, dynamicData);
  const hasDynamic = !!dynamicData && dynamicData.length > 0;

  return (
    <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6 md:mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Predicted Progression to Multiple Myeloma</h3>
          <p className="text-sm text-slate-500">Longitudinal projection based on current clinical markers</p>
        </div>
        <div className="flex items-center">
          <span className="px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-400">Probability %</span>
        </div>
      </div>
      <div className="h-48 sm:h-64 md:h-72 lg:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorBand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={staticColor} stopOpacity={0.2} />
                <stop offset="95%" stopColor={staticColor} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorBandDyn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={dynamicColor} stopOpacity={0.2} />
                <stop offset="95%" stopColor={dynamicColor} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="year"
              type="number"
              domain={[0, 'dataMax']}
              ticks={[0, 1, 2, 5, 10]}
              tickFormatter={(v) => `${v}y`}
            />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <Tooltip
              formatter={(value, name) => {
                if (['lowerBase', 'band', 'dyn_lowerBase', 'dyn_band'].includes(name as string)) return null;
                return [`${(value as number).toFixed(1)}%`, name];
              }}
            />
            {/* Static CI band */}
            <Area type="monotone" dataKey="lowerBase" stackId="ci" fill="transparent" stroke="none" legendType="none" tooltipType="none" name="lowerBase" />
            <Area type="monotone" dataKey="band" stackId="ci" fill="url(#colorBand)" stroke="none" legendType="none" tooltipType="none" name="band" />
            {/* Static mean line */}
            <Line type="monotone" dataKey="predicted" stroke={staticColor} strokeWidth={3} name="Baseline" dot={false} />
            {/* Dynamic CI band */}
            {hasDynamic && <Area type="monotone" dataKey="dyn_lowerBase" stackId="ci2" fill="transparent" stroke="none" legendType="none" tooltipType="none" name="dyn_lowerBase" />}
            {hasDynamic && <Area type="monotone" dataKey="dyn_band" stackId="ci2" fill="url(#colorBandDyn)" stroke="none" legendType="none" tooltipType="none" name="dyn_band" />}
            {/* Dynamic mean line */}
            {hasDynamic && <Line type="monotone" dataKey="dyn_predicted" stroke={dynamicColor} strokeWidth={3} name="Complete" dot={false} strokeDasharray="6 3" />}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 sm:mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2">
          <svg width="24" height="10"><line x1="0" y1="5" x2="24" y2="5" stroke={staticColor} strokeWidth="3" /></svg>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Baseline Prediction</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-3 rounded-sm" style={{ backgroundColor: staticColor, opacity: 0.2 }}></span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">95% CI (Baseline)</span>
        </div>
        {hasDynamic && (
          <>
            <div className="flex items-center gap-2">
              <svg width="24" height="10"><line x1="0" y1="5" x2="24" y2="5" stroke={dynamicColor} strokeWidth="3" strokeDasharray="6 3" /></svg>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Complete Prediction</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-3 rounded-sm" style={{ backgroundColor: dynamicColor, opacity: 0.2 }}></span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">95% CI (Complete)</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
