import axios from 'axios';
import toastr from 'toastr';
import * as actionTypes from './actionTypes';
import history from '../helpers/history';

// axios.defaults.baseURL = 'https://eventmanager-app.herokuapp.com';

const {
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_PENDING
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
        window.localStorage.setItem('x-access-token', response.data.token);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        dispatch(addUserFail(error));
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
 * @param {object} loginData
 * @returns {func} dispatch
 */
export function loginUser(loginData) { //eslint-disable-line
  return (dispatch) => { //eslint-disable-line
    return axios.post('/api/v1/users/login', loginData)
      .then((response) => {
        dispatch(loginUserSuccess(response.data));
        window.localStorage.setItem('x-access-token', response.data.token);
        // history.push('/dashboard');
      })
      .catch((errors) => {
        dispatch(loginUserFail(errors.response.data.message));
        console.log(errors.response.data.message);
        throw (errors.response.data.message);
      });
  };
}
