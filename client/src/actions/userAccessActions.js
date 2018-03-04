import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as actionTypes from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

// axios.defaults.baseURL = 'https://eventmanager-app.herokuapp.com';

const {
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_PENDING,
  LOG_OUT
} = actionTypes;

/**
 * @param {object} userData
 * @returns {object} action type and payload
 */
export function addUserSuccess(userData) {
  return {
    type: ADD_USER_SUCCESS,
    userData
  };
}

/**
 * @param {object} error
 * @returns {object} action type and error
 */
export function addUserFail(error) {
  return {
    type: ADD_USER_FAIL,
    error
  };
}

/**
 * @param {object} userData
 * @returns {func} dispatch
 */
export function addNewUser(userData) { //eslint-disable-line
  return (dispatch) => { //eslint-disable-line
    return axios.post('/api/v1/users', userData)
      .then((response) => {
        dispatch(addUserSuccess(response.data));
        const { token } = response.data;
        localStorage.setItem('x-access-token', token);
        setAuthorizationToken(token);
        console.log(response);
      })
      .catch((errors) => {
        dispatch(addUserFail(errors));
        throw (errors.response.data.error);
      });
  };
}

/**
 * @param {object} loginData
 * @returns {object} action type and payload
 */
export function loginUserSuccess(loginData) {
  return {
    type: LOGIN_USER_SUCCESS,
    loginData
  };
}

/**
 * @param {object} isLoginPending
 * @returns {object} action type and payload
 */
export function loginUserPending(isLoginPending) {
  return {
    type: LOGIN_USER_PENDING,
    isLoginPending
  };
}

/**
 * @param {object} error
 * @returns {object} error
 */
export function loginUserFail(error) {
  return {
    type: LOGIN_USER_FAIL,
    error
  };
}
/**
 * @returns {object} action type and payload
 */
export function logOutUser() {
  return {
    type: LOG_OUT
  };
}

/**
 * @param {object} loginData
 * @returns {func} dispatch
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
      console.log(errors.response);
      console.log(errors.response.message);
      throw (errors.response.data.message);
    });
