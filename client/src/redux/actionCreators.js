import * as ActionTypes from './actionTypes';

export const fetchMovies = (term) => (dispatch) => {

  dispatch(moviesLoading(true));

  let endpoint = process.env.REACT_APP_API_URL + '/movie';

  if (term) {
    endpoint += '?term=' + term;
  }

  return fetch(endpoint)
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

export const fetchMovie = (id) => (dispatch) => {

  dispatch(movieLoading(true));

  let endpoint = process.env.REACT_APP_API_URL + '/session/' + id;

  return fetch(endpoint)
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
    .then(movie => dispatch(addMovie(movie)))
    .catch(error => dispatch(movieFailed(error.message)));
};

export const movieLoading = () => ({
  type: ActionTypes.MOVIE_LOADING,
});

export const movieFailed = (errmess) => ({
  type: ActionTypes.MOVIE_FAILED,
  payload: errmess,
});

export const addMovie = (movie) => ({
  type: ActionTypes.ADD_MOVIE,
  payload: movie,
});

export const checkToken = (id) => (dispatch) => {

  let endpoint = process.env.REACT_APP_API_URL + '/auth';

  return fetch(endpoint, {
    headers: {
      'Authorization': 'Bearer' + localStorage.getItem('token'),
    },
  })
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
    .then(user => dispatch(authSuccess(user.email)))
    .catch(error => dispatch(authError(error.message)));
};

export const authSuccess = (email) => ({
  type: ActionTypes.AUTH_SUCCESS,
  payload: email,
});

export const authError = (errmess) => ({
  type: ActionTypes.AUTH_ERROR,
  payload: errmess,
});

export const login = (data) => (dispatch) => {

  let endpoint = process.env.REACT_APP_API_URL + '/auth/login';

  return fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
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
    .then(user => {
      localStorage.setItem('token', user.token);
      dispatch(authSuccess(user.email));
    })
    .catch(error => dispatch(authError(error.message)));
};

