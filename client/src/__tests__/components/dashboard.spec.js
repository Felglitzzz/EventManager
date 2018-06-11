import React from 'react';
import { shallow } from 'enzyme';
import $ from 'jquery';

import { UserDashboard } from '../../components/Dashboard/UserDashboard';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

window.localStorage = mockLocalStorage;

global.jQuery = $;
global.$ = global.jQuery;

jest.mock('react-router-dom');

const props = {
  logOutUser: () => Promise.resolve(),
  isAuthenticated: true,
  history: {
    push: jest.fn(),
    replace: jest.fn()
  },
};

describe('Dashboard Page', () => {
  it('should render dashboard page successfully', () => {
    const wrapper = shallow(<UserDashboard {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  it('should test handlelogout method', () => {
    const handleLogoutSpy = jest.spyOn(UserDashboard.prototype, 'handleLogout');
    const wrapper = shallow(<UserDashboard {...props} />);
    const instance = wrapper.instance();
    instance.handleLogout({
      preventDefault: jest.fn()
    });
    expect(handleLogoutSpy).toHaveBeenCalled();
  });

  it('should test componentWillMount method', () => {
    const componentWillMountSpy = jest.spyOn(UserDashboard.prototype, 'componentWillMount');
    const wrapper = shallow(<UserDashboard {...props} />);
    const instance = wrapper.instance();
    instance.componentWillMount({
      preventDefault: jest.fn()
    });
    expect(componentWillMountSpy).toHaveBeenCalled();
  });
});

