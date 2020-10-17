import { ReactNode } from 'react';
import { FormValues } from './validatedFormModels';
import { ValidatedReduxForm } from './ValidatedReduxForm';
import ValidatedForm from './ValidatedForm';
export declare const isFieldValidatable: (el: HTMLFormElement) => boolean;
export declare const getFieldsInForm: (form: HTMLFormElement | null) => HTMLFormElement[];
export declare const getUpdatedFormValue: (el: HTMLFormElement, props: any, init?: boolean) => {
    value: any;
    error: string;
};
export declare function attachProps(this: ValidatedForm | ValidatedReduxForm, startingChildren: ReactNode, formFields: HTMLFormElement[], formValues: FormValues): any;
//# sourceMappingURL=shared.d.ts.map