import type { PredictionResult } from '../types';

export async function fetchPrediction(): Promise<PredictionResult> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Static realistic mock data
  return {
    riskLabel: 'INTERMEDIATE RISK',
    riskColor: 'orange',
    dd2dScore: 0.43,
    riskSummary: {
      year1: 6.1,
      year2: 8.4,
      year5: 16.3,
      year10: 34.6,
    },
    progressionChart: [
      { year: 0, predicted: 0, lower: 0, upper: 0 },
      { year: 1, predicted: 6.1, lower: 3.2, upper: 9.8 },
      { year: 2, predicted: 8.4, lower: 5.1, upper: 13.2 },
      { year: 5, predicted: 16.3, lower: 10.5, upper: 23.4 },
      { year: 10, predicted: 34.6, lower: 24.1, upper: 46.2 },
    ],
  };
}
