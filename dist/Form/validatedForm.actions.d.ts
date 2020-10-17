import { IValidatedFormState } from "./validatedFormModels";
export declare const UPDATE_VALIDATED_FORM = "UPDATE_VALIDATED_FORM";
export declare const CLEAR_VALIDATED_FORM = "CLEAR_VALIDATED_FORM";
export declare const INIT_VALIDATED_FORM = "INIT_VALIDATED_FORM";
export declare type ValidatedFormAction = {
    type: string;
    payload: {
        formName: string;
        newFormState: IValidatedFormState;
    };
};
export declare const updateValidatedForm: ({ newFormState, formName, }: {
    newFormState: IValidatedFormState;
    formName: string;
}) => {
    type: string;
    payload: {
        formName: string;
        newFormState: IValidatedFormState;
    };
};
//# sourceMappingURL=validatedForm.actions.d.ts.map