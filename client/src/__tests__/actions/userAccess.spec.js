import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  ADD_USER_SUCCESS,
  LOGIN_USER_SUCCESS
} from '../../actions/actionTypes';
import {
  addNewUser,
  loginUser,
} from '../../actions/userAccessActions';
import mockLocalStorage from '../__mocks__/mockLocalStoage';
import mockData from '../__mocks__/mockData';

const mockStore = configureStore([thunk]);
const {
  signupData,
  signupResponse,
  signinData,
  signinResponse,
} = mockData.users;
const url = '/api/v1/';

window.localStorage = mockLocalStorage;

describe('Authentication Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('sign up action', (done) => {
    moxios.stubRequest(`${url}users`, {
      status: 200,
      response: signupResponse
    });

    const expectedAction = [
      {
        type: ADD_USER_SUCCESS,
        userData: signupResponse
      }
    ];

    const store = mockStore({});

    return store.dispatch(addNewUser(signupData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });

  it('sign in actions', (done) => {
    moxios.stubRequest(`${url}users/login`, {
      status: 200,
      response: signinResponse
    });

    const expectedAction = [
      {
        type: LOGIN_USER_SUCCESS,
        loginData: signinResponse
      }
    ];

    const store = mockStore({});

    return store.dispatch(loginUser(signinData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });
});
