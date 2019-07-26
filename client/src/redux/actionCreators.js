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
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
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
    .catch(error => dispatch(authError('')));
};

export const authSuccess = (email) => ({
  type: ActionTypes.AUTH_SUCCESS,
  payload: email,
});

export const authError = (errmess) => ({
  type: ActionTypes.AUTH_ERROR,
  payload: errmess,
});

export const login = (data, ownProps) => (dispatch) => {

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
      ownProps.history.push('/');
      dispatch(authSuccess(user.email));
    })
    .catch(error => dispatch(authError(error.message)));
};

export const register = (data, ownProps) => (dispatch) => {

  let endpoint = process.env.REACT_APP_API_URL + '/auth/register';

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
      ownProps.history.push('/');
      dispatch(authSuccess(user.email));
    })
    .catch(error => dispatch(authError(error.message)));
};

export const authLogOut = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({
    type: ActionTypes.AUTH_LOG_OUT,
  });
};

export const fetchOrders = (type) => (dispatch) => {

  dispatch(ordersLoading(true));

  let endpoint = process.env.REACT_APP_API_URL + '/order';

  if (type) {
    endpoint += '?type=' + type;
  }

  return fetch(endpoint, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
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
    .then(orders => dispatch(addOrders(orders)))
    .catch(error => dispatch(ordersFailed(error.message)));
};

export const ordersLoading = () => ({
  type: ActionTypes.ORDERS_LOADING,
});

export const ordersFailed = (errmess) => ({
  type: ActionTypes.ORDERS_FAILED,
  payload: errmess,
});

export const addOrders = (orders) => ({
  type: ActionTypes.ADD_ORDERS,
  payload: orders,
});

export const cinemaSelected = (cinema) => ({
  type: ActionTypes.MOVIE_CINEMA_SELECTED,
  payload: cinema,
});

export const dateSelected = (date) => ({
  type: ActionTypes.MOVIE_DATE_SELECTED,
  payload: date,
});

export const timeSelected = (time) => ({
  type: ActionTypes.MOVIE_TIME_SELECTED,
  payload: time,
});

export const seatSelected = (seats) => ({
  type: ActionTypes.MOVIE_SEATS_SELECTED,
  payload: seats,
});

export const seatRemoved = (seat) => ({
  type: ActionTypes.MOVIE_SEATS_REMOVED,
  payload: seat,
});

export const orderSaving = (sessionId, seats, ownProps) => (dispatch) => {
  let endpoint = process.env.REACT_APP_API_URL + '/order';

  return fetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify({
      sessionId: sessionId,
      seats: seats,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
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
    .then(order => {
      ownProps.history.push('/confirmation');
      dispatch(orderSaveSuccess(order));
    })
    .catch(error => dispatch(orderSaveFailed(error.message)));
};

export const orderSaveFailed = (errmess) => ({
  type: ActionTypes.ORDER_SAVE_FAILED,
  payload: errmess,
});

export const orderSaveSuccess = (order) => ({
  type: ActionTypes.ORDER_SAVE_SUCCESS,
  payload: order,
});

export const orderSubmiting = (orderId, ownProps) => (dispatch) => {
  let endpoint = process.env.REACT_APP_API_URL + '/order';

  return fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({
      orderId: orderId,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
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
    .then(order => {
      ownProps.history.push('/');
      dispatch(orderSubmitSuccess(order));
    })
    .catch(error => dispatch(orderSubmitFailed(error.message)));
};

export const orderSubmitFailed = (errmess) => ({
  type: ActionTypes.ORDER_SUBMITING_FAILED,
  payload: errmess,
});

export const orderSubmitSuccess = (order) => ({
  type: ActionTypes.ORDER_SUBMITING_SUCCESS,
  payload: order,
});
