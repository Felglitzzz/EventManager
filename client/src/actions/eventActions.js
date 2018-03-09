import axios from 'axios';
import * as actionTypes from './actionTypes';
import { cloudinaryPreset } from '../utils/cloudinary';

const {
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,
  LOAD_ALL_EVENTS_SUCCESS,
  LOAD_ALL_EVENTS_FAIL,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  LOAD_ONE_EVENT_FAIL,
  LOAD_ONE_EVENT_SUCCESS,
  SAVE_IMAGE_FAIL,
  SAVE_IMAGE_SUCCESS
} = actionTypes;

/**
 * @export addEventSuccess
 * @desc defines addEventSuccess action
 * @param {object} eventData
 * @returns {object} action object
 */
export const addEventSuccess = eventData => ({
  type: ADD_EVENT_SUCCESS,
  eventData
});

/**
 * function addEventFail
 * @param {object} error
 * @returns {object} error object
 */
export const addEventFail = error => ({
  type: ADD_EVENT_FAIL,
  error
});

/**
 * function addNewEvent
 * @param {object} eventData
 * @returns {func} adds new event
 */
export const addNewEvent = eventData => (dispatch) => {
  const token = localStorage.getItem('x-access-token');
  return axios.post('/api/v1/events', eventData, {
    headers: { Authorization: token }
  })
    .then((response) => {
      dispatch(addEventSuccess(response.data));
    })
    .catch((errors) => {
      dispatch(addEventFail(errors));
      console.log(errors.response.data.message);
      throw (errors.response.data.message);
    });
};

/**
 * @export loadAllEventsFail
 * @description Defines loadAllEventFail action
 * @param {object} error
 * @returns {object} Action Type and error
 */
export const loadAllEventFail = error => ({
  type: LOAD_ALL_EVENTS_FAIL,
  error
});

/**
 * @export loadAllEventsSuccess
 * @description Defines loadAllEventSuccess action
 * @param {object} loadedEvents
 * @returns {object} Action Type and loadedevents
 */
export function loadAllEventSuccess(loadedEvents) {
  return {
    type: LOAD_ALL_EVENTS_SUCCESS,
    loadedEvents
  };
}


/**
 * @export loadAllEvent
 * @description Defines loadAllEvents action
 * @param {func} dispatch
 * @returns {object} axios response
 */
export function loadAllEvent() {
  const token = localStorage.getItem('x-access-token');
  return dispatch =>
    axios.get('/api/v1/events', {
      headers: { Authorization: token }
    })
      .then((response) => {
        dispatch(loadAllEventSuccess(response.data));
      })
      .catch((errors) => {
        dispatch(loadAllEventFail(errors));
        console.log(errors.response.data.message);
        throw (errors.response.data.message);
      });
}

export const updateEventSuccess = updateEventData => ({
  type: UPDATE_EVENT_SUCCESS,
  updateEventData
});

export const updateEventFail = error => ({
  type: UPDATE_EVENT_FAIL,
  error
});
/**
 * @param {object} updateEventData
 * @returns {object} updated event
 */
export function updateEvent(updateEventData) {
  const token = localStorage.getItem('x-access-token');
  return (dispatch) => {
    return axios.put(`/api/v1/events/${updateEventData.id}`, updateEventData, {
      headers: { Authorization: token }
    })
      .then((response) => {
        dispatch(updateEventSuccess(response.data));
      })
      .catch((errors) => {
        dispatch(updateEventFail(errors));
        console.log(errors.response);
        console.log(errors.response.data.message);
        throw (errors.response.data.message);
      });
  };
}

export const loadOneEventSuccess = eventReturned => ({
  type: LOAD_ONE_EVENT_SUCCESS,
  eventReturned
});

export const loadOneEventFail = error => ({
  type: LOAD_ONE_EVENT_FAIL,
  error
});

export const loadOneEvent = eventId => (dispatch) => {
  const token = localStorage.getItem('x-access-token');
  axios.get(`/api/v1/events/${eventId}`, {
    headers: { Authorization: token }
  })
    .then((response) => {
      console.log(response);
      dispatch(loadOneEventSuccess(response.data));
    })
    .catch((errors) => {
      dispatch(loadOneEventFail(errors));
      console.log(errors.response.data.message);
      throw (errors.response.data.message);
    });
};

export const saveImageSuccess = saveImage => ({
  type: SAVE_IMAGE_SUCCESS,
  saveImage
});

export const saveImageFail = error => ({
  type: SAVE_IMAGE_FAIL,
  error
});

export const uploadToCloudinary = (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', cloudinaryPreset);

  return dispatch =>
    axios.post('https://api.cloudinary.com/v1_1/felglitz/image/upload', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then((response) => {
        dispatch(saveImageSuccess(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        dispatch(saveImageFail(error));
      });
};

