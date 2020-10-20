import { IValidatedFormState } from './models';
import {
  INIT_VALIDATED_FORM,
  CLEAR_VALIDATED_FORM,
  UPDATE_VALIDATED_FORM,
  ValidatedFormAction,
} from './validatedForm.actions';

export interface IValidatedForms {
  [formName: string]: IValidatedFormState;
}

const DEFAULT_STATE: IValidatedForms = {};

export default (state = DEFAULT_STATE, action: ValidatedFormAction) => {
  if (
    [INIT_VALIDATED_FORM, CLEAR_VALIDATED_FORM, UPDATE_VALIDATED_FORM].includes(
      action.type
    )
  ) {
    const { formName, newFormState } = action.payload;
    switch (action.type) {
      case UPDATE_VALIDATED_FORM:
        return {
          ...state,
          [formName]: {
            ...newFormState,
          },
        };
      default:
        return state;
    }
  }
  return state;
};
