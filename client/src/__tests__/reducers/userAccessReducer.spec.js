import userAccessReducer from '../../reducers/userAccessReducer';
import {
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from '../../actions/actionTypes';
import mockData from '../__mocks__/mockData';

const initialState = {
  userAccess: {}
};

describe('UserAccess reducer', () => {
  describe('DEFAULT', () => {
    it('Should return the initial state', () => {
      const action = {};
      const newState = userAccessReducer(undefined, action);
      expect(newState).toEqual(initialState.userAccess);
    });
  });

  describe('ADD_USER', () => {
    it('should set user\'s details to store', () => {
      const prevState = initialState.userAccess;

      const action = {
        type: ADD_USER_SUCCESS,
        userData: mockData.signupResponse
      };

      const expected = {
        isAuthenticated: true,
        userData: mockData.signupResponse
      };

      const newState = userAccessReducer(prevState, action);
      expect(newState).toEqual(expected);
    });

    it('should set error to store', () => {
      const prevState = initialState.userAccess;

      const action = {
        type: ADD_USER_FAIL,
        userData: mockData.signupErrorResponse
      };

      const expected = {
        isAuthenticated: false,
        error: mockData.signupErrorResponse
      };

      const newState = userAccessReducer(prevState, action);
      expect(newState).toEqual(expected);
    });
  });

  describe('LOGIN_USER', () => {
    it('should set user\'s details to store', () => {
      const prevState = initialState.userAccess;

      const action = {
        type: LOGIN_USER_SUCCESS,
        loginData: mockData.signinResponse
      };

      const expected = {
        isAuthenticated: true,
        loginData: mockData.signinResponse
      };

      const newState = userAccessReducer(prevState, action);
      expect(newState).toEqual(expected);
    });

    it('should set error to store', () => {
      const prevState = initialState.userAccess;

      const action = {
        type: LOGIN_USER_FAIL,
        error: mockData.signinErrorResponse
      };

      const expected = {
        isAuthenticated: false,
        error: mockData.signinErrorResponse
      };

      const newState = userAccessReducer(prevState, action);
      expect(newState).toEqual(expected);
    });
  });
});
