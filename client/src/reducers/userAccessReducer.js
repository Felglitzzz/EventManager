import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';


const {
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} = actionTypes;

/**
 * @param {object} state
 * @param {object} action
 * @returns {object} action implemented and resulting payload
 */
const userAccessReducer = (state = initialState.userAccess, action) => {
  const { type } = action;

  switch (type) {
  case ADD_USER_SUCCESS:
    return {
      ...state,
      userData: action.userData,
      isAuthenticated: true
    };
  case ADD_USER_FAIL:
    return {
      ...state,
      error: action.error,
      isAuthenticated: false
    };
  case LOGIN_USER_SUCCESS:
    return {
      ...state,
      userData: action.loginData,
      isAuthenticated: true,
    };
  case LOGIN_USER_FAIL:
    return {
      ...state,
      error: action.error,
      isAuthenticated: false
    };
  default:
    return state;
  }
};

export default userAccessReducer;
