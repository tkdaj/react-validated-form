import React from 'react';
import { ConnectedProps } from 'react-redux';
import { IValidatedFormProps } from './validatedFormModels';
declare type OwnProps = Omit<IValidatedFormProps, 'onFormChanged' | 'onSubmit'>;
declare const connector: any;
declare type PropsFromRedux = ConnectedProps<typeof connector>;
export declare class ValidatedReduxForm extends React.Component<OwnProps & PropsFromRedux> {
    static defaultProps: {
        customValidators: {};
        initialFieldValues: {};
        formErrorClass: string;
    };
    componentDidMount(): void;
    formRef: React.RefObject<HTMLFormElement>;
    onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    fieldChanged: (e: any) => void;
    resetForm: () => void;
    render(): JSX.Element;
}
declare const _default: any;
export default _default;
//# sourceMappingURL=ValidatedReduxForm.d.ts.map