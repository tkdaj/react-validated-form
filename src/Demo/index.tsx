import React from 'react';
import StandardForm from './StandardFormDemo';
import ReduxForm from './ReduxFormDemo';
import './demo.scss';

export default () => (
  <div className="demo-container">
    <ReduxForm />
    <StandardForm />
  </div>
);
