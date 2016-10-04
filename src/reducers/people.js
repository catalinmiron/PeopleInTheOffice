import _ from "lodash";

const initialState = {
  listening: false,
  error: null,
  isLoading: true
};

const actionsMap = {
  peopleReady(state, {payload}) {
    return Object.assign({}, state, {
      people: payload,
      isLoading: false
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
