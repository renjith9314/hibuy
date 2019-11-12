import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import Main from './Container';
import configureStore from "./Store";

import "./styles/index.scss"

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Main />
        </Router>
      </Provider>
    )
  }
}

export default App;
