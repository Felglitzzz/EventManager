import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userAccess from './userAccessReducer';
import events from './eventReducer';
import centers from './centerReducer';

const userAccessPersistConfig = {
  key: 'userAccess',
  storage,
  blacklist: ['loginError']
};

const rootReducer = combineReducers({
  userAccess: persistReducer(userAccessPersistConfig, userAccess),
  events,
  centers,
  routing: routerReducer
});

export default rootReducer;
