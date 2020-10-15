import React, { ReactElement } from "react";
import {
  FormValues,
  IValidatedFormState,
  IValidatedFormProps,
} from "./validatedFormModels";
import {
  getFieldsInForm,
  isFieldValidatable,
  getUpdatedFormValue,
} from "./shared";

export default class ValidatedForm extends React.Component<
  IValidatedFormProps,
  IValidatedFormState
> {
  static defaultProps = {
    customValidators: {},
    initialFieldValues: {},
    formErrorClass: "validated-form-error",
  };

  state = {
    submissionAttempted: false,
    formIsValid: false,
    formValues: {},
  };

  componentDidMount() {
    // Check to make sure all fields have a 'name'
    getFieldsInForm(this.formRef?.current).forEach((field) => {
      if (field.name) {
        if (
          this.props.customValidators[field.name]?.isValid &&
          !this.props.customValidators[field.name]?.errorText
        ) {
          console.error(
            "A custom error message must be provided when using a custom isValid function for field:",
            field
          );
        }
        // If there is custom validation it requires custom errorText
      } else if (isFieldValidatable(field)) {
        console.error(
          "You must have a name on all form fields within ValidatedForm",
          field
        );
      }
    });
    // Initialize the form
    this.resetForm();
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

  fieldChanged = (e) => {
    const { target } = e;
    const updatedField = getUpdatedFormValue(target, this.props);
    this.setState((state) => {
      const newFormValues: FormValues = {
        ...state.formValues,
        [target.name]: updatedField,
      };
      const newState = {
        ...state,
        formValues: newFormValues,
        formIsValid: !Object.values(newFormValues).find((val) => val.error),
      };
      this.props.onFormChanged?.(target, newState);
      return newState;
    });
  };

  // This function makes the form data available at any time using a ref from outside this component
  getFormData = () => ({
    ...this.state,
    formValues: Object.keys(this.state.formValues).reduce((values, currKey) => {
      return {
        ...values,
        [currKey]: { ...this.state.formValues[currKey] },
      };
    }, {}),
  });

  // This function is available at any time using a ref from outside this component
  resetForm = () => {
    const formValues: FormValues = getFieldsInForm(this.formRef.current).reduce(
      (fields, curr: any) => {
        const updatedField = getUpdatedFormValue(curr, this.props, true);
        return {
          ...fields,
          [curr.name]: updatedField,
        };
      },
      {}
    );
    const newState = {
      submissionAttempted: false,
      formValues,
      formIsValid: !Object.values(formValues).find((val) => val.error),
    };
    this.setState(newState, () =>
      this.props.onFormChanged?.(
        this.formRef.current as HTMLFormElement,
        this.state
      )
    );
  };

  render() {
    const {
      onInvalidSubmissionAttempt: onInvalidForm,
      onValidSubmissionAttempt: onValidForm,
      customValidators,
      className,
      children,
      initialFieldValues,
      formErrorClass,
      onFormChanged: onFieldChanged,
      ...props
    } = this.props;
    const { submissionAttempted, formIsValid } = this.state;
    return (
      <form
        ref={this.formRef}
        onSubmit={this.onFormSubmit}
        {...props}
        className={`validated-form ${
          submissionAttempted ? "validated-form-submission-attempted " : ""
        }${formIsValid ? "" : formErrorClass}${className ?? ""}`}
      >
        {(React.Children.toArray(children) as ReactElement[]).map((child) => {
          const isButton = child.type === "button";
          return isButton
            ? child
            : React.cloneElement(child, {
                ...child.props,
                value:
                  // child.props.value ??
                  this.state.formValues[child.props.name]?.value ?? "",
                onChange: child.props.onChange
                  ? (e) => {
                      this.fieldChanged(e);
                      child.props.onChange(e);
                    }
                  : this.fieldChanged,
              });
        })}
      </form>
    );
  }
}
