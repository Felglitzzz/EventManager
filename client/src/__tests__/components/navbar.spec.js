import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../../components/Navbar/Navbar';
import { UserNavbar, mapDispatchToProps } from '../../components/Navbar/UserNavbar';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

window.localStorage = mockLocalStorage;

describe('Navbar Page', () => {
  it('should render the navbar page correctly', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('UserNavbar component', () => {
  it('should render the usernavbar component', () => {
    const wrapper = shallow(<UserNavbar
      logOutUser = {() => { Promise.resolve(); }}
    />);
    expect(wrapper.length).toEqual(1);
  });

  it('should test mapDispatchToProps method', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).logOutUser).toBeTruthy();
  });
});
