import React from 'react';
import StandardForm from './StandardFormDemo';
import ReduxForm from './ReduxFormDemo';
import './demo.scss';

// TODO: fix duplicate code -- use composition
// add logic to store "type" along with name of field -- if there are multiples with the same name and they are different types, throw an error
// (ex: multiple radios are expected to share a name, but not two different types of inputs)
// This logic can be easily added to getFieldsInForm in shared.ts?

export default () => (
  <div className="demo-container">
    <ReduxForm />
    <StandardForm />
  </div>
);
