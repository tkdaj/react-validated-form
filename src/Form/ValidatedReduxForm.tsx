import React, { ReactElement } from "react";
import { connect } from "react-redux";
import {
  IValidatedFormState,
  IValidatedFormProps,
  FormValues,
} from "./validatedFormModels";
import { updateValidatedForm } from "./validatedForm.actions";
import { IApplicationState } from "store";
import {
  getFieldsInForm,
  isFieldValidatable,
  getUpdatedFormValue,
} from "./shared";

const mapState = (state: IApplicationState) => ({
  reduxForms: state.validatedForms,
});

const mapDispatch = {
  updateValidatedForm,
};

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = typeof mapDispatch;
type ValidatedReduxFormProps = StateProps &
  DispatchProps &
  Omit<IValidatedFormProps, "onFormChanged">;

class ValidatedReduxForm extends React.Component<ValidatedReduxFormProps> {
  static defaultProps = {
    customValidators: {},
    initialFieldValues: {},
    formErrorClass: "validated-form-error",
  };

  componentDidMount() {
    // Check to make sure all fields have a 'name'
    const initialFieldValues: FormValues = {};
    getFieldsInForm(this.formRef?.current).forEach((field) => {
      if (field.name) {
        // If there is custom validation it requires custom errorText
        if (
          this.props.customValidators[field.name]?.isValid &&
          !this.props.customValidators[field.name]?.errorText
        ) {
          console.error(
            "A custom error message must be provided when using a custom isValid function for field:",
            field
          );
        }
        initialFieldValues[field.name] = getUpdatedFormValue(
          field,
          this.props,
          true
        );
      } else if (isFieldValidatable(field)) {
        console.error(
          "You must have a name on all form fields within ValidatedForm",
          field
        );
      }
    });
    this.props.updateValidatedForm({
      formName: this.props.name,
      newFormState: {
        submissionAttempted: false,
        formIsValid: !Object.values(initialFieldValues).find(
          (val) => val.error
        ),
        formValues: initialFieldValues,
      },
    });
  }

  formRef: React.RefObject<HTMLFormElement> = React.createRef();

  onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedForm = {
      ...this.props.reduxForms[this.props.name],
      submissionAttempted: true,
    };
    this.props.updateValidatedForm({
      formName: this.props.name,
      newFormState: updatedForm,
    });
    if (this.props.reduxForms[this.props.name].formIsValid) {
      this.props?.onValidSubmissionAttempt?.(e, {
        ...updatedForm.formValues,
      });
    } else {
      this.props?.onInvalidSubmissionAttempt?.(e, {
        ...updatedForm.formValues,
      });
    }
  };

  fieldChanged = (e) => {
    const { target } = e;
    const updatedField = getUpdatedFormValue(target, this.props);
    const newForm = {
      ...this.props.reduxForms[this.props.name],
      formValues: {
        ...this.props.reduxForms[this.props.name].formValues,
        [target.name]: updatedField,
      },
    } as IValidatedFormState;
    this.props.updateValidatedForm({
      formName: this.props.name,
      newFormState: {
        ...newForm,
        formIsValid: !Object.values(newForm.formValues).find(
          (val) => val.error
        ),
      },
    });
  };

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
    this.props.updateValidatedForm({
      newFormState: {
        submissionAttempted: false,
        formValues,
        formIsValid: !Object.values(formValues).find((val) => val.error),
      },
      formName: this.props.name,
    });
  };

  render() {
    const {
      onInvalidSubmissionAttempt: onInvalidForm,
      onValidSubmissionAttempt: onValidForm,
      updateValidatedForm: update,
      customValidators,
      className,
      children,
      initialFieldValues,
      reduxForms,
      name,
      formErrorClass,
      ...props
    } = this.props;
    const reduxForm = reduxForms[name];

    return (
      <form
        ref={this.formRef}
        onSubmit={this.onFormSubmit}
        {...props}
        className={`validated-form ${
          reduxForm?.submissionAttempted
            ? "validated-form-submission-attempted "
            : ""
        }${reduxForm?.formIsValid ? "" : formErrorClass}${className ?? ""}`}
      >
        {(React.Children.toArray(children) as ReactElement[]).map((child) => {
          // let classes = "";
          // if (child.props.name) {
          //   classes = reduxForm?.formValues[child.props.name]?.error
          //     ? fieldErrorClass
          //     : "";
          // }
          // if (className) {
          //   classes += classes ? ` ${className}` : className;
          // }
          const isButton = child.type === "button";
          return isButton
            ? child
            : React.cloneElement(child, {
                ...child.props,
                value: reduxForm?.formValues[child.props.name]?.value ?? "",
                onChange: child.props.onChange
                  ? (e) => {
                      this.fieldChanged(e);
                      child.props.onChange(e);
                    }
                  : this.fieldChanged,
                // using spead syntax like this to conditionally add properties to this object
                // ...(classes && {
                //   className: classes,
                // }),
                // ...(reduxForm?.formValues[child.props.name]?.error && {
                //   "data-error-message":
                //     reduxForm?.formValues[child.props.name]?.error,
                // }),
              });
        })}
      </form>
    );
  }
}

export default connect<StateProps & DispatchProps & IValidatedFormProps>(
  mapState,
  mapDispatch,
  null,
  { forwardRef: true }
)(ValidatedReduxForm);
