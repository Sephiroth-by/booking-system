import * as ActionTypes from './actionTypes';

export const User = (state = {
  loggedIn: false,
  email: null,
  errMess: null,
}, action) => {
  switch (action.type) {
  case ActionTypes.AUTH_SUCCESS:
    return { ...state,
      loggedIn: true,
      email: action.payload,
      errMess: null };
  case ActionTypes.AUTH_ERROR:
    return { ...state,
      loggedIn: false,
      email: null,
      errMess: action.payload };
  case ActionTypes.AUTH_LOG_OUT:
    return { ...state,
      loggedIn: false,
      email: null,
      errMess: null };
  default:
    return state;
  }
};
