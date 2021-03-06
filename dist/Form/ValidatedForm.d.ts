import React from 'react';
import { IValidatedFormState, IValidatedFormProps } from './models';
export default class ValidatedForm extends React.Component<IValidatedFormProps, {
    validationData: IValidatedFormState;
}> {
    static defaultProps: {
        customValidators: {};
        hideNameWarnings: boolean;
        formErrorClass: string;
    };
    state: {
        validationData: {
            submissionAttempted: boolean;
            formIsValid: boolean;
            formValues: {};
        };
    };
    componentDidMount(): void;
    componentDidUpdate(): void;
    formRef: React.RefObject<HTMLFormElement>;
    onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    getFormData: () => {
        validationData: {
            submissionAttempted: boolean;
            formIsValid: boolean;
            formValues: {};
        };
    };
    resetFormSubmitted: () => void;
    render(): JSX.Element;
}
//# sourceMappingURL=ValidatedForm.d.ts.map