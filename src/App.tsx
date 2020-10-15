import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Demo from "./Demo";

// Do something about selecting the default element
// Add rollup to build lib for use

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Demo />
      </Provider>
    );
  }
}

export default App;
