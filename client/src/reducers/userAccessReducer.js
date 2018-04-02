import * as actionTypes from '../actions/actionTypes';

const {
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOG_OUT,
  LOAD_ONE_USER_FAIL,
  LOAD_ONE_USER_SUCCESS
} = actionTypes;

/**
 * @param {object} state
 * @param {object} action
 * @returns {object} action implemented and resulting payload
 */
const userAccessReducer = (state = { isAuthenticated: false }, action) => {
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
      loginError: action.error,
      isAuthenticated: false
    };
  case LOG_OUT:
    return {
      ...state,
      isAuthenticated: false
    };
  case LOAD_ONE_USER_SUCCESS:
    return {
      ...state,
      userReturned: action.userReturned
    };
  case LOAD_ONE_USER_FAIL:
    return {
      ...state,
      error: action.error
    };
  default:
    return state;
  }
};

export default userAccessReducer;
