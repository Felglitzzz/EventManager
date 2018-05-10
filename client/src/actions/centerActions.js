import axios from 'axios';
import * as actionTypes from './actionTypes';

const {
  LOAD_ALL_CENTERS_SUCCESS,
  LOAD_ALL_CENTERS_FAIL,
  ADD_CENTER_FAIL,
  ADD_CENTER_SUCCESS,
  UPDATE_CENTER_SUCCESS,
  UPDATE_CENTER_FAIL,
  LOAD_ONE_CENTER_FAIL,
  LOAD_ONE_CENTER_SUCCESS
} = actionTypes;

/**
 * description - defines load all centers success action
 *
 * @export loadAllCenterSuccess
 *
 * @param {object} loadedCenters
 *
 * @returns {object} dispatched action type and loadedCenters object
 */
export const loadCenterSuccess = loadedCenters => ({
  type: LOAD_ALL_CENTERS_SUCCESS,
  loadedCenters
});

/**
 * description - defines load all centers failure action
 *
 * @export loadAllCenterFail
 *
 * @param {object} error
 *
 * @returns {object} dispatched action type and error object
 */
export const loadCenterFail = error => ({
  type: LOAD_ALL_CENTERS_FAIL,
  error
});

/**
 * description - handles GET request for all canters for an admin
 *
 * @export loadCenters
 *
 * @param {object} page
 *
 * @returns {object} dispatched action
 */
export const loadCenters = page => (dispatch) => {
  const token = localStorage.getItem('x-access-token');
  axios.get(`/api/v1/centers?page=${page || 1}`, {
    headers: {
      Authorization: token
    }
  })
    .then((response) => {
      dispatch(loadCenterSuccess(response.data));
    })
    .catch((errors) => {
      dispatch(loadCenterFail(errors));
      throw (errors.response.data.message);
    });
};

export const createCenterSuccess = centerData => ({
  type: ADD_CENTER_SUCCESS,
  centerData
});

export const createCenterFail = error => ({
  type: ADD_CENTER_FAIL,
  error
});

export const createCenter = centerData => (dispatch) => {
  const token = localStorage.getItem('x-access-token');
  return axios.post('/api/v1/centers', centerData, {
    headers: { Authorization: token }
  })
    .then((response) => {
      dispatch(createCenterSuccess(response.data));
    })
    .catch((errors) => {
      dispatch(createCenterFail(errors));
      throw (errors.response.data.message);
    });
};

export const updateCenterSuccess = updateCenterData => ({
  type: UPDATE_CENTER_SUCCESS,
  updateCenterData
});

export const updateCenterFail = error => ({
  type: UPDATE_CENTER_FAIL,
  error
});

export const updateCenter = updateCenterData => (dispatch) => {
  const token = localStorage.getItem('x-access-token');
  return axios.put(`/api/v1/centers/${updateCenterData.id}`, updateCenterData, {
    headers: { Authorization: token }
  })
    .then((response) => {
      dispatch(updateCenterSuccess(response.data));
    })
    .catch((errors) => {
      dispatch(updateCenterFail(errors));
      throw (errors.response.data.message);
    });
};

export const loadOneCenterSuccess = centerReturned => ({
  type: LOAD_ONE_CENTER_SUCCESS,
  centerReturned
});

export const loadOneCenterFail = error => ({
  type: LOAD_ONE_CENTER_FAIL,
  error
});

export const loadOneCenter = centerId => (dispatch) => {
  const token = localStorage.getItem('x-access-token');
  return axios.get(`/api/v1/centers/${centerId}`, {
    headers: { Authorization: token }
  })
    .then((response) => {
      dispatch(loadOneCenterSuccess(response.data));
    })
    .catch((errors) => {
      dispatch(loadOneCenterFail(errors));
      throw (errors.response.data.message);
    });
};
