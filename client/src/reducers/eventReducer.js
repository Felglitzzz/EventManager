import * as actionTypes from '../actions/actionTypes';

const {
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,
  LOAD_ALL_EVENTS_SUCCESS,
  LOAD_ALL_EVENTS_FAIL,
  LOAD_ONE_EVENT_SUCCESS,
  LOAD_ONE_EVENT_FAIL,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  SAVE_IMAGE_SUCCESS,
  SAVE_IMAGE_FAIL,
  DELETE_ONE_EVENT_FAIL,
  DELETE_ONE_EVENT_SUCCESS,
  LOAD_EVENTS_BY_CENTER_ID_FAIL,
  LOAD_EVENTS_BY_CENTER_ID_SUCCESS
} = actionTypes;

/**
 * @export eventReducer
 *
 * @description defines eventReducer
 *
 * @param {object} state
 * @param {object} action
 *
 * @returns {object} action type and payload
 */

const eventReducer = (state = {}, action) => {
  const { type } = action;

  switch (type) {
  case ADD_EVENT_SUCCESS:
    return {
      ...state,
      eventData: action.eventData
    };
  case ADD_EVENT_FAIL:
    return {
      ...state,
      error: action.error
    };
  case LOAD_ALL_EVENTS_SUCCESS:
    return {
      ...state,
      loadedEvents: action.loadedEvents
    };
  case LOAD_ALL_EVENTS_FAIL:
    return {
      ...state,
      error: action.error
    };
  case LOAD_ONE_EVENT_SUCCESS:
    return {
      ...state,
      eventReturned: action.eventReturned
    };
  case LOAD_ONE_EVENT_FAIL:
    return {
      ...state,
      error: action.error
    };
  case UPDATE_EVENT_SUCCESS: {
    const eventArray = [];
    if (state.events === undefined) {
      return state;
    }
    state.events.loadedEvents.event.map((event) => {
      if (event.id === action.updateEventData.modifiedEvent.id) {
        eventArray.push(action.updateEventData.modifiedEvent);
      } else {
        eventArray.push(event);
      }
    });
    return {
      ...state, updateEventData: eventArray
    };
  }
  case UPDATE_EVENT_FAIL:
    return {
      ...state,
      error: action.error
    };
  case SAVE_IMAGE_SUCCESS:
    return {
      ...state,
      image: action.saveImage
    };
  case SAVE_IMAGE_FAIL:
    return {
      ...state,
      error: action.error
    };
  case DELETE_ONE_EVENT_SUCCESS: {
    const remainingEvents = state.loadedEvents.event.filter(event =>
      event.id !== parseInt(action.deletedStatus.eventId, 10));
    return {
      ...state,
      loadedEvents: {
        event: remainingEvents
      }
    };
  }
  case DELETE_ONE_EVENT_FAIL:
    return {
      ...state,
      error: action.error
    };
  case LOAD_EVENTS_BY_CENTER_ID_SUCCESS:
    return {
      ...state,
      eventsRetrieved: action.eventsRetrieved
    };
  case LOAD_EVENTS_BY_CENTER_ID_FAIL:
    return {
      ...state,
      error: action.error
    };
  default:
    return state;
  }
};

export default eventReducer;
