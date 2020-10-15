import { IValidatedFormState } from "./validatedFormModels";

export const UPDATE_VALIDATED_FORM = "UPDATE_VALIDATED_FORM";
export const CLEAR_VALIDATED_FORM = "CLEAR_VALIDATED_FORM";
export const INIT_VALIDATED_FORM = "INIT_VALIDATED_FORM";

export type ValidatedFormAction = {
  type: string;
  payload: {
    formName: string;
    newFormState: IValidatedFormState;
  };
};

export const updateValidatedForm = ({
  newFormState,
  formName,
}: {
  newFormState: IValidatedFormState;
  formName: string;
}) => ({
  type: UPDATE_VALIDATED_FORM,
  payload: {
    formName,
    newFormState,
  },
});
