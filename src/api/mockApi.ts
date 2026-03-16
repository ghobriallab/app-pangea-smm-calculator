import type { PatientInputs, PredictionResult, HistoricalEntry } from '../types';

const API_BASE = 'https://api.pangeamodels.org';

export class ApiUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiUnavailableError';
  }
}

function mapCategory(category: string): string {
  return category.toUpperCase() + ' RISK';
}

function mapColor(category: string): string {
  if (category === 'Low') return 'green';
  if (category === 'High') return 'red';
  return 'orange';
}

export async function fetchPrediction(
  inputs: PatientInputs,
  history?: HistoricalEntry[]
): Promise<PredictionResult> {
  const useDynamic = inputs.hemoglobin > 0 && history && history.length > 0;
  const endpoint = useDynamic ? '/calculate-score/dynamic' : '/calculate-score/static';

  const body: Record<string, unknown> = {
    mSpike: inputs.mSpike,
    sflcRatio: inputs.sflcRatio,
    creatinine: inputs.creatinine,
    age: inputs.age,
    boneMarrow: inputs.boneMarrow > 0 ? inputs.boneMarrow : null,
  };

  if (useDynamic) {
    body.hemoglobin = inputs.hemoglobin;
    body.currentDate = new Date().toISOString().split('T')[0];
    body.history = history!.map(entry => ({
      date: entry.rawDate,
      mSpike: entry.mSpike,
      sflcRatio: entry.sflcRatio,
      creatinine: entry.creatinine,
      hemoglobin: entry.hemoglobin,
    }));
  }

  console.log(`[API] POST ${API_BASE}${endpoint}`, body);

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (networkErr) {
    console.error('[API] Network error:', networkErr);
    throw new ApiUnavailableError('Network error: unable to reach the service.');
  }

  if (!response.ok) {
    const text = await response.text();
    console.error(`[API] ${response.status} error:`, text);
    if ([500, 502, 503, 504].includes(response.status)) {
      throw new ApiUnavailableError(`Service unavailable (${response.status})`);
    }
    throw new Error(`API error ${response.status}: ${text}`);
  }

  const data = await response.json();
  console.log('[API] Response:', JSON.stringify(data, null, 2));

  // R serializes single values as arrays — unwrap with [0]
  const v = <T>(x: T | T[]): T => (Array.isArray(x) ? x[0] : x);

  const pangea = data.risk_pangea;
  const score20220 = data.risk_20_2_20;
  const probs = pangea.probabilities;
  const category = v(pangea.category) as string;
  const dd2dCategory = score20220?.category != null ? v(score20220.category) as string : '';

  return {
    riskLabel: mapCategory(category),
    riskColor: mapColor(category),
    dd2dScore: score20220?.reference_2yr_pct != null ? v(score20220.reference_2yr_pct) as number / 100 : 0,
    dd2dLabel: dd2dCategory ? mapCategory(dd2dCategory) : '',
    dd2dColor: dd2dCategory ? mapColor(dd2dCategory) : '',
    riskSummary: {
      year1: (v(probs.year_1.estimate) as number) * 100,
      year2: (v(probs.year_2.estimate) as number) * 100,
      year5: (v(probs.year_5.estimate) as number) * 100,
      year10: (v(probs.year_10.estimate) as number) * 100,
    },
    progressionChart: [
      { year: 0, predicted: 0, lower: 0, upper: 0 },
      ...pangea.curve.map((pt: { x: number | number[]; y: number | number[]; lower: number | number[]; upper: number | number[] }) => ({
        year: v(pt.x) as number,
        predicted: (v(pt.y) as number) * 100,
        lower: (v(pt.lower) as number) * 100,
        upper: (v(pt.upper) as number) * 100,
      })),
    ],
  };
}
