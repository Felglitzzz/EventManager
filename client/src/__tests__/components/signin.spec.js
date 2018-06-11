import React from 'react';
import { shallow, mount } from 'enzyme';
import jwt from 'jsonwebtoken';
import configureStore from 'redux-mock-store';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

import ConnectedSignInPageModal, { SignInPageModal } from '../../components/UserAccess/SignInPageModal';

window.localStorage = mockLocalStorage;

const props = {
  loginUser: () => Promise.resolve(),
};

const componentState = {
  loginData: {
    username: 'nazzy',
    password: 'password',
  },
  isAuthenticated: false,
  isLoading: false,
  errors: {}
};
const updatedComponentStateUponSubmit = {
  loginData: {
    username: 'nazzy',
    password: 'password',
  },
  isAuthenticated: false,
  isLoading: true,
  errors: {}
};

let store, containerWrapper;
const mockStore = configureStore();

beforeEach(() => {
  const initialState = {
    UserAccess: {
      isAuthenticated: false
    }
  };

  store = mockStore(initialState);

  containerWrapper = shallow(<ConnectedSignInPageModal
    store={store}
  />);
});

describe('Sign In Page', () => {
  it('sets error message when trying to submit empty fields', () => {
    const wrapper = mount(<SignInPageModal {...props} />);
    const signinform = wrapper.find('form');
    signinform.simulate('submit');
    expect(wrapper.state().errors.username).toBe('Username is Required');
    expect(wrapper.state().errors.password).toBe('Password is Required');
  });

  it('should handle input change', () => {
    const value = 'muyiwa';
    const wrapper = mount(<SignInPageModal {...props} />);
    wrapper.find('#username').simulate('change', {
      target: { name: 'username', value }
    });
    expect(wrapper.state().loginData.username).toBe(value);
  });

  it('should clear input fields after input error is thrown', () => {
    const value = '';
    const wrapper = mount(<SignInPageModal {...props} />);
    wrapper.find('#username').simulate('focus', {
      target: { name: 'username', value }
    });
    expect(wrapper.state().loginData.username).toBe(value);
  });

  it('should populate the form field and update the state', () => {
    const userData = {
      id: 1,
      username: 'dammy',
      isAdmin: true
    };
    const token = jwt.sign(userData, 'secret');
    localStorage.setItem('x-access-token', token);
    const wrapper = mount(<SignInPageModal {...props} />);
    wrapper.instance().setState({
      errors: {},
      isLoading: true,
      isAuthenticated: false,
      loginData: componentState.loginData
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: jest.fn()
    });
    expect(wrapper.instance().state).toEqual(updatedComponentStateUponSubmit);
  });
});

describe('Connected Sign Up Page', () => {
  it('should show previously rolled value', () => {
    expect(containerWrapper.props().store.getState().UserAccess.isAuthenticated).toBe(false);
  });
});
