import { IValidatedFormProps } from './models';

const nonValidatableTags = ['BUTTON', 'OBJECT'];

export const isFieldValidatable = (el: HTMLFormElement) => {
  return !nonValidatableTags.includes(el.tagName);
};

export const getFieldsInForm = (form: HTMLFormElement | null) => {
  if (!form) return [];
  const validatableFields = Array.from(form.elements).filter(el =>
    isFieldValidatable(el as HTMLFormElement)
  ) as HTMLFormElement[];

  const fieldSet = new Set();
  validatableFields.forEach(field => {
    if (fieldSet.has(field.name) && field.type !== 'radio') {
      console.error(
        `All fields within a ValidatedForm must have unique names (except radio buttons).
        Field with name "${field.name}" ${
          form.name ? `within the form "${form.name}" ` : ''
        }is a duplicate`
      );
    }
    fieldSet.add(field.name);
  });
  return validatableFields;
};

export const getUpdatedFormValue = (
  el: HTMLFormElement,
  props: IValidatedFormProps,
  allCurrentFormFields: HTMLFormElement[] = []
) => {
  let { value } = el;
  const { type, checked, name } = el;
  if (type === 'checkbox') {
    value = checked;
  }
  if (type === 'radio') {
    value =
      allCurrentFormFields
        ?.filter(field => field.name === name)
        .find(field => field.checked)?.value ?? null;
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
