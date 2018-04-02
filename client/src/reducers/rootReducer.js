import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userAccess from './userAccessReducer';
import events from './eventReducer';
import centers from './centerReducer';
import images from './imageReducer';

const rootReducer = combineReducers({
  userAccess,
  events,
  centers,
  images,
  routing: routerReducer
});

export default rootReducer;
