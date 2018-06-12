import centerReducer from '../../reducers/centerReducer';
import {
  LOAD_ALL_CENTERS_SUCCESS,
  LOAD_ALL_CENTERS_FAIL,
  ADD_CENTER_FAIL,
  ADD_CENTER_SUCCESS,
  UPDATE_CENTER_SUCCESS,
  UPDATE_CENTER_FAIL,
  LOAD_ONE_CENTER_FAIL,
  LOAD_ONE_CENTER_SUCCESS,
  LOAD_UNPAGINATED_CENTERS_FAIL,
  LOAD_UNPAGINATED_CENTERS_SUCCESS
} from '../../actions/actionTypes';

import mockData from '../__mocks__/mockData';

const initialState = {
  centers: {}
};

describe('Center reducer', () => {
  describe('DEFAULT', () => {
    it('Should return the initial state', () => {
      const action = {};
      const newState = centerReducer(undefined, action);
      expect(newState).toEqual(initialState.centers);
    });
  });

  describe('ADD_CENTERS', () => {
    it('should set center\'s details to store', () => {
      const prevState = initialState.centers;

      const action = {
        type: ADD_CENTER_SUCCESS,
        centerData: mockData.centers.createCenterResponse
      };

      const expected = {
        centers: mockData.centers.createCenterResponse
      };

      const newState = centerReducer(prevState, action);
      expect(newState).toEqual(expected);
    });

    it('should set error to store', () => {
      const prevState = initialState.centers;

      const action = {
        type: ADD_CENTER_FAIL,
        error: mockData.centers.createCenterErrorResponse
      };

      const expected = {
        error: mockData.centers.createCenterErrorResponse
      };

      const newState = centerReducer(prevState, action);
      expect(newState).toEqual(expected);
    });
  });

  describe('LOAD_ALL_CENTERS', () => {
    it('should set center\'s details to store', () => {
      const prevState = initialState.centers;

      const action = {
        type: LOAD_ALL_CENTERS_SUCCESS,
        centers: mockData.centers.loadCenterResponse
      };

      const expected = {
        centers: mockData.centers.loadCenterResponse
      };

      const newState = centerReducer(prevState, action);
      expect(newState).toEqual(expected);
    });

    it('should set error to store', () => {
      const prevState = initialState.centers;

      const action = {
        type: LOAD_ALL_CENTERS_FAIL,
        error: mockData.centers.centerNotFound
      };

      const expected = {
        error: mockData.centers.centerNotFound
      };

      const newState = centerReducer(prevState, action);
      expect(newState).toEqual(expected);
    });
  });

  describe('UPDATE_CENTER', () => {
    it('should set updated center\'s details to store', () => {
      const prevState = initialState.centers;

      const action = {
        type: UPDATE_CENTER_SUCCESS,
        center: {
          modifiedCenter: mockData.centers.updateCenterData
        }
      };

      const expected = {
        centers: {
          center: mockData.centers.updateCenterData
        }
      };

      const newState = centerReducer(prevState, action);
      expect(newState).toEqual(expected);
    });

    it('should set error to store', () => {
      const prevState = initialState.centers;

      const action = {
        type: UPDATE_CENTER_FAIL,
        error: mockData.centers.centerNotFound
      };

      const expected = {
        error: mockData.centers.centerNotFound
      };

      const newState = centerReducer(prevState, action);
      expect(newState).toEqual(expected);
    });
  });

  describe('LOAD_ONE_CENTER', () => {
    it('should set center\'s details to store', () => {
      const prevState = initialState.centers;

      const action = {
        type: LOAD_ONE_CENTER_SUCCESS,
        centerReturned: mockData.centers.loadCenterResponse
      };

      const expected = {
        center: mockData.centers.loadCenterResponse
      };

      const newState = centerReducer(prevState, action);
      expect(newState).toEqual(expected);
    });

    it('should set error to store', () => {
      const prevState = initialState.centers;

      const action = {
        type: LOAD_ONE_CENTER_FAIL,
        error: mockData.centers.centerNotFound
      };

      const expected = {
        error: mockData.centers.centerNotFound
      };

      const newState = centerReducer(prevState, action);
      expect(newState).toEqual(expected);
    });
  });

  describe('LOAD_UNPAGINATED_CENTERS', () => {
    it('should set center\'s details to store', () => {
      const prevState = initialState.centers;

      const action = {
        type: LOAD_UNPAGINATED_CENTERS_SUCCESS,
        unPaginatedCenters: mockData.centers.loadCenterResponse
      };

      const expected = {
        unPaginatedCenters: mockData.centers.loadCenterResponse
      };

      const newState = centerReducer(prevState, action);
      expect(newState).toEqual(expected);
    });

    it('should set error to store', () => {
      const prevState = initialState.centers;

      const action = {
        type: LOAD_UNPAGINATED_CENTERS_FAIL,
        error: mockData.centers.centerNotFound
      };

      const expected = {
        error: mockData.centers.centerNotFound
      };

      const newState = centerReducer(prevState, action);
      expect(newState).toEqual(expected);
    });
  });
});
