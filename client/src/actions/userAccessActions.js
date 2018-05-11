import axios from 'axios';
import toastr from 'toastr';
import * as actionTypes from './actionTypes';

// axios.defaults.baseURL = 'https://eventmanager-app.herokuapp.com';

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

/**
 * description - handles successful GET request for a user
 *
 * @export getOneUserSuccess
 *
 * @param {object} userReturned
 *
 * @returns {object} dispatched action type
 */
export const getOneUserSuccess = userReturned => ({
  type: LOAD_ONE_USER_SUCCESS,
  userReturned
});

/**
 * description - handles failed GET request for a user
 *
 * @export getOneUserSuccess
 *
 * @param {object} error
 *
 * @returns {object} dispatched action type
 */
export const getOneUserFail = error => ({
  type: LOAD_ONE_USER_FAIL,
  error
});

/**
 * description - handles GET request for a user
 *
 * @export getOneUserSuccess
 *
 * @param {object} userId
 *
 * @returns {object} dispatched action type
 */
export const loadOneUser = userId => (dispatch) => {
  const token = localStorage.getItem('x-access-token');
  axios.get(`/api/v1/users/${userId}`, {
    headers: { Authorization: token }
  })
    .then((response) => {
      dispatch(getOneUserSuccess(response.data));
    })
    .catch((errors) => {
      dispatch(getOneUserFail(errors.response.data.message));
      toastr.error(errors.response.data.message);
    });
};

