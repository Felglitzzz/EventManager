import * as actionTypes from '../actions/actionTypes';

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
export default function userAccessReducer(state = {}, action) {
  const { type } = action;

  switch (type) {
    case ADD_USER_SUCCESS:
      return Object.assign({}, state, {
        userData: action.userData
      });
    case ADD_USER_FAIL:
      return Object.assign({}, state, {
        error: action.error
      });
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        loginData: action.loginData
      });
    case LOGIN_USER_FAIL:
      return Object.assign({}, state, {
        loginError: action.error
      });
    default:
      return state;
  }
}
