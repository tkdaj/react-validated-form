import React, { FormHTMLAttributes } from 'react';
export declare type FormValues = {
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
export declare type IsValidFunction = (val: any) => boolean;
export interface IValidatedFormProps extends FormHTMLAttributes<HTMLFormElement> {
    onInvalidSubmissionAttempt?: (e: React.FormEvent<HTMLFormElement>, formValues: FormValues) => void;
    onValidSubmissionAttempt?: (e: React.FormEvent<HTMLFormElement>, formValues: FormValues) => void;
    customValidators: {
        [fieldName: string]: {
            isValid?: IsValidFunction;
            errorText?: string;
        };
    };
    name: string;
    formErrorClass?: string;
    onFormChanged?: (updatedField: HTMLFormElement, updatedFormState: IValidatedFormState) => void;
}
//# sourceMappingURL=models.d.ts.map