import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/Footer/Footer';

describe('Footer Page', () => {
  it('should render the footer page correctly', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});
