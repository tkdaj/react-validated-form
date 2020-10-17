import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Demo from './Demo';

const App = () => (
  <Provider store={store}>
    <Demo />
  </Provider>
);

export default App;
