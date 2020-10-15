import { IValidatedFormProps } from "./validatedFormModels";

const nonValidatableTags = ["BUTTON"];

export const isFieldValidatable = (el: HTMLFormElement) => {
  return !nonValidatableTags.includes(el.tagName);
};

export const getFieldsInForm = (form: HTMLFormElement | null) => {
  if (!form) return [];
  return Array.from(form.elements).filter((el) =>
    isFieldValidatable(el as HTMLFormElement)
  ) as HTMLFormElement[];
};

export const getUpdatedFormValue = (
  el: HTMLFormElement,
  props: any, //IValidatedFormProps,
  init = false
) => {
  const isCheckbox = el.type === "checkbox";
  const isRadio = el.type === "radio";
  let value = isCheckbox ? el.checked : el.value;
  if (init) {
    if (props.initialFieldValues[el.name]) {
      value = props.initialFieldValues[el.name];
    } else if (isCheckbox) {
      value = false;
    } else if (isRadio) {
      value = "";
      el.checked = false;
    } else {
      value = "";
    }
    // Manually setting value here so that "checkValidity() works correctly when resetting form
    el[isCheckbox ? "checked" : "value"] = value;
  }
  el.setCustomValidity("");
  const isValid = props.customValidators[el.name]?.isValid;
  let valid = isValid ? isValid(value) : el.checkValidity();
  let error = props.customValidators[el.name]?.errorText as string;
  if (error) {
    if (!valid) {
      el.setCustomValidity(error);
    }
  } else {
    error = el.validationMessage;
  }
  return {
    value,
    error: valid ? "" : error,
  };
};
