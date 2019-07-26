import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import { Movies } from './movies';
import { Movie } from './movie';
import { User } from './user';
import { Orders } from './orders';
import { Order } from './order';

export const ConfigureStore = () => {
  const store = createStore(combineReducers({
    movies: Movies,
    movie: Movie,
    user: User,
    orders: Orders,
    order: Order,
  }), composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};
