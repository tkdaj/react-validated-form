import React from 'react';
import { FormValues, IValidatedFormState, IValidatedFormProps } from './models';
import {
  getFieldsInForm,
  isFieldValidatable,
  getUpdatedFormValue,
} from './shared';

type ValidatedFormProps = Omit<IValidatedFormProps, 'onSubmit'>;

export default class ValidatedForm extends React.Component<
  ValidatedFormProps,
  IValidatedFormState
> {
  static defaultProps = {
    customValidators: {},
    formErrorClass: 'validated-form-error',
  };

  state = {
    submissionAttempted: false,
    formIsValid: false,
    formValues: {},
  };

  componentDidMount() {
    const formValues: FormValues = {};
    // Check to make sure all fields have a 'name'
    getFieldsInForm(this.formRef?.current).forEach(field => {
      if (field.name) {
        if (
          this.props.customValidators[field.name]?.isValid &&
          !this.props.customValidators[field.name]?.errorText
        ) {
          console.error(
            'A custom error message must be provided when using a custom isValid function for field:',
            field
          );
        }
        formValues[field.name] = getUpdatedFormValue(
          field,
          this.props as IValidatedFormProps
        );
        // If there is custom validation it requires custom errorText
      } else if (isFieldValidatable(field)) {
        console.error(
          'You must have a name on all form fields within ValidatedForm',
          field
        );
      }
    });
    // Initialize the form
    this.setState(
      {
        submissionAttempted: false,
        formValues,
        formIsValid: !Object.values(formValues).find(val => val.error),
      },
      () => {
        this.props.onFormChanged?.(
          this.formRef.current as HTMLFormElement,
          this.state
        );
      }
    );
  }

  componentDidUpdate() {
    const newOrChangedFields = getFieldsInForm(this.formRef.current).reduce(
      (acc, curr) => {
        if (this.state.formValues[curr.name]) {
          const isCheckbox = curr.type === 'checkbox';
          const isRadio = curr.type === 'radio';
          if (
            (isRadio &&
              curr.checked &&
              this.state.formValues[curr.name].value !== curr.value) ||
            (isCheckbox &&
              this.state.formValues[curr.name].value !== curr.checked) ||
            (!isRadio &&
              !isCheckbox &&
              this.state.formValues[curr.name].value !== curr.value)
          ) {
            acc[curr.name] = getUpdatedFormValue(curr, this.props);
          }
        } else {
          acc[curr.name] = getUpdatedFormValue(curr, this.props);
        }
        return acc;
      },
      {}
    );
    if (Object.keys(newOrChangedFields).length) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        state => {
          const formValues: FormValues = {
            ...state.formValues,
            ...newOrChangedFields,
          };
          return {
            formValues,
            formIsValid: !Object.values(formValues).find(val => val.error),
          };
        },
        () => {
          this.props.onFormChanged?.(
            this.formRef.current as HTMLFormElement,
            this.state
          );
        }
      );
    }
  }

  formRef: React.RefObject<HTMLFormElement> = React.createRef();

  onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ submissionAttempted: true }, () => {
      if (this.state.formIsValid) {
        this.props?.onValidSubmissionAttempt?.(e, { ...this.state.formValues });
      } else {
        this.props?.onInvalidSubmissionAttempt?.(e, {
          ...this.state.formValues,
        });
      }
      this.props.onFormChanged?.(
        this.formRef?.current as HTMLFormElement,
        this.state
      );
    });
  };

  // This function makes the form data available at any time using a ref from outside this component
  getFormData = () => this.state;

  render() {
    const {
      onInvalidSubmissionAttempt: onInvalidForm,
      onValidSubmissionAttempt: onValidForm,
      customValidators,
      className,
      children,
      formErrorClass,
      onFormChanged,
      ...props
    } = this.props;
    const { submissionAttempted, formIsValid } = this.state;

    const classObj = {
      'validated-form': true,
      'validated-form-submission-attempted': Boolean(submissionAttempted),
      [formErrorClass as string]: !formIsValid,
      [className as string]: Boolean(className),
    };
    const classes = Object.keys(classObj)
      .filter(key => classObj[key])
      .join(' ');

    return (
      <form
        {...props}
        ref={this.formRef}
        onSubmit={this.onFormSubmit}
        className={classes}
      >
        {children}
      </form>
    );
  }
}
