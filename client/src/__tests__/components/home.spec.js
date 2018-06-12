import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../components/Home/Home';
import About from '../../components/About/About';

describe('Home Page', () => {
  it('should render the home page correctly', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('About Page', () => {
  it('should render the home page correctly', () => {
    const wrapper = shallow(<About />);
    expect(wrapper).toMatchSnapshot();
  });
});
