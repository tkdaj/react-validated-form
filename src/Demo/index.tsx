import React from 'react';
import StandardForm from './StandardFormDemo';
import ReduxForm from './ReduxFormDemo';
import './demo.scss';

// TODO: fix duplicate code -- use composition
// fix typescript in build

export default () => (
  <div className="demo-container">
    <ReduxForm />
    <StandardForm />
  </div>
);
