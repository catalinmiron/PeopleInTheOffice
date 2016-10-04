import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {Actions, Scene, Router, Reducer, Schema} from 'react-native-router-flux';

import Home from './Home';
import Map from './Map';

var PushNotification = require('react-native-push-notification');

@connect(
  state => state,
  dispatch => ({ dispatch })
)
export default class AppRouter extends Component {
  componentWillMount() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
          // Alert.alert(token)
          console.log( 'TOKEN:', token );
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
          // Alert.alert(notification)
          console.log( 'NOTIFICATION:', notification );
      },

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      // senderID: "YOUR GCM SENDER ID",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
    });
  }

  render() {
    return <Router sceneStyle={{backgroundColor: '#fff'}}>
      <Scene key="root">
        <Scene key="home" component={Home} initial hideNavBar/>
        <Scene key="map" component={Map} hideNavBar={false}/>
      </Scene>
    </Router>
  }
}
