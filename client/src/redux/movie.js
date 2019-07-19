import * as ActionTypes from './actionTypes';

export const Movie = (state = {
  isLoading: true,
  errMess: null,
  movie: null,
}, action) => {
  switch (action.type) {
  case ActionTypes.ADD_MOVIE:
    return { ...state,
      isLoading: false,
      errMess: null,
      movie: action.payload };
  case ActionTypes.MOVIE_LOADING:
    return { ...state,
      isLoading: true,
      errMess: null,
      movie: null };
  case ActionTypes.MOVIE_FAILED:
    return { ...state,
      isLoading: false,
      errMess: action.payload,
      movie: null };
  default:
    return state;
  }
};
