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
  props: IValidatedFormProps
) => {
  let { value } = el;
  const { type, checked, name } = el;
  if (type === 'checkbox') {
    value = checked;
  }
  el.setCustomValidity('');
  const isValid = props.customValidators[name]?.isValid;
  const valid = isValid ? isValid(value) : el.checkValidity();
  let error = props.customValidators[name]?.errorText as string;
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
