import React from 'react';
import { shallow, mount } from 'enzyme';
import jwt from 'jsonwebtoken';
import configureStore from 'redux-mock-store';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

import ConnectedSignUpPageModal, { SignUpPageModal } from '../../components/UserAccess/SignUpPageModal';

window.localStorage = mockLocalStorage;

const props = {
  addNewUser: () => Promise.resolve(),
};

const componentState = {
  userData: {
    surname: 'akinkuotu',
    firstname: 'muyiwa',
    email: 'muyiwa@gmail.com',
    username: 'nazzy',
    password: 'password',
    passwordConfirm: 'password'
  },
  isAuthenticated: false,
  isLoading: false,
  errors: {}
};
const updatedComponentStateUponSubmit = {
  userData: {
    surname: 'akinkuotu',
    firstname: 'muyiwa',
    email: 'muyiwa@gmail.com',
    username: 'nazzy',
    password: 'password',
    passwordConfirm: 'password'
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

  containerWrapper = shallow(<ConnectedSignUpPageModal
    store={store}
  />);
});

describe('Sign Up Page', () => {
  it('sets error message when trying to submit empty fields', () => {
    const wrapper = mount(<SignUpPageModal {...props} />);
    const signupform = wrapper.find('form');
    signupform.simulate('submit');
    expect(wrapper.state().errors.surname).toBe('Surname is Required');
    expect(wrapper.state().errors.firstname).toBe('Firstname is Required');
    expect(wrapper.state().errors.username).toBe('Username is Required');
    expect(wrapper.state().errors.email).toBe('Email is Required');
    expect(wrapper.state().errors.password).toBe('Password is Required');
  });

  it('should handle input change', () => {
    const value = 'muyiwa';
    const wrapper = mount(<SignUpPageModal {...props} />);
    wrapper.find('#surname').simulate('change', {
      target: { name: 'surname', value }
    });
    expect(wrapper.state().userData.surname).toBe(value);
  });

  it('should clear input fields after input error is thrown', () => {
    const value = '';
    const wrapper = mount(<SignUpPageModal {...props} />);
    wrapper.find('#surname').simulate('focus', {
      target: { name: 'surname', value }
    });
    expect(wrapper.state().userData.surname).toBe(value);
  });

  it('should populate the form field and update the state', () => {
    const userData = {
      id: 1,
      username: 'dammy',
      isAdmin: true
    };
    const token = jwt.sign(userData, 'secret');
    localStorage.setItem('x-access-token', token);
    const wrapper = mount(<SignUpPageModal {...props} />);
    wrapper.instance().setState({
      errors: {},
      isLoading: true,
      isAuthenticated: false,
      userData: componentState.userData
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
