import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';


const filterCancelledEvents = (eventId, arrayTofilterFrom) => {
  arrayTofilterFrom.map((event) => {
    if (+event.id === +eventId) {
      event.status = 'cancelled';
    }
  });
  return arrayTofilterFrom;
};

const filterApprovedEvents = (eventId, arrayTofilterFrom) => {
  arrayTofilterFrom.map((event) => {
    if (+event.id === +eventId) {
      event.status = 'accepted';
    }
  });
  return arrayTofilterFrom;
};

const {
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,
  LOAD_ALL_EVENTS_SUCCESS,
  LOAD_ALL_EVENTS_FAIL,
  LOAD_ONE_EVENT_SUCCESS,
  LOAD_ONE_EVENT_FAIL,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  DELETE_ONE_EVENT_FAIL,
  DELETE_ONE_EVENT_SUCCESS,
  LOAD_EVENTS_BY_CENTER_ID_FAIL,
  LOAD_EVENTS_BY_CENTER_ID_SUCCESS,
  CANCEL_EVENT_FAIL,
  CANCEL_EVENT_SUCCESS,
  APPROVE_EVENT_FAIL,
  APPROVE_EVENT_SUCCESS
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

const eventReducer = (state = initialState.events, action) => {
  const { type } = action;

  switch (type) {
  case ADD_EVENT_SUCCESS:
    return {
      ...state,
      events: action.eventData
    };
  case ADD_EVENT_FAIL:
    return {
      ...state,
      error: action.error
    };
  case LOAD_ALL_EVENTS_SUCCESS:
    return {
      ...state,
      events: action.events
    };
  case LOAD_ALL_EVENTS_FAIL:
    return {
      ...state,
      error: action.error
    };
  case LOAD_ONE_EVENT_SUCCESS:
    return {
      ...state,
      event: action.eventReturned
    };
  case LOAD_ONE_EVENT_FAIL:
    return {
      ...state,
      error: action.error
    };
  case UPDATE_EVENT_SUCCESS:
    return {
      ...state,
      events: action.event
    };
  case UPDATE_EVENT_FAIL:
    return {
      ...state,
      error: action.error
    };
  case DELETE_ONE_EVENT_SUCCESS: {
    const remainingEvents = state.events.events.rows.filter(event =>
      event.id !== parseInt(action.deletedStatus.eventId, 10));
    return {
      ...state,
      events: {
        events: {
          ...state.events.events,
          rows: remainingEvents,
        },
        meta: {
          pagination: state.events.meta.pagination
        }
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
  case CANCEL_EVENT_FAIL:
    return {
      ...state,
      error: action.error
    };
  case CANCEL_EVENT_SUCCESS: {
    const { eventId } = action.cancelledData;
    return {
      ...state,
      eventsRetrieved: {
        events: {
          ...state.eventsRetrieved.events,
          rows: filterCancelledEvents(eventId, state.eventsRetrieved.events.rows)
        },
        meta: {
          pagination: state.eventsRetrieved.meta.pagination
        }
      }
    };
  }
  case APPROVE_EVENT_FAIL:
    return {
      ...state,
      error: action.error
    };
  case APPROVE_EVENT_SUCCESS: {
    const { eventId } = action.approvedData;
    return {
      ...state,
      eventsRetrieved: {
        events: {
          ...state.eventsRetrieved.events,
          rows: filterApprovedEvents(eventId, state.eventsRetrieved.events.rows)
        },
        meta: {
          pagination: state.eventsRetrieved.meta.pagination
        }
      }
    };
  }
  default:
    return state;
  }
};

export default eventReducer;
