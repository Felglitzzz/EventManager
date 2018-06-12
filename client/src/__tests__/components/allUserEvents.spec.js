import React from 'react';
import { shallow, mount } from 'enzyme';

import { AllUserEvents, mapDispatchToProps } from '../../components/Events/AllUserEvents';
import UserEvent from '../../components/Events/UserEvent';

const props = {
  loadAllEvent: () => Promise.resolve(),
  deleteEvent: () => Promise.resolve(),
  events: {
    events: {
      events: {
        count: 1,
        rows: [
          {
            id: 29,
            name: 'ooooooop',
            image: 'https://res.cloudinary.com/felglitz/image/upload/v1527113526/gtp7by5ybxchahusanxg.jpg',
            startDate: '2018-05-24T00:00:00.000Z',
            endDate: '2018-05-26T00:00:00.000Z',
            status: 'cancelled',
            userId: 1,
            centerId: 6,
            createdAt: '2018-05-23',
            updatedAt: '2018-06-02',
            center: {
              id: 6,
              name: 'Bespoke',
              location: 'Lekki'
            }
          }
        ]
      },
      meta: {
        pagination: {
          currentPageUrl: 'http://localhost:1991/api/v1/events?page=1',
          next: 'http://localhost:1991/api/v1/events?page=2',
          currentPage: 1,
          totalPages: 1,
          offset: 0,
          limit: 3
        }
      }
    }
  },
  history: {
    push: jest.fn(),
  },
  match: {
    params: {},
    path: '/dashboard/events'
  },
  location: {
    search: '?page=1'
  },
};

jest.mock('react-router-dom');


describe(' All User\'s Events Page', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<AllUserEvents {...props} />);
    expect(wrapper.find('section').exists).toBeTruthy();
  });

  it('should render stateless child component', () => {
    const childProps = {
      handleDelete: () => Promise.resolve(),
      events: {
        count: 1,
        rows: [
          {
            id: 29,
            name: 'ooooooop',
            image: 'https://res.cloudinary.com/felglitz/image/upload/v1527113526/gtp7by5ybxchahusanxg.jpg',
            startDate: '2018-05-24T00:00:00.000Z',
            endDate: '2018-05-26T00:00:00.000Z',
            status: 'cancelled',
            userId: 1,
            centerId: 6,
            createdAt: '2018-05-23',
            updatedAt: '2018-06-02',
            center: {
              id: 6,
              name: 'Bespoke',
              location: 'Lekki'
            }
          }
        ]
      },
    };
    const wrapper = shallow(<UserEvent {...childProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should test componentWillReceiveProps method', () => {
    const nextProps = {
      loadAllEvent: () => Promise.resolve(),
      deleteEvent: () => Promise.resolve(),
      events: {
        events: {
          events: {
            count: 1,
            rows: [
              {
                id: 29,
                name: 'ooooooop',
                image: 'https://res.cloudinary.com/felglitz/image/upload/v1527113526/gtp7by5ybxchahusanxg.jpg',
                startDate: '2018-05-24T00:00:00.000Z',
                endDate: '2018-05-26T00:00:00.000Z',
                status: 'cancelled',
                userId: 1,
                centerId: 6,
                createdAt: '2018-05-23',
                updatedAt: '2018-06-02',
                center: {
                  id: 6,
                  name: 'Bespoke',
                  location: 'Lekki'
                }
              }
            ]
          },
          meta: {
            pagination: {
              currentPageUrl: 'http://localhost:1991/api/v1/events?page=1',
              next: 'http://localhost:1991/api/v1/events?page=2',
              currentPage: 1,
              totalPages: 1,
              offset: 0,
              limit: 3
            }
          }
        }
      },
      history: {
        push: jest.fn(),
      },
      match: {
        params: {}
      },
      location: {
        search: '?page=1'
      }
    };
    const componentWillReceivePropsSpy = jest.spyOn(
      AllUserEvents.prototype,
      'componentWillReceiveProps'
    );
    const wrapper = shallow(<AllUserEvents {...props} />);
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should test the handleDelete method', () => {
    const wrapper = mount(<AllUserEvents {...props} />);
    wrapper.setState({
      eventsLoading: false,
      events: {
        count: 1,
        rows: [
          {
            id: 29,
            name: 'ooooooop',
            image: 'https://res.cloudinary.com/felglitz/image/upload/v1527113526/gtp7by5ybxchahusanxg.jpg',
            startDate: '2018-05-24T00:00:00.000Z',
            endDate: '2018-05-26T00:00:00.000Z',
            status: 'cancelled',
            userId: 1,
            centerId: 6,
            createdAt: '2018-05-23',
            updatedAt: '2018-06-02',
            center: {
              id: 6,
              name: 'Bespoke',
              location: 'Lekki'
            }
          }
        ]
      },
      pagination: {
        currentPageUrl: 'http://localhost:1991/api/v1/events?page=1',
        next: 'http://localhost:1991/api/v1/events?page=2',
        currentPage: 1,
        totalPages: 1,
        offset: 0,
        limit: 3
      }
    });
    expect(wrapper.find('section').exists).toBeTruthy();
    wrapper.instance().handleDelete({
      preventDefault: jest.fn(),
      target: {
        id: 6
      }
    });
    expect(wrapper.find('#deleteEventButton')).toHaveLength(1);
  });

  it('should test mapDispatchToProps method', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).loadAllEvent).toBeTruthy();
    expect(mapDispatchToProps(dispatch).deleteEvent).toBeTruthy();
  });

  it('should test showNext method', () => {
    const history = { push: () => {} };

    const showNextSpy = jest.spyOn(AllUserEvents.prototype, 'showNext');
    const wrapper = mount(<AllUserEvents
      {...props}
      history = {history}
    />);
    wrapper.setState({
      pagination: {
        currentPageUrl: 'http://localhost:1991/api/v1/events?page=1',
        next: 'http://localhost:1991/api/v1/events?page=2',
        currentPage: 1,
        totalPages: 2,
        offset: 0,
        limit: 3
      },
      eventsLoading: false,
      events: {
        count: 1,
        rows: [
          {
            id: 29,
            name: 'ooooooop',
            image: 'https://res.cloudinary.com/felglitz/image/upload/v1527113526/gtp7by5ybxchahusanxg.jpg',
            startDate: '2018-05-24T00:00:00.000Z',
            endDate: '2018-05-26T00:00:00.000Z',
            status: 'cancelled',
            userId: 1,
            centerId: 6,
            createdAt: '2018-05-23',
            updatedAt: '2018-06-02',
            center: {
              id: 6,
              name: 'Bespoke',
              location: 'Lekki'
            }
          }
        ]
      },
      meta: {
        pagination: {
          currentPageUrl: 'http://localhost:1991/api/v1/events?page=1',
          next: 'http://localhost:1991/api/v1/events?page=2',
          currentPage: 1,
          totalPages: 1,
          offset: 0,
          limit: 3
        }
      }

    });
    wrapper.find('#showNext').simulate('click');
    expect(showNextSpy).toHaveBeenCalled();
  });

  it('should test showPrevious method', () => {
    const history = { push: () => {} };

    const showPreviousSpy = jest.spyOn(AllUserEvents.prototype, 'showPrevious');
    const wrapper = mount(<AllUserEvents
      {...props}
      history = {history}
    />);
    wrapper.setState({
      pagination: {
        previous: 'http://localhost:1991/api/v1/events?page=1',
        currentPageUrl: 'http://localhost:1991/api/v1/events?page=2',
        next: 'http://localhost:1991/api/v1/events?page=3',
        currentPage: 2,
        totalPages: 2,
        offset: 3,
        limit: 3
      },
      eventsLoading: false,
      events: {
        count: 1,
        rows: [
          {
            id: 29,
            name: 'ooooooop',
            image: 'https://res.cloudinary.com/felglitz/image/upload/v1527113526/gtp7by5ybxchahusanxg.jpg',
            startDate: '2018-05-24T00:00:00.000Z',
            endDate: '2018-05-26T00:00:00.000Z',
            status: 'cancelled',
            userId: 1,
            centerId: 6,
            createdAt: '2018-05-23',
            updatedAt: '2018-06-02',
            center: {
              id: 6,
              name: 'Bespoke',
              location: 'Lekki'
            }
          }
        ]
      },
      meta: {
        pagination: {
          currentPageUrl: 'http://localhost:1991/api/v1/events?page=1',
          next: 'http://localhost:1991/api/v1/events?page=2',
          currentPage: 1,
          totalPages: 1,
          offset: 0,
          limit: 3
        }
      }

    });
    wrapper.find('#showPrevious').simulate('click');
    expect(showPreviousSpy).toHaveBeenCalled();
  });

  it('should show no event page if there is no events', () => {
    const showNoEventsSpy = jest.spyOn(AllUserEvents.prototype, 'showNoEvents');
    const wrapper = shallow(<AllUserEvents {...props} />);

    wrapper.setState({
      eventsLoading: false,
      events: {}
    });

    const instance = wrapper.instance();
    instance.showNoEvents();
    expect(showNoEventsSpy).toHaveBeenCalled();
  });
});

