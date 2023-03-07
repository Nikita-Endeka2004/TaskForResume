import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ClassComponent from './components/ClassComponent';
import rootReducer from './components/reducers';
import './App.css';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <ClassComponent />
  </Provider>,
  document.getElementById('root')
);
