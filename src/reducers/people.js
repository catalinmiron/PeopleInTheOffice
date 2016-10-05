import _ from "lodash";
import {Alert} from 'react-native'

const initialState = {
  listening: false,
  error: null,
  isLoading: true,
  isOnline: true
};

const actionsMap = {
  peopleReady(state, {payload}) {
    return Object.assign({}, state, {
      people: payload,
      isLoading: false
    })
  },
  isOnline(state, status) {
    return Object.assign({}, state, {
      isOnline: status.status
    })
  },
  listening(state, action) {
    return Object.assign({}, state, {
      listening: true
    })
  }
};

export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
