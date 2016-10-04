import React, {Component} from 'react'
import {Platform, View, Text} from 'react-native'
var DeviceInfo = require('react-native-device-info');
import _ from 'lodash';


export default (aloha) => {
  return <Text>
    {DeviceInfo.getUniqueID()}
  </Text>
}
