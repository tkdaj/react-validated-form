import { ValidatedReduxForm } from './ValidatedReduxForm';
import ValidatedForm from './ValidatedForm';
import { IValidatedFormProps } from './validatedFormModels';
export declare const isFieldValidatable: (el: HTMLFormElement) => boolean;
export declare const getFieldsInForm: (form: HTMLFormElement | null) => HTMLFormElement[];
export declare const getUpdatedFormValue: (el: HTMLFormElement, props: IValidatedFormProps, init?: boolean) => {
    value: any;
    error: string;
};
export declare function addListeners(this: ValidatedForm | ValidatedReduxForm, formFields: HTMLFormElement[]): void;
//# sourceMappingURL=shared.d.ts.map