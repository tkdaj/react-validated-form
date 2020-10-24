import React, { FormHTMLAttributes } from 'react';

export type FormValues = {
  [fieldName: string]: {
    value: any;
    error: string;
  };
};

export interface IValidatedFormState {
  submissionAttempted: boolean;
  formIsValid: boolean;
  formValues: FormValues;
}

export type IsValidFunction = (val: any) => boolean;

export interface IValidatedFormProps
  extends FormHTMLAttributes<HTMLFormElement> {
  name: string;
  onInvalidSubmissionAttempt?: (
    e: React.FormEvent<HTMLFormElement>,
    formValues: FormValues
  ) => void;
  onValidSubmissionAttempt?: (
    e: React.FormEvent<HTMLFormElement>,
    formValues: FormValues
  ) => void;
  customValidators: {
    [fieldName: string]: {
      isValid?: IsValidFunction;
      errorText?: string;
    };
  };
  hideNameWarnings: boolean;
  formErrorClass?: string;
  onFormChanged?: (
    updatedField: HTMLFormElement,
    updatedFormState: IValidatedFormState
  ) => void;
}
