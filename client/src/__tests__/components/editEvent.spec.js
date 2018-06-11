import React from 'react';
import { shallow, mount } from 'enzyme';

import { EditEventPage, mapDispatchToProps } from '../../components/Events/EditEventPage';
import EditEventForm from '../../components/Events/Form/EditEventForm';

const props = {
  loadUnpaginatedCenters: () => Promise.resolve(),
  loadOneEvent: () => Promise.resolve(),
  updateEvent: () => Promise.resolve(),
  uploadToCloudinary: () => Promise.resolve(),
  options: {
    loadUnpaginatedCenters: {
      centers:
        [{
          id: 8,
          name: 'Dammy Center',
          location: 'Dubai'
        }, {
          id: 9,
          name: 'Sheba Center',
          location: 'Dubai'
        }]
    }
  },
  event: {
    event: {
      event: {
        name: 'Dammy Hall',
        centerId: 1,
        startDate: '2020-09-25',
        endDate: '2020-09-26',
        userId: 1,
        center: {
          id: 8,
          name: 'capacitor',
          location: 'Dubai'
        },
        id: 18,
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg'
      }
    }
  },
  eventId: 18,
  imageUrl: {},
  match: {
    params: {
      eventId: 18
    }
  },
  history: {
    push: jest.fn()
  }
};

global.FileReader = () => ({
  readAsDataURL: () => {}
});

const componentState = {
  updateEventData: {
    name: 'Dammy Hall',
    centerId: 1,
    startDate: '2020-09-25',
    endDate: '2020-09-26',
    userId: 1,
    center: {
      id: 8,
      name: 'capacitor',
      location: 'Dubai'
    },
    id: 18,
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg'
  },
  chosenImage: '',
  isAuthenticated: false,
  isLoading: false,
  errors: {},
  chosenImageUrl: '',
  options: ['Sheraton']
};

const updatedComponentStateUponSubmit = {
  updateEventData: {
    name: 'Hephzibah Event',
    centerId: 1,
    startDate: '2020-09-25',
    endDate: '2020-09-26',
    userId: 1,
    center: {
      id: 8,
      name: 'capacitor',
      location: 'Dubai'
    },
    id: 18,
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg'
  },
  eventError: '',
  eventLoading: false,
  chosenImage: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
  isAuthenticated: false,
  isLoading: true,
  errors: {},
  chosenImageUrl: 'fgj',
  options: []
};

describe('Edit Event Page', () => {
  it('sets error message when trying to submit empty fields', () => {
    const wrapper = mount(<EditEventPage {...props} />);
    const instance = wrapper.instance();
    instance.setState({
      updateEventData: {}
    });
    const event = {
      preventDefault: jest.fn(),
      persist: jest.fn()
    };
    instance.onSubmit(event);
    expect(instance.state.errors.name).toBe('Name is Required');
  });

  it('should handle input change', () => {
    const wrapper = mount(<EditEventPage {...props} />);
    const instance = wrapper.instance();
    instance.setState({
      updateEventData: {
        name: 'Hephzibah Hall',
        centerId: 1,
        startDate: '2020-09-25',
        endDate: '2020-09-26',
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg'
      },
      options: [{ id: 1, name: 'Sheraton' }]
    });
    const event = {
      preventDefault: jest.fn(),
      persist: jest.fn(),
      target: {
        name: 'name',
        value: 'Dammy Hallsey'
      }
    };
    instance.onChange(event);
    expect(wrapper.state().updateEventData.name).toBe(event.target.value);
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
      EditEventPage.prototype,
      'imageOnChange'
    );
    const wrapper = shallow(<EditEventPage {...props} />);
    const instance = wrapper.instance();
    instance.imageOnChange(event);
    expect(imageOnChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear input fields after input error is thrown', () => {
    const wrapper = mount(<EditEventPage {...props} />);
    const instance = wrapper.instance();
    const e = {
      preventDefault: jest.fn(),
      persist: jest.fn(),
      target: {
        name: 'name',
        value: ''
      }
    };
    const event = {
      preventDefault: jest.fn(),
      persist: jest.fn()
    };
    instance.onSubmit(event);
    instance.handleFocus(e);
    expect(instance.state.updateEventData.name).toBe(e.target.value);
  });

  it('should have the componentWillReceiveProps method', () => {
    const nextProps = props;
    const componentWillReceivePropsSpy = jest.spyOn(EditEventPage.prototype, 'componentWillReceiveProps');
    shallow(<EditEventPage {...props} />)
      .instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should populate the form field and update the state', () => {
    const wrapper = mount(<EditEventPage {...props} />);
    // const instance = wrapper.instance();
    wrapper.instance().setState({
      errors: {},
      chosenImageUrl: 'fgj',
      isLoading: false,
      eventError: '',
      eventLoading: false,
      isAuthenticated: false,
      updateEventData: componentState.updateEventData,
      chosenImage: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg'
    });
    wrapper.update();
    const event = {
      preventDefault: jest.fn(),
      persist: jest.fn(),
    };
    const e = {
      preventDefault: jest.fn(),
      persist: jest.fn(),
      target: {
        name: 'name',
        value: 'Hephzibah Event'
      }
    };
    wrapper.instance().onChange(e);
    wrapper.instance().onSubmit(event);
    expect(wrapper.instance().state).toEqual(updatedComponentStateUponSubmit);
  });

  it('should populate the form field and update the state with no change in image', () => {
    const wrapper = mount(<EditEventPage {...props} />);
    // const instance = wrapper.instance();
    wrapper.instance().setState({
      errors: {},
      chosenImageUrl: '',
      isLoading: false,
      eventError: '',
      eventLoading: false,
      isAuthenticated: false,
      updateEventData: componentState.updateEventData,
      chosenImage: ''
    });
    wrapper.update();
    const event = {
      preventDefault: jest.fn(),
      persist: jest.fn(),
    };
    const e = {
      preventDefault: jest.fn(),
      persist: jest.fn(),
      target: {
        name: 'name',
        value: 'Hephzibah Hall'
      }
    };
    wrapper.instance().onChange(e);
    wrapper.instance().onSubmit(event);
    expect(wrapper.instance().state).toEqual({
      updateEventData: {
        name: 'Hephzibah Hall',
        centerId: 1,
        startDate: '2020-09-25',
        endDate: '2020-09-26',
        userId: 1,
        center: {
          id: 8,
          name: 'capacitor',
          location: 'Dubai'
        },
        id: 18,
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg'
      },
      eventError: '',
      eventLoading: false,
      chosenImage: '',
      isAuthenticated: false,
      isLoading: true,
      errors: {},
      chosenImageUrl: '',
      options: []
    });
  });

  it('ensures that mapDispatchToProps dispatches the specified actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).loadOneEvent).toBeTruthy();
    expect(mapDispatchToProps(dispatch).loadUnpaginatedCenters).toBeTruthy();
    expect(mapDispatchToProps(dispatch).updateEvent).toBeTruthy();
    expect(mapDispatchToProps(dispatch).uploadToCloudinary).toBeTruthy();
  });

  it('should render event form stateless component', () => {
    const wrapper = shallow(<EditEventForm
      errors = {{}}
      handleFocus = {jest.fn()}
      imageOnChange = {jest.fn()}
      isLoading = {false}
      onChange = {jest.fn()}
      onSubmit = {jest.fn()}
      options = {[{
        id: 2,
        name: 'Sheba Event Center'
      }]}
      updateEventData = {componentState.updateEventData}
    />);
    expect(wrapper.length).toEqual(1);
  });
});
