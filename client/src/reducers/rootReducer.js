import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userAccess from './userAccessReducer';
import eventReducer from './eventReducer';
import centerReducer from './centerReducer';
import images from './imageReducer';
import initialState from '../reducers/initialState';
import * as actionTypes from '../actions/actionTypes';

const {
  LOG_OUT,
} = actionTypes;

const appReducer = combineReducers({
  userAccess,
  eventReducer,
  centerReducer,
  images,
  routing: routerReducer
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = initialState.userAccess;
  }

  return appReducer(state, action);
};

export default rootReducer;
