import { IValidatedFormState } from "./validatedFormModels";
import {
  INIT_VALIDATED_FORM,
  CLEAR_VALIDATED_FORM,
  UPDATE_VALIDATED_FORM,
  ValidatedFormAction,
} from "./validatedForm.actions";

//For general typing
// export interface IValidatedForms {
//   [formName: string]: IValidatedFormState;
// }

//for more strict typing
export interface IValidatedForms {
  demoReduxForm?: IValidatedFormState;
}

// const DEFAULT_FORM: IValidatedFormState = {
//   submissionAttempted: false,
//   formIsValid: false,
//   formValues: {},
// };

const DEFAULT_STATE: IValidatedForms = {};

export default (state = DEFAULT_STATE, action: ValidatedFormAction) => {
  if (
    [INIT_VALIDATED_FORM, CLEAR_VALIDATED_FORM, UPDATE_VALIDATED_FORM].includes(
      action.type
    )
  ) {
    const { formName, newFormState } = action.payload;
    switch (action.type) {
      // case INIT_VALIDATED_FORM:
      //   console.log(`initializing form: ${formName}`, { ...DEFAULT_FORM });
      //   return {
      //     ...state,
      //     [formName]: { ...DEFAULT_FORM },
      //   };
      // case CLEAR_VALIDATED_FORM:
      //   return {
      //     ...state,
      //     [formName]: { ...DEFAULT_FORM },
      //   };
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
