/* eslint-disable react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from 'store';
import ValidatedReduxForm, {
  ValidatedReduxForm as IValidatedReduxForm,
} from '../Form/ValidatedReduxForm';
import { getSharedFields, DemoState } from './sharedFormFields';
import './demo.scss';

const mapState = (state: IApplicationState) => ({
  reduxForms: state.validatedForms,
});

type DemoProps = ReturnType<typeof mapState>;

export class ReduxFormDemo extends React.Component<DemoProps, DemoState> {
  // The ValidatedReduxForm uses redux to store the validation data, but
  // you are responsible for storing your application's state
  // data.  Form values can be stored in local state or redux
  // based on user discretion.
  state: DemoState = {
    standardFormData: '',
    thecheckbox: true,
    theradios: '2',
    theradios2: '3',
    input1: "this isn't required",
    input2: '',
    theselect: '',
  };

  formRef = React.createRef<IValidatedReduxForm>();

  render() {
    return (
      <>
        <div className="redux-form-container">
          <ValidatedReduxForm
            ref={this.formRef}
            name="demoReduxForm"
            className="redux-form"
            noValidate
            customValidators={{
              input2: {
                errorText: 'You messed up',
              },
            }}
            onValidSubmissionAttempt={(e, formData) => {
              console.log('valid submission');
              console.log(e);
              console.log(formData);
            }}
            onInvalidSubmissionAttempt={(e, formData) => {
              console.log('invalid submission');
              console.log(e);
              console.log(formData);
            }}
          >
            {getSharedFields.call(this as any)}
          </ValidatedReduxForm>
        </div>
        <div className="redux-data">
          <pre>
            {JSON.stringify(this.props.reduxForms.demoReduxForm, null, 2)}
          </pre>
        </div>
      </>
    );
  }
}

export default connect(mapState)(ReduxFormDemo);
