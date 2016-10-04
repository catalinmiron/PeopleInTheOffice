import DeviceInfo from 'react-native-device-info';

const uid = DeviceInfo.getUniqueID();

export function listen() {
  return (dispatch, getState) => {
    const {server, auth} = getState();
    listenRef = server.database().ref();
    
    listenRef.on('value', snapshot => {
      dispatch({type: 'peopleReady', payload: snapshot.val()})
    })

    dispatch({
      type: 'listening'
    })
  }
}

export function unlisten() {
  return (dispatch, getState) => {
    const {server} = getState();
    listenRef.off();
  }
}

export function setStatus(status) {
  return (dispatch, getState) => {
    const {server, auth} = getState();

    const promises = server.database().ref(uid).set(status);

    Promise.all([promises]).then(res => {
      console.log(res)
    })
    .catch((err) => {
      console.log('implement error')
      dispatch({
        type: 'peopleAddedError',
        payload: err
      })
    })
  }
}
