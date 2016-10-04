'use strict';

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  MapView,
  Dimensions,
  Alert
} from 'react-native';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import inOffice from '../lib/in-office'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bar: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 40,
    height: 40,
  }
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      annotations: [],
      isTracking: false
    };
  }

  componentWillMount() {
    BackgroundGeolocation.configure({
      desiredAccuracy: 5,
      stationaryRadius: 0,
      activityType: 'Fitness',
      distanceFilter: 5,
      debug: false,
      stopOnTerminate: false,
      interval: 5000,
      url: 'http://192.168.81.15:3000/location',
      httpHeaders: {
        'X-FOO': 'bar'
      }
    }, function () {});

    BackgroundGeolocation.on('location', (location) => {
      console.log('[DEBUG] BackgroundGeolocation location', location);
      const longitudeDelta = 0.01;
      const latitudeDelta = 0.01;
      const region = Object.assign({}, location, { latitudeDelta, longitudeDelta });
      // Alert.alert(JSON.stringify(location))
      const xxx = this.isInOffice(location) ? 'true' : 'false'


      const annotations = this.state.annotations.slice(0);
      annotations.push(Object.assign({}, location, { image: require('../images/TrackingDot.png') }));
      this.setState({ annotations, region });
    });
  }

  isInOffice(location) {
    const {longitude, latitude} = location;
    // inOffice(longitude, latitude, office)
    return inOffice(longitude, latitude);
  }

  toggleTracking() {
    if (this.state.isTracking) {
      this.stopTracking();
    } else {
      this.startTracking();
    }
  }

  startTracking() {
    if (this.state.isTracking) { return; }

    BackgroundGeolocation.start(() => {
      console.log('[DEBUG] BackgroundGeolocation started successfully');
    });
    this.setState({ isTracking: true });
  }

  stopTracking() {
    if (!this.state.isTracking) { return; }

    BackgroundGeolocation.stop();
    this.setState({ isTracking: false });
  }

  render() {
    var { height, width } = Dimensions.get('window');
    var Button = this.state.isTracking
      ? <Image style={styles.button} source={require('../images/stop.png')} />
      : <Image style={styles.button} source={require('../images/start.png')} />

    return (
      <View style={styles.container}>
        <MapView
          style={{ height: height - styles.bar.height, width, flex: 1 }}
          region={this.state.region}
          annotations={this.state.annotations}
        />
        <View style={styles.bar}>
          <TouchableOpacity onPress={this.toggleTracking.bind(this)}>
            {Button}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


export default Map;
