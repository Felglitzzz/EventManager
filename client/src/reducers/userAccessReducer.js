import * as actionTypes from '../actions/actionTypes';

const {
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOG_OUT
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
      userData: action.userData
    };
  case ADD_USER_FAIL:
    return {
      ...state,
      error: action.error
    };
  case LOGIN_USER_SUCCESS:
    return {
      ...state,
      loginData: action.loginData,
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
  default:
    return state;
  }
};

export default userAccessReducer;
