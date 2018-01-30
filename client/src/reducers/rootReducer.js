import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userAccess from './userAccessReducer';

const rootReducer = combineReducers({
  userAccess,
  routing: routerReducer
});

export default rootReducer;
