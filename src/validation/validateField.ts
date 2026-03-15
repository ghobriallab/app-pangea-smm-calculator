import type { FieldValidation, FieldRange } from '../types';

export function validateField(rawValue: string, range: FieldRange): FieldValidation | null {
  const isEmpty = rawValue.trim() === '';

  if (isEmpty) {
    if (range.required) {
      return { severity: 'error', message: `${range.label} is required.` };
    }
    return null;
  }

  const value = parseFloat(rawValue);

  if (isNaN(value)) {
    return { severity: 'error', message: `${range.label} must be a number.` };
  }

  if (range.min !== undefined && value < range.min) {
    return { severity: 'error', message: `${range.label} must be at least ${range.min}.` };
  }

  if (range.max !== undefined && value > range.max) {
    return { severity: 'error', message: `${range.label} must be no more than ${range.max}.` };
  }

  if (range.integer && !Number.isInteger(value)) {
    return { severity: 'warning', message: `${range.label} is typically a whole number. Please confirm.` };
  }

  if (range.warnLow !== undefined && value < range.warnLow) {
    return { severity: 'warning', message: `${range.label} of ${value} is unusually low. Please confirm.` };
  }

  if (range.warnHigh !== undefined && value > range.warnHigh) {
    return { severity: 'warning', message: `${range.label} of ${value} is unusually high. Please confirm.` };
  }

  return null;
}
