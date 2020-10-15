import { FormHTMLAttributes } from "react";

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

interface ICustomValidatedFormProps
  extends FormHTMLAttributes<HTMLFormElement> {
  onInvalidSubmissionAttempt?: (
    e: React.FormEvent<HTMLFormElement>,
    formValues: FormValues
  ) => void;
  onValidSubmissionAttempt?: (
    e: React.FormEvent<HTMLFormElement>,
    formValues: FormValues
  ) => void;
  initialFieldValues: {
    [fieldName: string]: string | number | boolean;
  };
  customValidators: {
    [fieldName: string]: {
      isValid?: IsValidFunction;
      errorText?: string;
    };
  };
  name: string;
  formErrorClass?: string;
  onFormChanged?: (
    updatedField: HTMLFormElement,
    updatedFormState: IValidatedFormState
  ) => void;
}

export type IValidatedFormProps = Omit<ICustomValidatedFormProps, "onSubmit">;
