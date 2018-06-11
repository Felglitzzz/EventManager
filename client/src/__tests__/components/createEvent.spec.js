import React from 'react';
import { shallow, mount } from 'enzyme';

import { CreateEventPage, mapDispatchToProps } from '../../components/Events/CreateEventPage';
import EventForm from '../../components/Events/Form/EventForm';

const props = {
  loadUnpaginatedCenters: () => Promise.resolve(),
  addNewEvent: () => Promise.resolve(),
  uploadToCloudinary: () => Promise.resolve(),
  options: {
    loadUnpaginatedCenters: {
      centers: ['Sheraton', 'Protea'],
    }
  },
  imageUrl: {}
};

global.FileReader = () => ({
  readAsDataURL: () => {}
});

const componentState = {
  eventData: {
    name: 'Dammy Event',
    centerId: 1,
    startDate: '2020-09-25',
    endDate: '2020-09-26',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg'
  },
  chosenImage: '',
  isAuthenticated: false,
  isLoading: false,
  errors: {},
  chosenImageUrl: '',
  options: [],
};

const updatedComponentStateUponSubmit = {
  eventData: {
    name: 'Dammy Event',
    centerId: 1,
    startDate: '2020-09-25',
    endDate: '2020-09-26',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg'
  },
  chosenImage: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
  isAuthenticated: false,
  isLoading: true,
  errors: {},
  chosenImageUrl: '',
  options: [],
};

describe('Create Event Page', () => {
  it('sets error message when trying to submit empty fields', () => {
    const wrapper = mount(<CreateEventPage {...props} />);
    const eventform = wrapper.find('form');
    eventform.simulate('submit');
    expect(wrapper.state().errors.name).toBe('Name is Required');
    expect(wrapper.state().errors.centerId).toBe('Location is Required');
    expect(wrapper.state().errors.startDate).toBe('Start Date is Required');
    expect(wrapper.state().errors.endDate).toBe('End Date is Required');
    expect(wrapper.state().errors.image).toBe('Image is Required');
  });

  it('should handle input change', () => {
    const value = 'Dammy Events';
    const wrapper = mount(<CreateEventPage {...props} />);
    wrapper.find('#name').simulate('change', {
      target: { name: 'name', value }
    });
    expect(wrapper.state().eventData.name).toBe(value);
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
      CreateEventPage.prototype,
      'imageOnChange'
    );
    const wrapper = shallow(<CreateEventPage {...props} />);
    const instance = wrapper.instance();
    instance.imageOnChange(event);
    expect(imageOnChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear input fields after input error is thrown', () => {
    const value = '';
    const wrapper = mount(<CreateEventPage {...props} />);
    wrapper.find('#name').simulate('focus', {
      target: { name: 'name', value }
    });
    expect(wrapper.state().eventData.name).toBe(value);
  });

  it('should have the componentWillReceiveProps method', () => {
    const nextProps = props;
    const componentWillReceivePropsSpy = jest.spyOn(CreateEventPage.prototype, 'componentWillReceiveProps');
    shallow(<CreateEventPage {...props} />)
      .instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should populate the form field and update the state', () => {
    const wrapper = mount(<CreateEventPage {...props} />);
    wrapper.instance().setState({
      errors: {},
      isLoading: true,
      isAuthenticated: false,
      eventData: componentState.eventData,
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
    expect(mapDispatchToProps(dispatch).loadUnpaginatedCenters).toBeTruthy();
    expect(mapDispatchToProps(dispatch).addNewEvent).toBeTruthy();
    expect(mapDispatchToProps(dispatch).uploadToCloudinary).toBeTruthy();
  });

  it('should render event form stateless component', () => {
    const wrapper = shallow(<EventForm
      errors = {{}}
      eventData = {componentState.eventData}
      handleFocus = {jest.fn()}
      imageOnChange = {jest.fn()}
      isLoading = {false}
      onChange = {jest.fn()}
      onSubmit = {jest.fn()}
      options = {[{
        id: 2,
        name: 'Sheba Event Center'
      }]}
    />);
    expect(wrapper.length).toEqual(1);
  });
});
