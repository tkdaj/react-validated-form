import React, { FC, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from 'store';
import { TextField } from '@material-ui/core';
import ValidatedReduxForm from './Form/ValidatedReduxForm';
import ValidatedForm from './Form/ValidatedForm';
import './demo.scss';

const mapState = (state: IApplicationState) => ({
  reduxForms: state.validatedForms,
});

type DemoProps = ReturnType<typeof mapState>;

// TODO: Add logic for initial values and proper initial error states
// What happens when user handles their own state and events?
// fix duplicate code -- use composition
// fix typescript in build

const Demo: FC<DemoProps> = ({ reduxForms }) => {
  const reduxFormRef = useRef<typeof ValidatedReduxForm>(null);
  const standardFormRef = useRef<ValidatedForm>(null);
  const [form2Data, setForm2Data] = useState('');
  return (
    <div className="demo-container">
      <div className="redux-form-container">
        <ValidatedReduxForm
          ref={reduxFormRef}
          name="demoReduxForm"
          className="redux-form"
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
          initialFieldValues={{
            select: '1',
          }}
        >
          <input name="thecheckbox" type="checkbox" required />
          <label htmlFor="theradios">
            <input
              id="theradios"
              name="theradios"
              required
              type="radio"
              value="1"
            />
            <input name="theradios" type="radio" value="2" />
            <input name="theradios" type="radio" value="3" />
          </label>
          <label htmlFor="theradios2">
            <input
              id="theradios2"
              name="theradios2"
              required
              type="radio"
              value="1"
            />
            <input name="theradios2" type="radio" value="2" />
            <input name="theradios2" type="radio" value="3" />
          </label>
          <TextField
            name="input2"
            margin="dense"
            label="Input 2"
            type="text"
            required
            inputProps={{ pattern: '\\d+' }}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="new">test</label>
          <select required name="select" id="new">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button type="submit">Submit</button>
          <button
            onClick={() => {
              // eslint-disable-next-line no-unused-expressions
              (reduxFormRef?.current as any)?.resetForm();
            }}
            type="button"
          >
            Reset redux form
          </button>
        </ValidatedReduxForm>
      </div>
      <div className="redux-data">
        <pre>{JSON.stringify(reduxForms.demoReduxForm, null, 2)}</pre>
      </div>

      <div className="standard-form-container">
        <ValidatedForm
          ref={standardFormRef}
          className="standard-form"
          name="standardForm"
          onFormChanged={(_field, updatedFormState) => {
            setForm2Data(JSON.stringify(updatedFormState, null, 2));
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
          <input name="thecheckbox" type="checkbox" required />
          <label htmlFor="theradios">
            <input
              id="theradios"
              name="theradios"
              required
              type="radio"
              value="1"
            />
            <input name="theradios" type="radio" value="2" />
            <input name="theradios" type="radio" value="3" />
          </label>
          <label htmlFor="theradios2">
            <input
              id="theradios2"
              name="theradios2"
              required
              type="radio"
              value="1"
            />
            <input name="theradios2" type="radio" value="2" />
            <input name="theradios2" type="radio" value="3" />
          </label>
          <input name="input1" />
          <TextField
            name="input2"
            margin="dense"
            label="Input 2"
            type="text"
            required
            inputProps={{ pattern: '\\d+' }}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="new">test</label>
          <select required name="select" id="new">
            <option value="">Default</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button type="submit">Submit</button>
          <button
            onClick={() => {
              // eslint-disable-next-line no-unused-expressions
              (standardFormRef?.current as any)?.resetForm();
            }}
            type="button"
          >
            Reset standard form
          </button>
        </ValidatedForm>
      </div>
      <div className="standard-data">
        <pre>{form2Data}</pre>
      </div>
    </div>
  );
};

export default connect(mapState)(Demo);
