import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userAccess from './userAccessReducer';
import events from './eventReducer';
import centers from './centerReducer';
import images from './imageReducer';
import initialState from '../reducers/initialState';
import * as actionTypes from '../actions/actionTypes';

const {
  LOG_OUT,
} = actionTypes;

const appReducer = combineReducers({
  userAccess,
  events,
  centers,
  images,
  routing: routerReducer
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = initialState;
  }

  return appReducer(state, action)
};

// const rootReducer = combineReducers({
//   userAccess,
//   events,
//   centers,
//   images,
//   routing: routerReducer
// });

export default rootReducer;
