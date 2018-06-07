import React from 'react';

import { shallow } from 'enzyme';
import { SignUpForm } from '../../components/UserAccess/SignUpForm';

describe('<SignupForm component />', () => {
  it('Should render the sign-up form correctly', () => {
    const wrapper = shallow(<SignUpForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
