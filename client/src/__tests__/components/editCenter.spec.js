import React from 'react';
import { shallow, mount } from 'enzyme';

import { EditCenterPage, mapDispatchToProps } from '../../components/Centers/EditCenterPage';

const props = {
  loadOneCenter: () => Promise.resolve(),
  updateCenter: () => Promise.resolve(),
  uploadToCloudinary: () => Promise.resolve(),
  imageUrl: {},
  center: {},
  centerId: 9,
  match: {
    params: {
      centerId: 9
    }
  }
};

global.FileReader = () => ({
  readAsDataURL: () => {}
});

const updatedComponentStateUponSubmit = {
  updateCenterData: {
    name: 'Hephzibah Hall',
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
  errors: {},
  centerLoading: false,
  centerError: '',
  chosenImageUrl: '',
};

describe('Edit Center Page', () => {
  it('should handle input change', () => {
    const value = 'Dammy Center';
    const wrapper = mount(<EditCenterPage {...props} />);
    wrapper.setState({
      centerLoading: false,
      updateCenterData: {
        name: 'Dammy Center',
        location: 'Maryland',
        capacity: 500,
        price: 1000,
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
        type: 'Marquee',
        description: 'Dammy Center is in maryland',
        facilities: ['bar', 'casino']
      }
    });
    wrapper.find('#name').simulate('change', {
      target: { name: 'name', value }
    });
    expect(wrapper.state().updateCenterData.name).toBe(value);
  });

  it('sets error message when trying to submit empty fields', () => {
    const wrapper = mount(<EditCenterPage {...props} />);
    wrapper.setState({
      centerLoading: false,
      updateCenterData: {
        name: 'Dammy Center',
        location: 'Maryland',
        capacity: 500,
        price: 1000,
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
        type: 'Marquee',
        description: 'Dammy Center is in maryland',
        facilities: ['bar', 'casino']
      }
    });
    const value = '';
    wrapper.find('#name').simulate('change', {
      target: { name: 'name', value }
    });
    wrapper.find('#location').simulate('change', {
      target: { name: 'location', value }
    });
    wrapper.find('#price').simulate('change', {
      target: { name: 'price', value }
    });
    wrapper.find('#capacity').simulate('change', {
      target: { name: 'capacity', value }
    });
    const instance = wrapper.instance();
    instance.onSubmit({
      preventDefault: jest.fn(),
      persist: jest.fn()
    });
    expect(instance.state.errors.name).toBe('Name is Required');
    expect(instance.state.errors.location).toBe('Location is Required');
    expect(instance.state.errors.price).toBe('Price is Required');
    expect(instance.state.errors.capacity).toBe('Capacity is Required');
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
      EditCenterPage.prototype,
      'imageOnChange'
    );
    const wrapper = shallow(<EditCenterPage {...props} />);
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
      EditCenterPage.prototype,
      'selectOnChange'
    );
    const wrapper = shallow(<EditCenterPage {...props} />);

    wrapper.setState({
      updateCenterData: {
        facilities: ['bar', 'casino']
      }
    });

    const instance = wrapper.instance();
    instance.selectOnChange(event);
    expect(selectOnChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear input fields after input error is thrown', () => {
    const value = '';
    const wrapper = mount(<EditCenterPage {...props} />);
    wrapper.setState({
      centerLoading: false,
      updateCenterData: {
        name: 'Dammy Center',
        location: 'Maryland',
        capacity: 500,
        price: 1000,
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
        type: 'Marquee',
        description: 'Dammy Center is in maryland',
        facilities: ['bar', 'casino']
      }
    });
    wrapper.find('#name').simulate('change', {
      target: { name: 'name', value }
    });
    wrapper.find('#name').simulate('submit', {
      preventDefault: jest.fn(),
      persist: jest.fn()
    });
    wrapper.find('#name').simulate('focus', {
      target: { name: 'name', value },
      preventDefault: jest.fn(),
      persist: jest.fn(),
    });
    expect(wrapper.state().updateCenterData.name).toBe(value);
  });

  it('should have the componentWillReceiveProps method', () => {
    const nextProps = props;
    const componentWillReceivePropsSpy = jest.spyOn(EditCenterPage.prototype, 'componentWillReceiveProps');
    const wrapper = shallow(<EditCenterPage {...props} />);
    wrapper.setState({
      centerLoading: false,
      updateCenterData: {
        name: 'Dammy Center',
        location: 'Maryland',
        capacity: 500,
        price: 1000,
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
        type: 'Marquee',
        description: 'Dammy Center is in maryland',
        facilities: ['bar', 'casino']
      }
    });
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should populate the form field and update the state', () => {
    const wrapper = mount(<EditCenterPage {...props} />);
    wrapper.setState({
      errors: {},
      isLoading: true,
      isAuthenticated: false,
      centerLoading: false,
      chosenImageUrl: '',
      updateCenterData: {
        name: 'Dammy Center',
        location: 'Maryland',
        capacity: 500,
        price: 1000,
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
        type: 'Marquee',
        description: 'Dammy Center is in maryland',
        facilities: ['bar', 'casino']
      },
      chosenImage: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg'
    });
    wrapper.find('#name').simulate('change', {
      target: { name: 'name', value: 'Hephzibah Hall' },
      preventDefault: jest.fn(),
      persist: jest.fn(),
    });

    wrapper.find('form').simulate('submit', {
      preventDefault: jest.fn(),
      persist: jest.fn(),
    });
    expect(wrapper.state()).toEqual(updatedComponentStateUponSubmit);
  });

  it('should populate the form field and update the state with no change in image', () => {
    const wrapper = mount(<EditCenterPage {...props} />);
    wrapper.setState({
      errors: {},
      isLoading: true,
      isAuthenticated: false,
      centerLoading: false,
      chosenImageUrl: '',
      updateCenterData: {
        name: 'Dammy Center',
        location: 'Maryland',
        capacity: 500,
        price: 1000,
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
        type: 'Marquee',
        description: 'Dammy Center is in maryland',
        facilities: ['bar', 'casino']
      },
      chosenImage: ''
    });
    wrapper.find('#name').simulate('change', {
      target: { name: 'name', value: 'Hephzibah Hall' },
      preventDefault: jest.fn(),
      persist: jest.fn(),
    });

    wrapper.find('form').simulate('submit', {
      preventDefault: jest.fn(),
      persist: jest.fn(),
    });
    expect(wrapper.state()).toEqual({
      updateCenterData: {
        name: 'Hephzibah Hall',
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
      isLoading: true,
      errors: {},
      centerLoading: false,
      centerError: '',
      chosenImageUrl: '',
    });
  });

  it('ensures that mapDispatchToProps dispatches the specified actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).loadOneCenter).toBeTruthy();
    expect(mapDispatchToProps(dispatch).updateCenter).toBeTruthy();
    expect(mapDispatchToProps(dispatch).uploadToCloudinary).toBeTruthy();
  });
});
