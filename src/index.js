import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import AppRouter from './containers/AppRouter';
import configureStore from './configureStore';

const store = configureStore();

const PeopleInTheOffice = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

AppRegistry.registerComponent('PeopleInTheOffice', () => PeopleInTheOffice);
