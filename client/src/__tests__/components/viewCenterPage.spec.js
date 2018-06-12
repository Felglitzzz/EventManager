import React from 'react';
import { shallow, mount } from 'enzyme';

import { ViewCenterPage, mapDispatchToProps } from '../../components/Centers/ViewCenterPage';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

window.localStorage = mockLocalStorage;


const props = {
  loadOneCenter: () => Promise.resolve(),
  loadEventsByCenterId: () => Promise.resolve(),
  cancelEvent: () => Promise.resolve(),
  approveEvent: () => Promise.resolve(),
  center: {
    center: {
      center: {
        count: 13,
        rows: [
          {
            id: 15,
            name: 'jkddkd',
            location: 'Alausa',
            capacity: 900,
            price: 900,
            facilities: [
              'Casino',
              'Parking Space',
              'Volley Ball Court',
              'Salon and Spa',
              'Basket Ball Court'
            ],
            type: 'jherlfrihn',
            description: 'bnmd',
            image: 'https://res.cloudinary.com/felglitz/image/upload/v1528623443/no30px0yjsdbzaddtcch.jpg',
            createdAt: '2018-06-10',
            updatedAt: '2018-06-10'
          }
        ]
      },
      meta: {
        pagination: {
          currentPageUrl: 'http://localhost:1991/api/v1/centers?page=1',
          next: 'http://localhost:1991/api/v1/centers?page=2',
          currentPage: 1,
          totalPages: 5,
          offset: 0,
          limit: 3
        }
      }
    }
  },
  events: {
    eventsRetrieved: {
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
          currentPageUrl: 'http://localhost:1991/api/v1/events/center/1?page=1',
          next: 'http://localhost:1991/api/v1/events/center/1?page=2',
          currentPage: 1,
          totalPages: 2,
          offset: 0,
          limit: 3
        },
      }
    }
  },
  centerId: 19,
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


describe(' View Center\'s Page', () => {
  it('should render ViewCenterPage component', () => {
    const wrapper = shallow(<ViewCenterPage {...props} />);
    expect(wrapper.find('section').exists).toBeTruthy();
  });

  it('should test componentWillReceiveProps method', () => {
    const nextProps = {
      loadAllEvent: () => Promise.resolve(),
      center: {
        center: {
          center: {
            count: 13,
            rows: [
              {
                id: 15,
                name: 'jkddkd',
                location: 'Alausa',
                capacity: 900,
                price: 900,
                facilities: [
                  'Casino',
                  'Parking Space',
                  'Volley Ball Court',
                  'Salon and Spa',
                  'Basket Ball Court'
                ],
                type: 'jherlfrihn',
                description: 'bnmd',
                image: 'https://res.cloudinary.com/felglitz/image/upload/v1528623443/no30px0yjsdbzaddtcch.jpg',
                createdAt: '2018-06-10',
                updatedAt: '2018-06-10'
              }
            ]
          },
          meta: {
            pagination: {
              currentPageUrl: 'http://localhost:1991/api/v1/centers?page=1',
              next: 'http://localhost:1991/api/v1/centers?page=2',
              currentPage: 1,
              totalPages: 5,
              offset: 0,
              limit: 3
            }
          }
        }
      },
      events: {
        eventsRetrieved: {
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
        search: '?page=2'
      }
    };
    const componentWillReceivePropsSpy = jest.spyOn(
      ViewCenterPage.prototype,
      'componentWillReceiveProps'
    );
    const wrapper = shallow(<ViewCenterPage {...props} />);
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should test mapDispatchToProps method', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).loadOneCenter).toBeTruthy();
    expect(mapDispatchToProps(dispatch).loadEventsByCenterId).toBeTruthy();
    expect(mapDispatchToProps(dispatch).cancelEvent).toBeTruthy();
    expect(mapDispatchToProps(dispatch).approveEvent).toBeTruthy();
  });

  it('should test showNext method', () => {
    const history = { push: () => {} };

    const showNextSpy = jest.spyOn(ViewCenterPage.prototype, 'showNext');
    const wrapper = mount(<ViewCenterPage
      {...props}
      history = {history}
    />);
    wrapper.setState({
      pagination: {
        currentPageUrl: 'http://localhost:1991/api/v1/events/center/1?page=1',
        next: 'http://localhost:1991/api/v1/events/center/1?page=2',
        currentPage: 1,
        totalPages: 2,
        offset: 0,
        limit: 3
      },
      centerLoading: false,
      center: {
        center: {
          center: {
            count: 13,
            rows: [
              {
                id: 15,
                name: 'jkddkd',
                location: 'Alausa',
                capacity: 900,
                price: 900,
                facilities: [
                  'Casino',
                  'Parking Space',
                  'Volley Ball Court',
                  'Salon and Spa',
                  'Basket Ball Court'
                ],
                type: 'jherlfrihn',
                description: 'bnmd',
                image: 'https://res.cloudinary.com/felglitz/image/upload/v1528623443/no30px0yjsdbzaddtcch.jpg',
                createdAt: '2018-06-10',
                updatedAt: '2018-06-10'
              }
            ]
          },
          meta: {
            pagination: {
              currentPageUrl: 'http://localhost:1991/api/v1/centers?page=1',
              next: 'http://localhost:1991/api/v1/centers?page=2',
              currentPage: 1,
              totalPages: 5,
              offset: 0,
              limit: 3
            }
          }
        }
      },
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
          currentPageUrl: 'http://localhost:1991/api/v1/events/center/1?page=1',
          next: 'http://localhost:1991/api/v1/events/center/1?page=2',
          currentPage: 1,
          totalPages: 2,
          offset: 0,
          limit: 3
        },
      }
    });
    wrapper.find('#showNext').simulate('click');
    expect(showNextSpy).toHaveBeenCalled();
  });

  it('should test showPrevious method', () => {
    const history = { push: () => {} };

    const showPreviousSpy = jest.spyOn(ViewCenterPage.prototype, 'showPrevious');
    const wrapper = mount(<ViewCenterPage
      {...props}
      history = {history}
    />);
    wrapper.setState({
      pagination: {
        previous: 'http://localhost:1991/api/v1/events/center/1?page=1',
        currentPageUrl: 'http://localhost:1991/api/v1/events/center/1?page=2',
        next: 'http://localhost:1991/api/v1/events/center/1?page=3',
        currentPage: 2,
        totalPages: 3,
        offset: 0,
        limit: 3
      },
      centerLoading: false,
      center: {
        center: {
          center: {
            count: 13,
            rows: [
              {
                id: 15,
                name: 'jkddkd',
                location: 'Alausa',
                capacity: 900,
                price: 900,
                facilities: [
                  'Casino',
                  'Parking Space',
                  'Volley Ball Court',
                  'Salon and Spa',
                  'Basket Ball Court'
                ],
                type: 'jherlfrihn',
                description: 'bnmd',
                image: 'https://res.cloudinary.com/felglitz/image/upload/v1528623443/no30px0yjsdbzaddtcch.jpg',
                createdAt: '2018-06-10',
                updatedAt: '2018-06-10'
              }
            ]
          },
          meta: {
            pagination: {
              currentPageUrl: 'http://localhost:1991/api/v1/centers?page=1',
              next: 'http://localhost:1991/api/v1/centers?page=2',
              currentPage: 1,
              totalPages: 5,
              offset: 0,
              limit: 3
            }
          }
        }
      },
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
    });
    wrapper.find('#showPrevious').simulate('click');
    expect(showPreviousSpy).toHaveBeenCalled();
  });

  it('should show no events when there are no events slated for the center', () => {
    const showNoEventsSpy = jest.spyOn(ViewCenterPage.prototype, 'showNoEvents');
    const wrapper = shallow(<ViewCenterPage {...props} />);
    wrapper.setState({
      centersLoading: false,
      center: {
        count: 13,
        rows: [
          {
            id: 15,
            name: 'jkddkd',
            location: 'Alausa',
            capacity: 900,
            price: 900,
            facilities: [
              'Casino',
              'Parking Space',
              'Volley Ball Court',
              'Salon and Spa',
              'Basket Ball Court'
            ],
            type: 'jherlfrihn',
            description: 'bnmd',
            image: 'https://res.cloudinary.com/felglitz/image/upload/v1528623443/no30px0yjsdbzaddtcch.jpg',
            createdAt: '2018-06-10',
            updatedAt: '2018-06-10'
          }
        ]
      },
      events: {}
    });
    const instance = wrapper.instance();
    instance.showNoEvents();
    expect(showNoEventsSpy).toHaveBeenCalled();
  });

  it('should test cancel event method', () => {
    const handleCancelEventSpy = jest.spyOn(ViewCenterPage.prototype, 'handleCancelEvent');
    const wrapper = shallow(<ViewCenterPage {...props} />);
    wrapper.setState({
      centerLoading: false,
      center: {
        center: {
          center: {
            count: 13,
            rows: [
              {
                id: 15,
                name: 'jkddkd',
                location: 'Alausa',
                capacity: 900,
                price: 900,
                facilities: [
                  'Casino',
                  'Parking Space',
                  'Volley Ball Court',
                  'Salon and Spa',
                  'Basket Ball Court'
                ],
                type: 'jherlfrihn',
                description: 'bnmd',
                image: 'https://res.cloudinary.com/felglitz/image/upload/v1528623443/no30px0yjsdbzaddtcch.jpg',
                createdAt: '2018-06-10',
                updatedAt: '2018-06-10'
              }
            ]
          },
          meta: {
            pagination: {
              currentPageUrl: 'http://localhost:1991/api/v1/centers?page=1',
              next: 'http://localhost:1991/api/v1/centers?page=2',
              currentPage: 1,
              totalPages: 5,
              offset: 0,
              limit: 3
            }
          }
        }
      },
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
    });
    const instance = wrapper.instance();
    instance.handleCancelEvent({
      preventDefault: jest.fn(),
      persist: jest.fn(),
      target: {
        id: 9,
        name: 'Dammy Event'
      }
    });
    expect(handleCancelEventSpy).toHaveBeenCalled();
  });

  it('should test approve event method', () => {
    const handleApproveEventSpy = jest.spyOn(ViewCenterPage.prototype, 'handleApproveEvent');
    const wrapper = shallow(<ViewCenterPage {...props} />);
    wrapper.setState({
      centerLoading: false,
      center: {
        center: {
          center: {
            count: 13,
            rows: [
              {
                id: 15,
                name: 'jkddkd',
                location: 'Alausa',
                capacity: 900,
                price: 900,
                facilities: [
                  'Casino',
                  'Parking Space',
                  'Volley Ball Court',
                  'Salon and Spa',
                  'Basket Ball Court'
                ],
                type: 'jherlfrihn',
                description: 'bnmd',
                image: 'https://res.cloudinary.com/felglitz/image/upload/v1528623443/no30px0yjsdbzaddtcch.jpg',
                createdAt: '2018-06-10',
                updatedAt: '2018-06-10'
              }
            ]
          },
          meta: {
            pagination: {
              currentPageUrl: 'http://localhost:1991/api/v1/centers?page=1',
              next: 'http://localhost:1991/api/v1/centers?page=2',
              currentPage: 1,
              totalPages: 5,
              offset: 0,
              limit: 3
            }
          }
        }
      },
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
    });
    const instance = wrapper.instance();
    instance.handleApproveEvent({
      preventDefault: jest.fn(),
      persist: jest.fn(),
      target: {
        id: 9,
        name: 'Dammy Event'
      }
    });
    expect(handleApproveEventSpy).toHaveBeenCalled();
  });
});

