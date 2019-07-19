import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import { Movies } from './movies';
import { Movie } from './movie';

export const ConfigureStore = () => {
  const store = createStore(combineReducers({
    movies: Movies,
    movie: Movie,
  }), composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};
