import {
  ReactNode,
  Children,
  ReactElement,
  isValidElement,
  cloneElement,
} from 'react';
import { FormValues } from './validatedFormModels';
import { ValidatedReduxForm } from './ValidatedReduxForm';
import ValidatedForm from './ValidatedForm';

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
  props: any, // IValidatedFormProps,
  init = false
) => {
  const isCheckbox = el.type === 'checkbox';
  const isRadio = el.type === 'radio';
  let value = isCheckbox ? el.checked : el.value;
  if (init) {
    if (props.initialFieldValues[el.name]) {
      value = props.initialFieldValues[el.name];
    } else if (isCheckbox) {
      value = false;
    } else if (isRadio) {
      value = '';
      el.checked = false;
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

// export const flattenAllChildren = (
//   startingChildren: ReactNode,
//   childList: ReactElement[] = []
// ) => {
//   return (Children.toArray(startingChildren) as ReactElement[]).reduce(
//     (acc, curr) => {
//       if (curr.props?.children) {
//         return flattenAllChildren(curr.props.children, [...acc, curr]);
//       }
//       if (isValidElement(curr)) {
//         return [...acc, curr];
//       }
//       return acc;
//     },
//     childList
//   );
// };

export function attachProps(
  this: ValidatedForm | ValidatedReduxForm,
  startingChildren: ReactNode,
  formFields: HTMLFormElement[],
  formValues: FormValues
) {
  return (Children.toArray(startingChildren) as ReactElement<any>[]).map(
    child => {
      const { props } = child as ReactElement;
      const hasChildren = props?.children;
      const matchingField = formFields.find(item => props?.name === item.name);
      return isValidElement(child)
        ? cloneElement(child, {
            ...props,
            ...(hasChildren
              ? {
                  children: attachProps.apply(this, [
                    props.children,
                    formFields,
                    formValues,
                  ]),
                }
              : null),
            ...(matchingField
              ? { value: formValues[props.name]?.value ?? '' }
              : null),
            ...(matchingField
              ? {
                  onChange: props.onChange
                    ? e => {
                        this.fieldChanged(e);
                        props.onChange(e);
                      }
                    : this.fieldChanged,
                }
              : null),
          })
        : child;
    }
  );
}
