import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  ADD_EVENT_SUCCESS,
  LOAD_ALL_EVENTS_SUCCESS,
  LOAD_EVENTS_BY_CENTER_ID_SUCCESS,
  LOAD_ONE_EVENT_SUCCESS,
  UPDATE_EVENT_SUCCESS,
  DELETE_ONE_EVENT_SUCCESS,
  CANCEL_EVENT_SUCCESS,
  APPROVE_EVENT_SUCCESS,
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
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import mockData from '../__mocks__/mockData';

const mockStore = configureStore([thunk]);
const {
  createEventResponse,
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

describe('Event Actions', () => {
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
        eventData: createEventResponse
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
