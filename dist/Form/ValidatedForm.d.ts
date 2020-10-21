import React from 'react';
import { IValidatedFormState, IValidatedFormProps } from './models';
export declare type IValidatedForm = Omit<IValidatedFormProps, 'onSubmit'>;
export default class ValidatedForm extends React.Component<IValidatedForm, IValidatedFormState> {
    static defaultProps: {
        customValidators: {};
        formErrorClass: string;
    };
    state: {
        submissionAttempted: boolean;
        formIsValid: boolean;
        formValues: {};
    };
    componentDidMount(): void;
    componentDidUpdate(): void;
    formRef: React.RefObject<HTMLFormElement>;
    onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    getFormData: () => {
        submissionAttempted: boolean;
        formIsValid: boolean;
        formValues: {};
    };
    render(): JSX.Element;
}
//# sourceMappingURL=ValidatedForm.d.ts.map