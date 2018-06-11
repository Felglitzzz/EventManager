import React from 'react';
import { shallow, mount } from 'enzyme';

import { CreateCenterPage, mapDispatchToProps } from '../../components/Centers/CreateCenterPage';

const props = {
  createCenter: () => Promise.resolve(),
  uploadToCloudinary: () => Promise.resolve(),
  imageUrl: {}
};

global.FileReader = () => ({
  readAsDataURL: () => {}
});

const componentState = {
  centerData: {
    name: 'Dammy Center',
    location: 'Maryland',
    capacity: 500,
    price: 1000,
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    type: 'Marquee',
    description: 'Dammy Center is in maryland',
    facilities: ['bar', 'casino']
  },
  chosenImage: '',
  isAuthenticated: false,
  isLoading: false,
  errors: {},
  chosenImageUrl: '',
  options: [],
};

const updatedComponentStateUponSubmit = {
  centerData: {
    name: 'Dammy Center',
    location: 'Maryland',
    capacity: 500,
    price: 1000,
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    type: 'Marquee',
    description: 'Dammy Center is in maryland',
    facilities: ['bar', 'casino']
  },
  chosenImage: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
  isAuthenticated: false,
  isLoading: true,
  uploadHeight: '',
  uploadWidth: '',
  errors: {},
  chosenImageUrl: '',
  options: [],
};

describe('Create Center Page', () => {
  it('sets error message when trying to submit empty fields', () => {
    const wrapper = mount(<CreateCenterPage {...props} />);
    const centerform = wrapper.find('form');
    centerform.simulate('submit');
    expect(wrapper.state().errors.name).toBe('Name is Required');
  });

  it('should handle input change', () => {
    const value = 'Dammy Center';
    const wrapper = mount(<CreateCenterPage {...props} />);
    wrapper.find('#name').simulate('change', {
      target: { name: 'name', value }
    });
    expect(wrapper.state().centerData.name).toBe(value);
  });

  it('should handle image change', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'image',
        files: [{ data: 'image1', type: 'image/jpg' }]
      }
    };

    const imageOnChangeSpy = jest.spyOn(
      CreateCenterPage.prototype,
      'imageOnChange'
    );
    const wrapper = shallow(<CreateCenterPage {...props} />);
    const instance = wrapper.instance();
    instance.imageOnChange(event);
    expect(imageOnChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should handle change event for select input that is checked', () => {
    const event = {
      persist: jest.fn(),
      preventDefault: jest.fn(),
      target: {
        name: 'image',
        checked: true,
        value: 'bar',
      }
    };

    const selectOnChangeSpy = jest.spyOn(
      CreateCenterPage.prototype,
      'selectOnChange'
    );
    const wrapper = shallow(<CreateCenterPage {...props} />);
    const instance = wrapper.instance();
    instance.selectOnChange(event);
    expect(selectOnChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should handle change event for select input that is not checked', () => {
    const event = {
      persist: jest.fn(),
      preventDefault: jest.fn(),
      target: {
        name: 'image',
        checked: false,
        value: 'casino',
      }
    };

    const selectOnChangeSpy = jest.spyOn(
      CreateCenterPage.prototype,
      'selectOnChange'
    );
    const wrapper = shallow(<CreateCenterPage {...props} />);
    wrapper.setState({
      centerData: {
        facilities: ['bar', 'casino']
      }
    });
    const instance = wrapper.instance();
    instance.selectOnChange(event);
    expect(selectOnChangeSpy).toHaveBeenCalledTimes(2);
  });

  it('should clear input fields after input error is thrown', () => {
    const value = '';
    const wrapper = mount(<CreateCenterPage {...props} />);
    wrapper.find('#name').simulate('focus', {
      target: { name: 'name', value }
    });
    expect(wrapper.state().centerData.name).toBe(value);
  });

  it('should have the componentWillReceiveProps method', () => {
    const nextProps = props;
    const componentWillReceivePropsSpy = jest.spyOn(CreateCenterPage.prototype, 'componentWillReceiveProps');
    shallow(<CreateCenterPage {...props} />)
      .instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should populate the form field and update the state', () => {
    const wrapper = mount(<CreateCenterPage {...props} />);
    wrapper.instance().setState({
      errors: {},
      isLoading: true,
      isAuthenticated: false,
      centerData: componentState.centerData,
      chosenImage: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg'
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: jest.fn()
    });
    expect(wrapper.instance().state).toEqual(updatedComponentStateUponSubmit);
  });

  it('ensures that mapDispatchToProps dispatches the specified actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).createCenter).toBeTruthy();
    expect(mapDispatchToProps(dispatch).uploadToCloudinary).toBeTruthy();
  });
});
