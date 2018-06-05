import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  ADD_EVENT_SUCCESS,
  LOAD_EVENT_BY_CENTER_ID,
  LOAD_ALL_EVENTS_SUCCESS,
  LOAD_ALL_EVENTS_FAIL,
  LOAD_EVENTS_BY_CENTER_ID_SUCCESS,
  LOAD_EVENTS_BY_CENTER_ID_FAIL,
  LOAD_ONE_EVENT_SUCCESS,
  LOAD_ONE_EVENT_FAIL,
  UPDATE_EVENT_SUCCESS,
  DELETE_ONE_EVENT_SUCCESS,
  DELETE_ONE_EVENT_FAIL,
  CANCEL_EVENT_SUCCESS,
  APPROVE_EVENT_SUCCESS,
  ADD_EVENT_FAIL
} from '../../actions/actionTypes';
import {
  addNewEvent,
  loadOneEvent,
  loadAllEvent,
  updateEvent,
  deleteEvent,
  loadEventsByCenterId,
  cancelEvent,
  approveEvent
} from '../../actions/eventActions';
import mockLocalStorage from '../__mocks__/mockLocalStoage';
import mockData from '../__mocks__/mockData';

const mockStore = configureStore([thunk]);
const {
  createEventResponse,
  createEventErrorResponse,
  createEventData,
  updateEventResponse,
  updateEventData,
  eventsByCenterIdResponse,
  loadOneEventResponse,
  allEventsResponse,
  deleteEventResponse,
  cancelEventResponse,
  approveEventResponse
} = mockData.events;
const url = '/api/v1/';

window.localStorage = mockLocalStorage;

describe('Authentication Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('create event action', (done) => {
    moxios.stubRequest(`${url}events`, {
      status: 201,
      response: createEventResponse,
    });

    const expectedAction = [
      {
        type: ADD_EVENT_SUCCESS,
        events: createEventResponse
      }
    ];

    const store = mockStore({});

    return store.dispatch(addNewEvent(createEventData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });

  it('failed create event action', (done) => {
    moxios.stubRequest(`${url}events`, {
      status: 400,
      response: createEventErrorResponse,
    });

    const expectedAction = [
      {
        type: ADD_EVENT_FAIL,
        error: createEventErrorResponse
      }
    ];

    const store = mockStore({});

    return store.dispatch(addNewEvent(createEventData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });

  it('update event action', (done) => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: updateEventResponse,
      });
    });

    const expectedAction = [
      {
        type: UPDATE_EVENT_SUCCESS,
        event: updateEventResponse
      }
    ];

    const store = mockStore({});

    return store.dispatch(updateEvent(updateEventData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });

  it('get events slated for a center action', (done) => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: eventsByCenterIdResponse,
      });
    });

    const expectedAction = [
      {
        type: LOAD_EVENTS_BY_CENTER_ID_SUCCESS,
        eventsRetrieved: eventsByCenterIdResponse
      }
    ];

    const store = mockStore({});

    return store.dispatch(loadEventsByCenterId(99))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });

  it('load one event action', (done) => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: loadOneEventResponse
      });
    });

    const expectedAction = [
      {
        type: LOAD_ONE_EVENT_SUCCESS,
        eventReturned: loadOneEventResponse
      }
    ];

    const store = mockStore({});

    return store.dispatch(loadOneEvent(29))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });

  it('load all events action', (done) => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: allEventsResponse
      });
    });

    const expectedAction = [
      {
        type: LOAD_ALL_EVENTS_SUCCESS,
        events: allEventsResponse
      }
    ];

    const store = mockStore({});

    return store.dispatch(loadAllEvent())
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });

  it('delete event action', (done) => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: deleteEventResponse
      });
    });

    const expectedAction = [
      {
        type: DELETE_ONE_EVENT_SUCCESS,
        deletedStatus: deleteEventResponse
      }
    ];

    const store = mockStore({});

    return store.dispatch(deleteEvent())
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });

  it('cancel event action', (done) => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: cancelEventResponse
      });
    });

    const expectedAction = [
      {
        type: CANCEL_EVENT_SUCCESS,
        cancelledData: cancelEventResponse
      }
    ];

    const store = mockStore({});

    return store.dispatch(cancelEvent(18))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });

  it('approve event action', (done) => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: approveEventResponse
      });
    });

    const expectedAction = [
      {
        type: APPROVE_EVENT_SUCCESS,
        approvedData: approveEventResponse
      }
    ];

    const store = mockStore({});

    return store.dispatch(approveEvent(18))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });
});
