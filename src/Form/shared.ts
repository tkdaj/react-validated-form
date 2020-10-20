// import { ValidatedReduxForm } from './ValidatedReduxForm';
// import ValidatedForm from './ValidatedForm';
import { IValidatedFormProps } from './models';

const nonValidatableTags = ['BUTTON'];

export const isFieldValidatable = (el: HTMLFormElement) => {
  return !nonValidatableTags.includes(el.tagName);
};

export const getFieldsInForm = (form: HTMLFormElement | null) => {
  if (!form) return [];
  return Array.from(form.elements).filter(el =>
    isFieldValidatable(el as HTMLFormElement)
  ) as HTMLFormElement[];
};

export const getUpdatedFormValue = (
  el: HTMLFormElement,
  props: IValidatedFormProps,
  init = false
) => {
  const isCheckbox = el.type === 'checkbox';
  const isRadio = el.type === 'radio';
  let { value } = el;
  if (isCheckbox) {
    value = el.checked;
  }
  if (isRadio) {
    // check to see if another radio with the same name was already considered checked?
    value = el.checked ? el.value : '';
  }
  if (init) {
    if (isCheckbox) {
      value = false;
    } else if (isRadio) {
      el.checked = false;
      value = '';
    } else {
      value = '';
    }
    // Manually setting value here so that "checkValidity() works correctly when resetting form
    el[isCheckbox ? 'checked' : 'value'] = value;
  }
  el.setCustomValidity('');
  const isValid = props.customValidators[el.name]?.isValid;
  const valid = isValid ? isValid(value) : el.checkValidity();
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
    error: valid ? '' : error,
  };
};
