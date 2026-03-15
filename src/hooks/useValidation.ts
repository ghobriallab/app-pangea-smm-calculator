import { useState, useCallback } from 'react';
import type { PatientInputs, ValidationState } from '../types';
import { FIELD_RANGES } from '../validation/fieldRanges';
import { validateField } from '../validation/validateField';

type RawValues = Partial<Record<keyof PatientInputs, string>>;

export function useValidation() {
  const [rawValues, setRawValues] = useState<RawValues>({});
  const [touched, setTouched] = useState<Partial<Record<keyof PatientInputs, boolean>>>({});
  const [validationState, setValidationState] = useState<ValidationState>({});

  const handleChange = useCallback((field: keyof PatientInputs, rawValue: string) => {
    setRawValues(prev => ({ ...prev, [field]: rawValue }));
    setTouched(prev => {
      if (!prev[field]) return prev;
      const result = validateField(rawValue, FIELD_RANGES[field]);
      setValidationState(vs => {
        const next = { ...vs };
        if (result) next[field] = result;
        else delete next[field];
        return next;
      });
      return prev;
    });
  }, []);

  const handleBlur = useCallback((field: keyof PatientInputs, rawValue: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const result = validateField(rawValue, FIELD_RANGES[field]);
    setValidationState(vs => {
      const next = { ...vs };
      if (result) next[field] = result;
      else delete next[field];
      return next;
    });
  }, []);

  const validateAll = useCallback((currentRawValues: RawValues): boolean => {
    const newState: ValidationState = {};
    const newTouched: Partial<Record<keyof PatientInputs, boolean>> = {};
    let hasErrors = false;

    for (const field of Object.keys(FIELD_RANGES) as (keyof PatientInputs)[]) {
      newTouched[field] = true;
      const raw = currentRawValues[field] ?? '';
      const result = validateField(raw, FIELD_RANGES[field]);
      if (result) {
        newState[field] = result;
        if (result.severity === 'error') hasErrors = true;
      }
    }

    setTouched(newTouched);
    setValidationState(newState);
    return !hasErrors;
  }, []);

  const getParsedInputs = useCallback((): PatientInputs => {
    const parse = (key: keyof PatientInputs) => parseFloat(rawValues[key] ?? '') || 0;
    return {
      sflcRatio: parse('sflcRatio'),
      mSpike: parse('mSpike'),
      creatinine: parse('creatinine'),
      age: parse('age'),
      hemoglobin: parse('hemoglobin'),
      boneMarrow: parse('boneMarrow'),
    };
  }, [rawValues]);

  const hasErrors = Object.values(validationState).some(v => v?.severity === 'error');

  return {
    rawValues,
    validationState,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    getParsedInputs,
    hasErrors,
  };
}
