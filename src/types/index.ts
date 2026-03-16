export type ValidationSeverity = 'error' | 'warning';

export interface FieldValidation {
  severity: ValidationSeverity;
  message: string;
}

export type ValidationState = Partial<Record<keyof PatientInputs, FieldValidation>>;

export interface FieldRange {
  min?: number;
  max?: number;
  warnLow?: number;
  warnHigh?: number;
  required?: boolean;
  integer?: boolean;
  label: string;
}

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
  dd2dLabel: string;
  dd2dColor: string;
  riskSummary: RiskSummary;
  progressionChart: ChartDataPoint[];
}

export interface HistoricalEntry {
  date: string;
  rawDate: string;
  mSpike: number;
  sflcRatio: number;
  age: number;
  creatinine: number;
  hemoglobin: number;
}
