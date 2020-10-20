import { IValidatedFormProps } from './models';
export declare const isFieldValidatable: (el: HTMLFormElement) => boolean;
export declare const getFieldsInForm: (form: HTMLFormElement | null) => HTMLFormElement[];
export declare const getUpdatedFormValue: (el: HTMLFormElement, props: IValidatedFormProps, init?: boolean) => {
    value: any;
    error: string;
};
//# sourceMappingURL=shared.d.ts.map