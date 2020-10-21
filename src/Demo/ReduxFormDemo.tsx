/* eslint-disable react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from 'store';
import ValidatedReduxForm, {
  ValidatedReduxForm as IValidatedReduxForm,
} from '../Form/ValidatedReduxForm';
import { getSharedFields } from './sharedFormFields';
import './demo.scss';

type DemoState = {
  standardFormData: string;
  thecheckbox: boolean;
  theradios: string;
  theradios2: string;
  input1: string;
  input2: string;
  theselect: string;
};

const mapState = (state: IApplicationState) => ({
  reduxForms: state.validatedForms,
});

type DemoProps = ReturnType<typeof mapState>;

export class ReduxFormDemo extends React.Component<DemoProps, DemoState> {
  state: DemoState = {
    standardFormData: '',
    thecheckbox: true,
    theradios: '2',
    theradios2: '3',
    input1: "this isn't required",
    input2: '',
    theselect: '',
  };

  reduxFormRef = React.createRef<IValidatedReduxForm>();

  render() {
    return (
      <>
        <div className="redux-form-container">
          <ValidatedReduxForm
            ref={this.reduxFormRef}
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
