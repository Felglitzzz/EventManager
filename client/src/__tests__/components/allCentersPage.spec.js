import React from 'react';
import { shallow, mount } from 'enzyme';

import { AllCentersPage, mapDispatchToProps } from '../../components/Centers/AllCentersPage';
import UnitCenter from '../../components/Centers/UnitCenter';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

window.localStorage = mockLocalStorage;


const props = {
  loadCenters: () => Promise.resolve(),
  centers: {
    centers: {
      centers: {
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


describe(' All Center\'s Page', () => {
  it('should render all centers component', () => {
    const wrapper = shallow(<AllCentersPage {...props} />);
    expect(wrapper.find('section').exists).toBeTruthy();
  });

  it('should render stateless child component', () => {
    const childProps = {
      loadCenters: () => Promise.resolve(),
      centers: {
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
      }
    };
    const wrapper = shallow(<UnitCenter {...childProps} />);
    wrapper.setProps({
      centers: {
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
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should test componentWillReceiveProps method', () => {
    const nextProps = {
      loadAllEvent: () => Promise.resolve(),
      centers: {
        centers: {
          centers: {
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
      AllCentersPage.prototype,
      'componentWillReceiveProps'
    );
    const wrapper = shallow(<AllCentersPage {...props} />);
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should test mapDispatchToProps method', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).loadCenters).toBeTruthy();
  });

  it('should test showNext method', () => {
    const history = { push: () => {} };

    const showNextSpy = jest.spyOn(AllCentersPage.prototype, 'showNext');
    const wrapper = mount(<AllCentersPage
      {...props}
      history = {history}
    />);
    wrapper.setState({
      pagination: {
        currentPageUrl: 'http://localhost:1991/api/v1/centers?page=1',
        next: 'http://localhost:1991/api/v1/centers?page=2',
        currentPage: 1,
        totalPages: 5,
        offset: 0,
        limit: 3
      },
      centersLoading: false,
      centers: {
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
    });
    wrapper.find('#showNext').simulate('click');
    expect(showNextSpy).toHaveBeenCalled();
  });

  it('should test showPrevious method', () => {
    const history = { push: () => {} };

    const showPreviousSpy = jest.spyOn(AllCentersPage.prototype, 'showPrevious');
    const wrapper = mount(<AllCentersPage
      {...props}
      history = {history}
    />);
    wrapper.setState({
      pagination: {
        previous: 'http://localhost:1991/api/v1/centers?page=1',
        currentPageUrl: 'http://localhost:1991/api/v1/centers?page=2',
        next: 'http://localhost:1991/api/v1/centers?page=3',
        currentPage: 2,
        totalPages: 5,
        offset: 0,
        limit: 3
      },
      centersLoading: false,
      centers: {
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
    });
    wrapper.find('#showPrevious').simulate('click');
    expect(showPreviousSpy).toHaveBeenCalled();
  });

  it('should show no event page if there is no events', () => {
    const showNoCentersSpy = jest.spyOn(AllCentersPage.prototype, 'showNoCenters');
    const wrapper = shallow(<AllCentersPage {...props} />);

    wrapper.setState({
      centersLoading: false,
      centers: {}
    });

    const instance = wrapper.instance();
    instance.showNoCenters();
    expect(showNoCentersSpy).toHaveBeenCalled();
  });
});

