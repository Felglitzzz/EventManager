import axios from 'axios';
import * as actionTypes from './actionTypes';

const {
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOG_OUT,
} = actionTypes;

/**
 * description - defines add user success action
 *
 * @export addUserSuccess
 *
 * @param {object} userData
 *
 * @returns {object} dispatched action type and userData object
 */
export function addUserSuccess(userData) {
  return {
    type: ADD_USER_SUCCESS,
    userData
  };
}

/**
 * description - defines add user failure action
 *
 * @export addUserFail
 *
 * @param {object} error
 *
 * @returns {object} dispatched action type and error object
 */
export function addUserFail(error) {
  return {
    type: ADD_USER_FAIL,
    error
  };
}

/**
 * description - handles add user action
 *
 * @export addNewUser
 *
 * @param {object} userData
 *
 * @returns {object} dispatched action
 */
export const addNewUser = userData => dispatch =>
  axios.post('/api/v1/users', userData)
    .then((response) => {
      dispatch(addUserSuccess(response.data));
      const { token } = response.data;
      localStorage.setItem('x-access-token', token);
    })
    .catch((errors) => {
      dispatch(addUserFail(errors.response.data.message));
      throw (errors.response.data.message);
    });

/**
 * description - defines user login success action
 *
 * @export loginUserSuccess
 *
 * @param {object} loginData
 *
 * @returns {object} dispatched action type and loginData object
 */
export function loginUserSuccess(loginData) {
  return {
    type: LOGIN_USER_SUCCESS,
    loginData
  };
}

/**
 * description - defines user login failure action
 *
 * @export loginUserFail
 *
 * @param {object} error
 *
 * @returns {object} dispatched action type and error object
 */
export function loginUserFail(error) {
  return {
    type: LOGIN_USER_FAIL,
    error
  };
}

/**
 * description - defines user logout action
 *
 * @export logOutUser
 *
 * @returns {object} dispatched action type
 */
export function logOutUser() {
  return {
    type: LOG_OUT
  };
}

/**
 * description - handles user login action
 *
 * @export loginUser
 *
 * @param {object} loginData
 *
 * @returns {object} dispatched action
 */
export const loginUser = loginData => dispatch =>
  axios.post('/api/v1/users/login', loginData)
    .then((response) => {
      dispatch(loginUserSuccess(response.data));
      const { token } = response.data;
      localStorage.setItem('x-access-token', token);
    })
    .catch((errors) => {
      dispatch(loginUserFail(errors.response.data.message));
      throw (errors.response.data.message);
    });

