import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import { Movies } from './movies';
import { Movie } from './movie';
import { User } from './user';

export const ConfigureStore = () => {
  const store = createStore(combineReducers({
    movies: Movies,
    movie: Movie,
    user: User,
  }), composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};
