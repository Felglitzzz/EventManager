import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../components/NotFound/NotFound';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

window.localStorage = mockLocalStorage;

jest.mock('react-router-dom');

describe('Not Found Page', () => {
  it('should render not found page', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toHaveLength(1);
  });

  it('should render not found page when authenticated is false', () => {
    localStorage.removeItem('x-access-token');
    const wrapper = shallow(<NotFound />);
    wrapper.setState({
      isAuthenticated: false
    });
    expect(wrapper).toHaveLength(1);
  });
});
