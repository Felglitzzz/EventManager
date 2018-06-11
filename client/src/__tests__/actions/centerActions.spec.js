import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  ADD_CENTER_SUCCESS,
  LOAD_ALL_CENTERS_SUCCESS,
  LOAD_ONE_CENTER_SUCCESS,
  UPDATE_CENTER_SUCCESS,
  LOAD_UNPAGINATED_CENTERS_SUCCESS
} from '../../actions/actionTypes';
import {
  loadCenters,
  createCenter,
  updateCenter,
  loadOneCenter,
  loadUnpaginatedCenters
} from '../../actions/centerActions';
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import mockData from '../__mocks__/mockData';

const mockStore = configureStore([thunk]);
const {
  createCenterResponse,
  createCenterData,
  updateCenterResponse,
  updateCenterData,
  loadCenterResponse,
} = mockData.centers;
const url = '/api/v1/';

window.localStorage = mockLocalStorage;

describe('Center Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('create center action', (done) => {
    moxios.stubRequest(`${url}centers`, {
      status: 201,
      response: createCenterResponse,
    });

    const expectedAction = [
      {
        type: ADD_CENTER_SUCCESS,
        centerData: createCenterResponse
      }
    ];

    const store = mockStore({});

    return store.dispatch(createCenter(createCenterData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });

  it('update center action', (done) => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: updateCenterResponse
      });
    });

    const expectedAction = [
      {
        type: UPDATE_CENTER_SUCCESS,
        center: updateCenterResponse
      }
    ];

    const store = mockStore({});

    return store.dispatch(updateCenter(updateCenterData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });

  it('load one center action', (done) => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: loadCenterResponse
      });
    });

    const expectedAction = [
      {
        type: LOAD_ONE_CENTER_SUCCESS,
        centerReturned: loadCenterResponse
      }
    ];

    const store = mockStore({});

    return store.dispatch(loadOneCenter(29))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });

  it('load all centers action', (done) => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: loadCenterResponse
      });
    });

    const expectedAction = [
      {
        type: LOAD_ALL_CENTERS_SUCCESS,
        centers: loadCenterResponse
      }
    ];

    const store = mockStore({});

    return store.dispatch(loadCenters())
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });

  it('load unpaginated centers action', (done) => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: loadCenterResponse
      });
    });

    const expectedAction = [
      {
        type: LOAD_UNPAGINATED_CENTERS_SUCCESS,
        unPaginatedCenters: loadCenterResponse
      }
    ];

    const store = mockStore({});

    return store.dispatch(loadUnpaginatedCenters())
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });
});
