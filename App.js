import React, { Component } from 'react';
import StackRouter from './StackRouter';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import RootReducer from './reducer/RootReducer'
let store = createStore(RootReducer, applyMiddleware(thunk));
class App extends Component {
  static navigationOptions = {
    header: false
  }
  state = {}
  render() {
    return (
      <Provider store={store}>
        <StackRouter />
      </Provider>
    );
  }
}

export default App;
