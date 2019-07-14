import * as ActionTypes from './actionTypes';

export const fetchMovies = () => (dispatch) => {

  dispatch(moviesLoading(true));

  return fetch(process.env.REACT_APP_API_URL + '/movie')
    .then(response => {
      if (response.ok) {
        return response;
      }
      let error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;

    },
    error => {
      let errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then(movies => dispatch(addMovies(movies)))
    .catch(error => dispatch(moviesFailed(error.message)));
};

export const moviesLoading = () => ({
  type: ActionTypes.MOVIES_LOADING,
});

export const moviesFailed = (errmess) => ({
  type: ActionTypes.MOVIES_FAILED,
  payload: errmess,
});

export const addMovies = (movies) => ({
  type: ActionTypes.ADD_MOVIES,
  payload: movies,
});

