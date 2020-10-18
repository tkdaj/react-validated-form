import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IApplicationState } from 'store';
import {
  IValidatedFormState,
  IValidatedFormProps,
  FormValues,
} from './validatedFormModels';
import { updateValidatedForm } from './validatedForm.actions';
import {
  getFieldsInForm,
  isFieldValidatable,
  getUpdatedFormValue,
  addListeners,
} from './shared';

const mapState = (state: IApplicationState) => ({
  reduxForms: state.validatedForms,
});

const mapDispatch = {
  updateValidatedForm,
};

type OwnProps = Omit<IValidatedFormProps, 'onFormChanged' | 'onSubmit'>;
const connector = connect(mapState, mapDispatch, null, { forwardRef: true });
type PropsFromRedux = ConnectedProps<typeof connector>;

export class ValidatedReduxForm extends React.Component<
  OwnProps & PropsFromRedux
> {
  static defaultProps = {
    customValidators: {},
    initialFieldValues: {},
    formErrorClass: 'validated-form-error',
  };

  componentDidMount() {
    // Check to make sure all fields have a 'name'
    const initialFieldValues: FormValues = {};
    this.formFields = getFieldsInForm(this.formRef?.current);
    addListeners.apply(this, [this.formFields]);
    this.formFields.forEach(field => {
      if (field.name) {
        // If there is custom validation it requires custom errorText
        if (
          this.props.customValidators[field.name]?.isValid &&
          !this.props.customValidators[field.name]?.errorText
        ) {
          console.error(
            'A custom error message must be provided when using a custom isValid function for field:',
            field
          );
        }
        initialFieldValues[field.name] = getUpdatedFormValue(
          field,
          this.props as IValidatedFormProps,
          true
        );
      } else if (isFieldValidatable(field)) {
        console.error(
          'You must have a name on all form fields within ValidatedForm',
          field
        );
      }
    });
    this.props.updateValidatedForm({
      formName: this.props.name,
      newFormState: {
        submissionAttempted: false,
        formIsValid: !Object.values(initialFieldValues).find(val => val.error),
        formValues: initialFieldValues,
      },
    });
  }

  componentDidUpdate() {
    const currentFormFields = getFieldsInForm(this.formRef?.current);
    // Browser doesn't add duplicate listeners if the same listener is already there
    addListeners.apply(this, [currentFormFields]);
  }

  formRef: React.RefObject<HTMLFormElement> = React.createRef();
  formFields: HTMLFormElement[] = [];

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

  fieldChanged = e => {
    const { target } = e;
    const updatedField = getUpdatedFormValue(
      target,
      this.props as IValidatedFormProps
    );
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
        formIsValid: !Object.values(newForm.formValues).find(val => val.error),
      },
    });
  };

  // This function is available at any time using a ref from outside this component
  resetForm = () => {
    const formValues: FormValues = getFieldsInForm(this.formRef.current).reduce(
      (fields, curr: any) => {
        const updatedField = getUpdatedFormValue(
          curr,
          this.props as IValidatedFormProps,
          true
        );
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
        formIsValid: !Object.values(formValues).find(val => val.error),
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
            ? 'validated-form-submission-attempted '
            : ''
        }${reduxForm?.formIsValid ? '' : formErrorClass}${className ?? ''}`}
      >
        {children}
      </form>
    );
  }
}

export default connector(ValidatedReduxForm);
