import React from 'react';
import { IValidatedFormState, IValidatedFormProps } from './validatedFormModels';
declare type ValidatedFormProps = Omit<IValidatedFormProps, 'onSubmit'>;
export default class ValidatedForm extends React.Component<ValidatedFormProps, IValidatedFormState> {
    static defaultProps: {
        customValidators: {};
        initialFieldValues: {};
        formErrorClass: string;
    };
    state: {
        submissionAttempted: boolean;
        formIsValid: boolean;
        formValues: {};
    };
    componentDidMount(): void;
    formRef: React.RefObject<HTMLFormElement>;
    onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    fieldChanged: (e: any) => void;
    getFormData: () => {
        formValues: {};
        submissionAttempted: boolean;
        formIsValid: boolean;
    };
    resetForm: () => void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=ValidatedForm.d.ts.map