import React from 'react';
import { shallow } from 'enzyme';

import App from '../../components/App';

describe('App Component', () => {
  it('should render the app component correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
