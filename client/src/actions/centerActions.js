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
  LOAD_ONE_CENTER_SUCCESS,
  DELETE_ONE_CENTER_FAIL,
  DELETE_ONE_CENTER_SUCCESS,
  LOAD_UNPAGINATED_CENTERS_FAIL,
  LOAD_UNPAGINATED_CENTERS_SUCCESS
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
  return axios.get(`/api/v1/centers?page=${page || 1}`, {
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

/**
 * description - defines add center success action
 *
 * @export createCenterSuccess
 *
 * @param {object} centerData
 *
 * @returns {object} action object
 */
export const createCenterSuccess = centerData => ({
  type: ADD_CENTER_SUCCESS,
  centerData
});

/**
 * description - defines create center fail action
 *
 * @export addEventFail
 *
 * @param {object} error
 *
 * @returns {object} error object
 */
export const createCenterFail = error => ({
  type: ADD_CENTER_FAIL,
  error
});

/**
 * description - handles create center action
 *
 * @export createCenter
 *
 * @param {object} centerData
 *
 * @returns {object} dispatched action
 */
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

/**
 * description - defines PUT request success action for an center
 *
 * @export updateCenterSuccess
 *
 * @param {object} updateCenterData
 *
 * @returns {object} dispatched action type and updateCenterData object
 */
export const updateCenterSuccess = updateCenterData => ({
  type: UPDATE_CENTER_SUCCESS,
  updateCenterData
});

/**
 * description - defines PUT request fail action for an center
 *
 * @export updateCenterFail
 *
 * @param {object} error
 *
 * @returns {object} dispatched action type and error object
 */
export const updateCenterFail = error => ({
  type: UPDATE_CENTER_FAIL,
  error
});

/**
 * description - handles PUT event action
 *
 * @export updateCenter
 *
 * @param {object} updateCenterData
 *
 * @returns {object} dispatched action
 */
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

/**
 * description - defines load one events success action
 *
 * @export loadOneCenterSuccess
 *
 * @param {object} centerReturned
 *
 * @returns {object} dispatched action type and retrieved center object
 */
export const loadOneCenterSuccess = centerReturned => ({
  type: LOAD_ONE_CENTER_SUCCESS,
  centerReturned
});

/**
 * description - defines load one center failure action
 *
 * @export loadOneCenterFail
 *
 * @param {object} error
 *
 * @returns {object} dispatched action type and error object
 */
export const loadOneCenterFail = error => ({
  type: LOAD_ONE_CENTER_FAIL,
  error
});

/**
 * description - handles GET request for one center
 *
 * @export loadOneCenter
 *
 * @param {object} centerId
 *
 * @returns {object} dispatched action
 */
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

/**
 * description - defines DELETE request success action for an event
 *
 * @export deleteCenterSuccess
 *
 * @param {object} deletedStatus
 *
 * @returns {object} dispatched action type and deleteStatus message
 */
export const deleteCenterSuccess = deletedStatus => ({
  type: DELETE_ONE_CENTER_SUCCESS,
  deletedStatus
});

/**
 * description - defines DELETE request fail action for a center
 *
 * @export deleteCenterFail
 *
 * @param {object} error
 *
 * @returns {object} dispatched action type and error object
 */
export const deleteCenterFail = error => ({
  type: DELETE_ONE_CENTER_FAIL,
  error
});

/**
 * description - handles DELETE request for one center
 *
 * @export deleteCenter
 *
 * @param {object} centerId
 *
 * @returns {object} dispatched action
 */
export const deleteCenter = centerId => (dispatch) => {
  const token = localStorage.getItem('x-access-token');
  return axios.delete(`/api/v1/centers/${centerId}`, {
    headers: { Authorization: token }
  })
    .then((response) => {
      dispatch(deleteCenterSuccess(response.data));
    })
    .catch((errors) => {
      dispatch(deleteCenterFail(errors));
      throw (errors.response.data.message);
    });
};

/**
 * description - defines load all unpaginated centers success action
 *
 * @export loadUnpaginatedCenterSuccess
 *
 * @param {object} unPaginatedCenters
 *
 * @returns {object} dispatched action type and loadedCenters object
 */
export const loadUnpaginatedSuccess = unPaginatedCenters => ({
  type: LOAD_UNPAGINATED_CENTERS_SUCCESS,
  unPaginatedCenters
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
export const loadUnpaginatedFail = error => ({
  type: LOAD_UNPAGINATED_CENTERS_FAIL,
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
export const loadUnpaginatedCenters = () => (dispatch) => {
  const token = localStorage.getItem('x-access-token');
  return axios.get('/api/v1/centers/views', {
    headers: {
      Authorization: token
    }
  })
    .then((response) => {
      dispatch(loadUnpaginatedSuccess(response.data));
    })
    .catch((errors) => {
      dispatch(loadUnpaginatedFail(errors));
      throw (errors.response.data.message);
    });
};
