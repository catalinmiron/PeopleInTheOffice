/* eslint global-require: 0 */

import Immutable from 'immutable';
import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import * as firebase from "firebase";

const middlewares = [thunk];

const server = firebase.initializeApp({
  apiKey: "AIzaSyB3G0obgj4DFslutDMJc6KpvzM8WduIVXM",
  authDomain: "peopleintheoffice-c0373.firebaseapp.com",
  databaseURL: "https://peopleintheoffice-c0373.firebaseio.com",
  storageBucket: "",
});

let enhancer;
let updateStore = f => f;
if (__DEV__) {
  /* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
  const installDevTools = require('immutable-devtools');
  const devTools = global.reduxNativeDevTools || require('remote-redux-devtools');

  installDevTools(Immutable);
  updateStore = devTools.updateStore || updateStore;

  enhancer = compose(
    applyMiddleware(...middlewares),
    devTools({
      name: Platform.OS,
      ...require('../package.json').remotedev,
    })
  );
} else {
  enhancer = applyMiddleware(...middlewares);
}

export default function configureStore(initialState) {
  const finalInitialState = Object.assign({},
    initialState,
    {server}
  );

  const store = createStore(reducer, finalInitialState, enhancer);
  updateStore(store);
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./reducers').default);
    });
  }
  return store;
}
