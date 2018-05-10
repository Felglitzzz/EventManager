import axios from 'axios';

import * as actionTypes from './actionTypes';

const {
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,
  LOAD_ALL_EVENTS_SUCCESS,
  LOAD_ALL_EVENTS_FAIL,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  LOAD_ONE_EVENT_FAIL,
  LOAD_ONE_EVENT_SUCCESS,
  DELETE_ONE_EVENT_FAIL,
  DELETE_ONE_EVENT_SUCCESS,
  LOAD_EVENTS_BY_CENTER_ID_SUCCESS,
  LOAD_EVENTS_BY_CENTER_ID_FAIL
} = actionTypes;

/**
 * description - defines add event success action
 *
 * @export addEventSuccess
 *
 * @param {object} eventData
 *
 * @returns {object} action object
 */
export const addEventSuccess = eventData => ({
  type: ADD_EVENT_SUCCESS,
  eventData
});

/**
 * description - defines add event failure action
 *
 * @export addEventFail
 *
 * @param {object} error
 *
 * @returns {object} error object
 */
export const addEventFail = error => ({
  type: ADD_EVENT_FAIL,
  error
});

/**
 * description - handles add event action
 *
 * @export addNewEvent
 *
 * @param {object} eventData
 *
 * @returns {object} dispatched action
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
      throw (errors.response.data.message);
    });
};

/**
 * description - defines load all events failure action
 *
 * @export loadAllEventFail
 *
 * @param {object} error
 *
 * @returns {object} dispatched action type and error object
 */
export const loadAllEventFail = error => ({
  type: LOAD_ALL_EVENTS_FAIL,
  error
});

/**
 * description - defines load all events success action
 *
 * @export loadAllEventSuccess
 *
 * @param {object} loadedEvents
 *
 * @returns {object} dispatched action type and loadedEvents object
 */
export function loadAllEventSuccess(loadedEvents) {
  return {
    type: LOAD_ALL_EVENTS_SUCCESS,
    loadedEvents
  };
}


/**
 * description - handles GET request for all events for a user
 *
 * @export loadAllEvent
 *
 * @param {object} page
 *
 * @returns {object} dispatched action
 */
export function loadAllEvent(page) {
  const token = localStorage.getItem('x-access-token');
  return dispatch =>
    axios.get(`/api/v1/events?page=${page || 1}`, {
      headers: { Authorization: token }
    })
      .then((response) => {
        dispatch(loadAllEventSuccess(response.data));
      })
      .catch((errors) => {
        dispatch(loadAllEventFail(errors));
        throw (errors.response.data.message);
      });
}

/**
 * description - defines PUT request success action for an event
 *
 * @export updateEventSuccess
 *
 * @param {object} updateEventData
 *
 * @returns {object} dispatched action type and updateEventData object
 */
export const updateEventSuccess = updateEventData => ({
  type: UPDATE_EVENT_SUCCESS,
  updateEventData
});


/**
 * description - defines PUT request fail action for an event
 *
 * @export updateEventFail
 *
 * @param {object} error
 *
 * @returns {object} dispatched action type and error object
 */
export const updateEventFail = error => ({
  type: UPDATE_EVENT_FAIL,
  error
});

/**
 * description - handles PUT event action
 *
 * @export updateEvent
 *
 * @param {object} updateEventData
 *
 * @returns {object} dispatched action
 */
export function updateEvent(updateEventData) {
  const token = localStorage.getItem('x-access-token');
  return dispatch =>
    axios.put(`/api/v1/events/${updateEventData.id}`, updateEventData, {
      headers: { Authorization: token }
    })
      .then((response) => {
        dispatch(updateEventSuccess(response.data));
      })
      .catch((errors) => {
        dispatch(updateEventFail(errors));
        throw (errors.response.data.message);
      });
}

/**
 * description - defines load one events success action
 *
 * @export loadOneEventSuccess
 *
 * @param {object} eventReturned
 *
 * @returns {object} dispatched action type and retrieved event object
 */
export const loadOneEventSuccess = eventReturned => ({
  type: LOAD_ONE_EVENT_SUCCESS,
  eventReturned
});

/**
 * description - defines load one event failure action
 *
 * @export loadOneEventFail
 *
 * @param {object} error
 *
 * @returns {object} dispatched action type and error object
 */
export const loadOneEventFail = error => ({
  type: LOAD_ONE_EVENT_FAIL,
  error
});


/**
 * description - handles GET request for one event
 *
 * @export loadOneEvent
 *
 * @param {object} eventId
 *
 * @returns {object} dispatched action
 */
export const loadOneEvent = eventId => (dispatch) => {
  const token = localStorage.getItem('x-access-token');
  axios.get(`/api/v1/events/${eventId}`, {
    headers: { Authorization: token }
  })
    .then((response) => {
      dispatch(loadOneEventSuccess(response.data));
    })
    .catch((errors) => {
      dispatch(loadOneEventFail(errors.response.data.message));
      throw (errors.response.data.message);
    });
};

/**
 * description - defines DELETE request success action for an event
 *
 * @export deleteEventSuccess
 *
 * @param {object} deletedStatus
 *
 * @returns {object} dispatched action type and deleteStatus message
 */
export const deleteEventSuccess = deletedStatus => ({
  type: DELETE_ONE_EVENT_SUCCESS,
  deletedStatus
});

/**
 * description - defines DELETE request fail action for an event
 *
 * @export deleteEventFail
 *
 * @param {object} error
 *
 * @returns {object} dispatched action type and error object
 */
export const deleteEventFail = error => ({
  type: DELETE_ONE_EVENT_FAIL,
  error
});

/**
 * description - handles DELETE request for one event
 *
 * @export deleteEvent
 *
 * @param {object} eventId
 *
 * @returns {object} dispatched action
 */
export const deleteEvent = eventId => (dispatch) => {
  console.log('event id in actions', eventId);
  const token = localStorage.getItem('x-access-token');
  axios.delete(`/api/v1/events/${eventId}`, {
    headers: { Authorization: token }
  })
    .then((response) => {
      dispatch(deleteEventSuccess(response.data));
      console.log('response', response.data);
    })
    .catch((errors) => {
      dispatch(deleteEventFail(errors));
      throw (errors.response.data.message);
    });
};

/**
 * description - defines load one events success action
 *
 * @export loadEventsByCenterIdSuccess
 *
 * @param {object} eventsRetrieved
 *
 * @returns {object} dispatched action type and retrieved event object
 */
export const loadEventsByCenterIdSuccess = eventsRetrieved => ({
  type: LOAD_EVENTS_BY_CENTER_ID_SUCCESS,
  eventsRetrieved
});

/**
 * description - defines load one event failure action
 *
 * @export loadOneEventFail
 *
 * @param {object} error
 *
 * @returns {object} dispatched action type and error object
 */
export const loadEventsByCenterIdFail = error => ({
  type: LOAD_EVENTS_BY_CENTER_ID_FAIL,
  error
});


/**
 * description - handles GET request for events with the same center Id
 *
 * @export loadEventsByCenterId
 *
 * @param {object} centerId
 * @param {number} page

 *
 * @returns {object} dispatched action
 */
export const loadEventsByCenterId = (centerId, page) => (dispatch) => {
  console.log('centaID', centerId);
  const token = localStorage.getItem('x-access-token');
  axios.get(`/events/center/${centerId}?page=${page || 1}`, {
    headers: { Authorization: token }
  })
    .then((response) => {
      dispatch(loadEventsByCenterIdSuccess(response.data));
    })
    .catch((errors) => {
      dispatch(loadEventsByCenterIdFail(errors.response.data.message));
      throw (errors.response.data.message);
    });
};

