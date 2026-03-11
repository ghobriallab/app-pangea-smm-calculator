export interface PatientInputs {
  mSpike: number;
  sflcRatio: number;
  boneMarrow: number;
  age: number;
  creatinine: number;
  hemoglobin: number;
}

export interface RiskSummary {
  year1: number;
  year2: number;
  year5: number;
  year10: number;
}

export interface RiskSummaryWithHistory {
  latest: RiskSummary;
  history?: RiskSummary;
}

export interface ChartDataPoint {
  year: number;
  predicted: number;
  lower: number;
  upper: number;
}

export interface PredictionResult {
  riskLabel: string;
  riskColor: string;
  dd2dScore: number;
  riskSummary: RiskSummary;
  progressionChart: ChartDataPoint[];
}

export interface HistoricalEntry {
  date: string;
  mSpike: number;
  sflcRatio?: number;
  age?: number;
}
