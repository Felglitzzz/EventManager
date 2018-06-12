import eventReducer from '../../reducers/eventReducer';
import {
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,
  LOAD_ALL_EVENTS_SUCCESS,
  LOAD_ALL_EVENTS_FAIL,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  DELETE_ONE_EVENT_FAIL,
  DELETE_ONE_EVENT_SUCCESS,
  LOAD_EVENTS_BY_CENTER_ID_SUCCESS,
  LOAD_EVENTS_BY_CENTER_ID_FAIL,
  CANCEL_EVENT_FAIL,
  CANCEL_EVENT_SUCCESS,
  APPROVE_EVENT_FAIL,
  APPROVE_EVENT_SUCCESS,
  LOAD_ONE_EVENT_SUCCESS,
  LOAD_ONE_EVENT_FAIL
} from '../../actions/actionTypes';

import mockData from '../__mocks__/mockData';

const initialState = {
  events: {}
};

describe('Events reducer', () => {
  describe('DEFAULT', () => {
    it('Should return the initial state', () => {
      const action = {};
      const newState = eventReducer(undefined, action);
      expect(newState).toEqual(initialState.events);
    });
  });

  describe('ADD_EVENTS', () => {
    it('should set center\'s details in store', () => {
      const prevState = initialState.events;

      const action = {
        type: ADD_EVENT_SUCCESS,
        eventData: mockData.events.createEventResponse
      };

      const expected = {
        events: mockData.events.createEventResponse
      };

      const newState = eventReducer(prevState, action);
      expect(newState).toEqual(expected);
    });

    it('should set error in store', () => {
      const prevState = initialState.events;

      const action = {
        type: ADD_EVENT_FAIL,
        error: mockData.events.createEventErrorResponse
      };

      const expected = {
        error: mockData.events.createEventErrorResponse
      };

      const newState = eventReducer(prevState, action);
      expect(newState).toEqual(expected);
    });
  });

  describe('LOAD_ALL_EVENTS', () => {
    it('should set event\'s details in store', () => {
      const prevState = initialState.events;

      const action = {
        type: LOAD_ALL_EVENTS_SUCCESS,
        events: mockData.events.allEventsResponse
      };

      const expected = {
        events: mockData.events.allEventsResponse
      };

      const newState = eventReducer(prevState, action);
      expect(newState).toEqual(expected);
    });

    it('should set error in store', () => {
      const prevState = initialState.events;

      const action = {
        type: LOAD_ALL_EVENTS_FAIL,
        error: mockData.events.eventNotFound
      };

      const expected = {
        error: mockData.events.eventNotFound
      };

      const newState = eventReducer(prevState, action);
      expect(newState).toEqual(expected);
    });
  });

  describe('LOAD_ONE_EVENT', () => {
    it('should set event\'s details in store', () => {
      const prevState = initialState.events;

      const action = {
        type: LOAD_ONE_EVENT_SUCCESS,
        eventReturned: mockData.events.loadOneEventResponse
      };

      const expected = {
        event: mockData.events.loadOneEventResponse
      };

      const newState = eventReducer(prevState, action);
      expect(newState).toEqual(expected);
    });

    it('should set error in store', () => {
      const prevState = initialState.events;

      const action = {
        type: LOAD_ONE_EVENT_FAIL,
        error: mockData.events.eventNotFound
      };

      const expected = {
        error: mockData.events.eventNotFound
      };

      const newState = eventReducer(prevState, action);
      expect(newState).toEqual(expected);
    });
  });

  describe('UPDATE_EVENT', () => {
    it('should set updated event\'s details in store', () => {
      const prevState = initialState.events;

      const action = {
        type: UPDATE_EVENT_SUCCESS,
        event: mockData.events.loadOneEventResponse
      };

      const expected = {
        events: mockData.events.loadOneEventResponse
      };

      const newState = eventReducer(prevState, action);
      expect(newState).toEqual(expected);
    });

    it('should set error in store', () => {
      const prevState = initialState.events;

      const action = {
        type: UPDATE_EVENT_FAIL,
        error: mockData.events.eventNotFound
      };

      const expected = {
        error: mockData.events.eventNotFound
      };

      const newState = eventReducer(prevState, action);
      expect(newState).toEqual(expected);
    });
  });

  describe('DELETE_EVENT', () => {
    it('should set deleted event\'s status in store', () => {
      const previousState = {
        events: {
          events: {
            count: 11,
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
              },
              {
                id: 24,
                name: 'bjbh',
                image: 'https://res.cloudinary.com/felglitz/image/upload/v1527018735/grf3y6lx7ucuinguk3qe.jpg',
                startDate: '2018-05-22T00:00:00.000Z',
                endDate: '2018-05-22T00:00:00.000Z',
                status: 'pending',
                userId: 1,
                centerId: 4,
                createdAt: '2018-05-22',
                updatedAt: '2018-05-22',
                center: {
                  id: 4,
                  name: 'Dammy Hall',
                  location: 'Maryland'
                }
              },
            ]
          },
          meta: {
            pagination: {
              currentPageUrl: 'http://localhost:1991/api/v1/events?page=1',
              currentPage: 1,
              totalPages: 1,
              offset: 0,
              limit: 3
            }
          }
        }
      };

      const prevState = previousState;

      const action = {
        type: DELETE_ONE_EVENT_SUCCESS,
        deletedStatus: {
          eventId: 24
        }
      };

      const expected = {
        events: {
          events: {
            count: 11,
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
              currentPage: 1,
              totalPages: 1,
              offset: 0,
              limit: 3
            }
          }
        }
      };

      const newState = eventReducer(prevState, action);
      expect(newState).toEqual(expected);
    });

    it('should set error in store', () => {
      const prevState = initialState.events;

      const action = {
        type: DELETE_ONE_EVENT_FAIL,
        error: mockData.eventNotFound
      };

      const expected = {
        error: mockData.eventNotFound
      };

      const newState = eventReducer(prevState, action);
      expect(newState).toEqual(expected);
    });
  });

  describe('LOAD_EVENT_BY_CENTER_ID', () => {
    it('should set event\'s details in store', () => {
      const prevState = initialState.events;

      const action = {
        type: LOAD_EVENTS_BY_CENTER_ID_SUCCESS,
        eventsRetrieved: mockData.events.eventsByCenterId
      };

      const expected = {
        eventsRetrieved: mockData.events.eventsByCenterId
      };

      const newState = eventReducer(prevState, action);
      expect(newState).toEqual(expected);
    });

    it('should set error in store', () => {
      const prevState = initialState.events;

      const action = {
        type: LOAD_EVENTS_BY_CENTER_ID_FAIL,
        error: mockData.events.eventNotFound
      };

      const expected = {
        error: mockData.events.eventNotFound
      };

      const newState = eventReducer(prevState, action);
      expect(newState).toEqual(expected);
    });
  });

  describe('CANCEL_EVENT', () => {
    it('should set status of cancelled event in store', () => {
      const prevState = {
        eventsRetrieved: {
          events: {
            count: 11,
            rows: [

              {
                id: 24,
                name: 'bjbh',
                image: 'https://res.cloudinary.com/felglitz/image/upload/v1527018735/grf3y6lx7ucuinguk3qe.jpg',
                startDate: '2018-05-22T00:00:00.000Z',
                endDate: '2018-05-22T00:00:00.000Z',
                status: 'pending',
                userId: 1,
                centerId: 4,
                createdAt: '2018-05-22',
                updatedAt: '2018-05-22',
                center: {
                  id: 4,
                  name: 'Dammy Hall',
                  location: 'Maryland'
                }
              },
            ]
          },
          meta: {
            pagination: {
              currentPageUrl: 'http://localhost:1991/api/v1/events?page=1',
              currentPage: 1,
              totalPages: 1,
              offset: 0,
              limit: 3
            }
          }
        }
      };

      const action = {
        type: CANCEL_EVENT_SUCCESS,
        cancelledData: {
          eventId: 24
        }
      };

      const expected = {
        eventsRetrieved: {
          events: {
            count: 11,
            rows: [

              {
                id: 24,
                name: 'bjbh',
                image: 'https://res.cloudinary.com/felglitz/image/upload/v1527018735/grf3y6lx7ucuinguk3qe.jpg',
                startDate: '2018-05-22T00:00:00.000Z',
                endDate: '2018-05-22T00:00:00.000Z',
                status: 'cancelled',
                userId: 1,
                centerId: 4,
                createdAt: '2018-05-22',
                updatedAt: '2018-05-22',
                center: {
                  id: 4,
                  name: 'Dammy Hall',
                  location: 'Maryland'
                }
              },
            ]
          },
          meta: {
            pagination: {
              currentPageUrl: 'http://localhost:1991/api/v1/events?page=1',
              currentPage: 1,
              totalPages: 1,
              offset: 0,
              limit: 3
            }
          }
        }
      };

      const newState = eventReducer(prevState, action);
      expect(newState).toEqual(expected);
    });

    it('should set error in store', () => {
      const prevState = initialState.eventsRetrieved;

      const action = {
        type: CANCEL_EVENT_FAIL,
        error: mockData.eventNotFound
      };

      const expected = {
        error: mockData.eventNotFound
      };

      const newState = eventReducer(prevState, action);
      expect(newState).toEqual(expected);
    });
  });

  describe('APPROVE_EVENT', () => {
    it('should set status of approved event in store', () => {
      const prevState = {
        eventsRetrieved: {
          events: {
            count: 11,
            rows: [

              {
                id: 24,
                name: 'bjbh',
                image: 'https://res.cloudinary.com/felglitz/image/upload/v1527018735/grf3y6lx7ucuinguk3qe.jpg',
                startDate: '2018-05-22T00:00:00.000Z',
                endDate: '2018-05-22T00:00:00.000Z',
                status: 'pending',
                userId: 1,
                centerId: 4,
                createdAt: '2018-05-22',
                updatedAt: '2018-05-22',
                center: {
                  id: 4,
                  name: 'Dammy Hall',
                  location: 'Maryland'
                }
              },
            ]
          },
          meta: {
            pagination: {
              currentPageUrl: 'http://localhost:1991/api/v1/events?page=1',
              currentPage: 1,
              totalPages: 1,
              offset: 0,
              limit: 3
            }
          }
        }
      };
      const action = {
        type: APPROVE_EVENT_SUCCESS,
        approvedData: {
          eventId: 24
        }
      };

      const expected = {
        eventsRetrieved: {
          events: {
            count: 11,
            rows: [

              {
                id: 24,
                name: 'bjbh',
                image: 'https://res.cloudinary.com/felglitz/image/upload/v1527018735/grf3y6lx7ucuinguk3qe.jpg',
                startDate: '2018-05-22T00:00:00.000Z',
                endDate: '2018-05-22T00:00:00.000Z',
                status: 'accepted',
                userId: 1,
                centerId: 4,
                createdAt: '2018-05-22',
                updatedAt: '2018-05-22',
                center: {
                  id: 4,
                  name: 'Dammy Hall',
                  location: 'Maryland'
                }
              },
            ]
          },
          meta: {
            pagination: {
              currentPageUrl: 'http://localhost:1991/api/v1/events?page=1',
              currentPage: 1,
              totalPages: 1,
              offset: 0,
              limit: 3
            }
          }
        }
      };

      const newState = eventReducer(prevState, action);
      expect(newState).toEqual(expected);
    });

    it('should set error in store', () => {
      const prevState = initialState.events;

      const action = {
        type: APPROVE_EVENT_FAIL,
        error: mockData.eventNotFound
      };

      const expected = {
        error: mockData.eventNotFound
      };

      const newState = eventReducer(prevState, action);
      expect(newState).toEqual(expected);
    });
  });
});
