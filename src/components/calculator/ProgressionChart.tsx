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
}

const PRIMARY_BLUE = '#6B8FC4';

// Transform data so Recharts can render a CI band via stacked areas:
// "lowerBase" = lower bound value (filled transparent)
// "band" = upper - lower (the visible CI region on top)
function transformForCIBand(data: ChartDataPoint[]) {
  return data.map((pt) => ({
    ...pt,
    lowerBase: pt.lower,
    band: pt.upper - pt.lower,
  }));
}

export function ProgressionChart({ data }: ProgressionChartProps) {
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

  const chartData = transformForCIBand(data);

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
                <stop offset="5%" stopColor={PRIMARY_BLUE} stopOpacity={0.2} />
                <stop offset="95%" stopColor={PRIMARY_BLUE} stopOpacity={0.05} />
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
                if (name === 'lowerBase' || name === 'band') return null;
                return [`${(value as number).toFixed(1)}%`, name];
              }}
            />
            {/* Transparent base up to lower CI bound */}
            <Area
              type="monotone"
              dataKey="lowerBase"
              stackId="ci"
              fill="transparent"
              stroke="none"
              legendType="none"
              tooltipType="none"
              name="lowerBase"
            />
            {/* Visible CI band from lower to upper */}
            <Area
              type="monotone"
              dataKey="band"
              stackId="ci"
              fill="url(#colorBand)"
              stroke="none"
              legendType="none"
              tooltipType="none"
              name="band"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke={PRIMARY_BLUE}
              strokeWidth={3}
              name="Predicted"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 sm:mt-6 md:mt-8 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary"></span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Mean Prediction</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary/20"></span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">95% Confidence Interval</span>
        </div>
      </div>
    </div>
  );
}
