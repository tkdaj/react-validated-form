/* eslint-disable react/no-unused-state */
import React from 'react';
import ValidatedForm from '../Form/ValidatedForm';
import { getSharedFields } from './sharedFormFields';

type DemoState = {
  standardFormData: string;
  thecheckbox: boolean;
  theradios: string;
  theradios2: string;
  input1: string;
  input2: string;
  theselect: string;
};

export default class StandardFormDemo extends React.Component<{}, DemoState> {
  state: DemoState = {
    standardFormData: '',
    thecheckbox: false,
    theradios: '3',
    theradios2: '',
    input1: '',
    input2: '',
    theselect: '',
  };

  formRef = React.createRef<ValidatedForm>();

  render() {
    return (
      <>
        <div className="standard-form-container">
          <ValidatedForm
            ref={this.formRef}
            className="standard-form"
            name="standardForm"
            noValidate
            onFormChanged={(_field, updatedFormState) => {
              this.setState({
                standardFormData: JSON.stringify(updatedFormState, null, 2),
              });
            }}
            customValidators={{
              field2: {
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
            {getSharedFields.call(this)}
          </ValidatedForm>
        </div>
        <div className="standard-data">
          <pre>{this.state.standardFormData}</pre>
        </div>
      </>
    );
  }
}
