import type { FieldRange, PatientInputs } from '../types';

export const FIELD_RANGES: Record<keyof PatientInputs, FieldRange> = {
  sflcRatio: {
    label: 'Serum Free Light Chain Ratio',
    required: true,
    min: 0.01,
    max: 5000,
    warnLow: 0.1,
    warnHigh: 500,
  },
  mSpike: {
    label: 'M-Spike',
    required: true,
    min: 0,
    max: 10,
    warnHigh: 3.0,
  },
  creatinine: {
    label: 'Creatinine',
    required: true,
    min: 0.1,
    max: 20,
    warnLow: 0.5,
    warnHigh: 5.0,
  },
  age: {
    label: 'Age',
    required: true,
    min: 18,
    max: 110,
    warnLow: 30,
    warnHigh: 95,
    integer: true,
  },
  hemoglobin: {
    label: 'Hemoglobin',
    required: false,
    min: 3.0,
    max: 22,
    warnLow: 6.0,
    warnHigh: 18.5,
  },
  boneMarrow: {
    label: 'Bone Marrow Plasma Cells',
    required: false,
    min: 0,
    max: 100,
    warnHigh: 60,
  },
};
