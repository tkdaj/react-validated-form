import React from 'react';
import { ConnectedProps } from 'react-redux';
import { IValidatedFormProps } from './models';
declare type OwnProps = Omit<IValidatedFormProps, 'onFormChanged' | 'onSubmit'>;
declare const connector: any;
declare type PropsFromRedux = ConnectedProps<typeof connector>;
export declare class ValidatedReduxForm extends React.Component<OwnProps & PropsFromRedux> {
    static defaultProps: {
        customValidators: {};
        formErrorClass: string;
    };
    componentDidMount(): void;
    componentDidUpdate(): void;
    formRef: React.RefObject<HTMLFormElement>;
    onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    render(): JSX.Element;
}
declare const _default: any;
export default _default;
//# sourceMappingURL=ValidatedReduxForm.d.ts.map