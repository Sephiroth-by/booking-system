import * as ActionTypes from './actionTypes';
import moment from 'moment';

export const Movie = (state = {
  isLoading: true,
  errMess: null,
  movie: null,
  sessions: [],
  availableCinemas: [],
  availableDates: [],
  availableTimes: [],
  selectedSession: null,
  selectedCinema: null,
  selectedDate: null,
  selectedTime: null,
  selectedSeats: [],
}, action) => {
  switch (action.type) {
  case ActionTypes.ADD_MOVIE:
    return {
      ...state,
      isLoading: false,
      movie: action.payload.movie,
      sessions: action.payload.sessions,
      availableCinemas: action.payload.sessions.map(s => s.cinema.name),
    };
  case ActionTypes.MOVIE_LOADING:
    return {
      ...state,
      isLoading: true,
      errMess: null,
      movie: null,
      sessions: [],
      availableCinemas: [],
      availableDates: [],
      availableTimes: [],
      selectedSession: null,
      selectedCinema: null,
      selectedDate: null,
      selectedTime: null,
      selectedSeats: [],
    };
  case ActionTypes.MOVIE_FAILED:
    return {
      ...state,
      isLoading: false,
      errMess: action.payload,
    };
  case ActionTypes.MOVIE_CINEMA_SELECTED:
    return {
      ...state,
      availableDates: state.sessions.filter(s => s.cinema.name===action.payload).map(s => moment(s.startTime).format('DD MMM')),
      selectedCinema: action.payload,
    };
  case ActionTypes.MOVIE_DATE_SELECTED:
    return {
      ...state,
      availableTimes: state.sessions.filter(s => s.cinema.name===state.selectedCinema &&
         moment(s.startTime).date() === moment(action.payload).date() &&
         moment(s.startTime).month() === moment(action.payload).month())
        .map(s => moment(s.startTime).format('HH:mm')),
      selectedDate: action.payload,
    };
  case ActionTypes.MOVIE_TIME_SELECTED:
    return {
      ...state,
      selectedSession: state.sessions.filter(s => s.cinema.name === state.selectedCinema &&
        moment(s.startTime).date() === moment(state.selectedDate).date() &&
        moment(s.startTime).month() === moment(state.selectedDate).month() &&
        moment(s.startTime).hour() === moment(action.payload, ['hh:mm']).hour() &&
        moment(s.startTime).minutes() === moment(action.payload, ['hh:mm']).minutes())[0],
      selectedTime: action.payload,
    };
  case ActionTypes.MOVIE_SEATS_SELECTED:
    return {
      ...state,
      selectedSeats: [...state.selectedSeats, action.payload],
    };
  case ActionTypes.MOVIE_SEATS_REMOVED:
    return {
      ...state,
      selectedSeats: state.selectedSeats.filter(seat => seat[0] !== action.payload[0] && seat[1] !== action.payload[1]),
    };
  default:
    return state;
  }
};
