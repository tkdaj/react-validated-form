import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IApplicationState } from 'store';
import { IValidatedFormState, IValidatedFormProps, FormValues } from './models';
import { updateValidatedForm } from './validatedForm.actions';
import { getFieldsInForm, getUpdatedFormValue } from './shared';

const mapState = (state: IApplicationState) => ({
  reduxForms: state.validatedForms,
});

const mapDispatch = {
  updateValidatedForm,
};

export type IValidatedReduxForm = Omit<IValidatedFormProps, 'onFormChanged'>;
const connector = connect(mapState, mapDispatch, null, { forwardRef: true });
type PropsFromRedux = ConnectedProps<typeof connector>;

export class ValidatedReduxForm extends React.Component<
  IValidatedReduxForm & PropsFromRedux
> {
  static defaultProps = {
    customValidators: {},
    hideNameWarnings: false,
    formErrorClass: 'validated-form-error',
  };

  componentDidMount() {
    // Check to make sure all fields have a 'name'
    const formValues: FormValues = {};
    getFieldsInForm(this.formRef?.current, this.props.hideNameWarnings).forEach(
      field => {
        if (field.name) {
          // If there is custom validation it requires custom errorText
          if (
            this.props.customValidators[field.name]?.isValid &&
            !this.props.customValidators[field.name]?.errorText
          ) {
            console.warn(
              'A custom error message must be provided when using a custom isValid function for field:',
              field
            );
          }
          formValues[field.name] = getUpdatedFormValue(field, this.props);
        }
      }
    );
    this.props.updateValidatedForm({
      formName: this.props.name,
      newFormState: {
        submissionAttempted: false,
        formIsValid: !Object.values(formValues).find(val => val.error),
        formValues,
      },
    });
  }

  componentDidUpdate() {
    const theForm: IValidatedFormState = this.props.reduxForms[this.props.name];
    const currentFields = getFieldsInForm(
      this.formRef.current,
      this.props.hideNameWarnings
    );
    const newOrChangedFields = currentFields.reduce((acc, curr) => {
      if (curr.name) {
        const { formValues: fields } = theForm;
        if (fields[curr.name]) {
          const isCheckbox = curr.type === 'checkbox';
          const isRadio = curr.type === 'radio';
          if (
            (isCheckbox && fields[curr.name].value !== curr.checked) ||
            (!isRadio && !isCheckbox && fields[curr.name].value !== curr.value)
          ) {
            acc[curr.name] = getUpdatedFormValue(curr, this.props);
          } else if (
            isRadio &&
            fields[curr.name].value !==
              getUpdatedFormValue(curr, this.props, currentFields).value
          ) {
            acc[curr.name] = getUpdatedFormValue(
              curr,
              this.props,
              currentFields
            );
          }
        } else {
          acc[curr.name] = getUpdatedFormValue(curr, this.props);
        }
      }
      return acc;
    }, {});

    const removedFields = Object.keys(theForm.formValues).filter(
      name =>
        !currentFields.find(field => (field.name ? field.name === name : true))
    );

    if (Object.keys(newOrChangedFields).length || removedFields.length) {
      const formValues: FormValues = {
        ...theForm.formValues,
        ...newOrChangedFields,
      };
      removedFields.forEach(name => delete formValues[name]);
      this.props.updateValidatedForm({
        formName: this.props.name,
        newFormState: {
          ...theForm,
          formValues,
          formIsValid: !Object.values(formValues).find(val => val.error),
        },
      });
    }
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

  resetFormSubmitted = () => {
    const updatedForm = {
      ...this.props.reduxForms[this.props.name],
      submissionAttempted: false,
    };
    this.props.updateValidatedForm({
      formName: this.props.name,
      newFormState: updatedForm,
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
      reduxForms,
      name,
      formErrorClass,
      hideNameWarnings,
      ...props
    } = this.props;
    const reduxForm = reduxForms[name];

    const classObj = {
      'validated-form': true,
      'validated-form-submission-attempted': Boolean(
        reduxForm?.submissionAttempted
      ),
      [formErrorClass as string]: !reduxForm?.formIsValid,
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

export default connector(ValidatedReduxForm);
