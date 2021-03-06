import React from 'react';
import { FormValues, IValidatedFormState, IValidatedFormProps } from './models';
import { getFieldsInForm, getUpdatedFormValue } from './shared';

export default class ValidatedForm extends React.Component<
  IValidatedFormProps,
  { validationData: IValidatedFormState }
> {
  static defaultProps = {
    customValidators: {},
    hideNameWarnings: false,
    formErrorClass: 'validated-form-error',
  };

  state = {
    validationData: {
      submissionAttempted: false,
      formIsValid: false,
      formValues: {},
    },
  };

  componentDidMount() {
    const formValues: FormValues = {};
    // Check to make sure all fields have a 'name'
    getFieldsInForm(this.formRef?.current, this.props.hideNameWarnings).forEach(
      field => {
        if (field.name) {
          if (
            this.props.customValidators[field.name]?.isValid &&
            !this.props.customValidators[field.name]?.errorText
          ) {
            console.warn(
              'A custom error message must be provided when using a custom isValid function for field:',
              field
            );
          }
          formValues[field.name] = getUpdatedFormValue(
            field,
            this.props as IValidatedFormProps
          );
          // If there is custom validation it requires custom errorText
        }
      }
    );
    // Initialize the form
    this.setState(
      {
        validationData: {
          submissionAttempted: false,
          formValues,
          formIsValid: !Object.values(formValues).find(val => val.error),
        },
      },
      () => {
        this.props.onFormChanged?.(
          this.formRef.current as HTMLFormElement,
          this.state.validationData
        );
      }
    );
  }

  componentDidUpdate() {
    const currentFields = getFieldsInForm(
      this.formRef.current,
      this.props.hideNameWarnings
    );
    const newOrChangedFields = currentFields.reduce((acc, curr) => {
      if (curr.name) {
        // existing field
        if (this.state.validationData.formValues[curr.name]) {
          const isCheckbox = curr.type === 'checkbox';
          const isRadio = curr.type === 'radio';
          // check if a value has been changed
          if (
            (isCheckbox &&
              this.state.validationData.formValues[curr.name].value !==
                curr.checked) ||
            (!isRadio &&
              !isCheckbox &&
              this.state.validationData.formValues[curr.name].value !==
                curr.value)
          ) {
            acc[curr.name] = getUpdatedFormValue(curr, this.props);
          } else if (
            isRadio &&
            this.state.validationData.formValues[curr.name].value !==
              getUpdatedFormValue(curr, this.props, currentFields).value
          ) {
            acc[curr.name] = getUpdatedFormValue(
              curr,
              this.props,
              currentFields
            );
          }
          // new field
        } else {
          acc[curr.name] = getUpdatedFormValue(curr, this.props);
        }
      }
      return acc;
    }, {});

    const removedFields = Object.keys(
      this.state.validationData.formValues
    ).filter(
      name =>
        !currentFields.find(field => (field.name ? field.name === name : true))
    );

    if (Object.keys(newOrChangedFields).length || removedFields.length) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        state => {
          const formValues: FormValues = {
            ...state.validationData.formValues,
            ...newOrChangedFields,
          };
          removedFields.forEach(name => delete formValues[name]);
          return {
            validationData: {
              ...state.validationData,
              formValues,
              formIsValid: !Object.values(formValues).find(val => val.error),
            },
          };
        },
        () => {
          this.props.onFormChanged?.(
            this.formRef.current as HTMLFormElement,
            this.state.validationData
          );
        }
      );
    }
  }

  formRef: React.RefObject<HTMLFormElement> = React.createRef();

  onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState(
      state => ({
        validationData: { ...state.validationData, submissionAttempted: true },
      }),
      () => {
        if (this.state.validationData.formIsValid) {
          this.props?.onValidSubmissionAttempt?.(e, {
            ...this.state.validationData.formValues,
          });
        } else {
          this.props?.onInvalidSubmissionAttempt?.(e, {
            ...this.state.validationData.formValues,
          });
        }
        this.props.onFormChanged?.(
          this.formRef?.current as HTMLFormElement,
          this.state.validationData
        );
      }
    );
  };

  // This function makes the form data available at any time using a ref from outside this component
  getFormData = () => this.state;

  resetFormSubmitted = () => {
    this.setState(
      state => ({
        validationData: { ...state.validationData, submissionAttempted: false },
      }),
      () => {
        this.props.onFormChanged?.(
          this.formRef.current as HTMLFormElement,
          this.state.validationData
        );
      }
    );
  };

  render() {
    const {
      onInvalidSubmissionAttempt: onInvalidForm,
      onValidSubmissionAttempt: onValidForm,
      customValidators,
      className,
      children,
      formErrorClass,
      onFormChanged,
      hideNameWarnings,
      ...props
    } = this.props;
    const { submissionAttempted, formIsValid } = this.state.validationData;

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
