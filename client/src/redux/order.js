import * as ActionTypes from './actionTypes';

export const Order = (state = {
  order: null,
  errMess: null,
  status: null,
}, action) => {
  switch (action.type) {
  case ActionTypes.ORDER_SAVE_SUCCESS:
    return { ...state,
      errMess: null,
      order: action.payload,
      status: 'SAVED' };
  case ActionTypes.ORDER_SAVE_FAILED:
    return { ...state,
      errMess: action.payload,
      order: null,
      status: null };
  case ActionTypes.ORDER_SUBMITING_SUCCESS:
    return { ...state,
      errMess: null,
      order: action.payload,
      status: 'SUBMITED' };
  case ActionTypes.ORDER_SUBMITING_FAILED:
    return { ...state,
      errMess: action.payload,
      order: null,
      status: null };
  default:
    return state;
  }
};
