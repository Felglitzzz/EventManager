import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

const {
  LOAD_ALL_CENTERS_SUCCESS,
  LOAD_ALL_CENTERS_FAIL,
  ADD_CENTER_FAIL,
  ADD_CENTER_SUCCESS,
  UPDATE_CENTER_SUCCESS,
  UPDATE_CENTER_FAIL,
  LOAD_ONE_CENTER_FAIL,
  LOAD_ONE_CENTER_SUCCESS,
  LOAD_UNPAGINATED_CENTERS_SUCCESS,
  LOAD_UNPAGINATED_CENTERS_FAIL
} = actionTypes;

const centerReducer = (state = initialState.centers, action) => {
  const { type } = action;

  switch (type) {
  case LOAD_ALL_CENTERS_SUCCESS:
    return {
      ...state,
      centers: action.centers
    };
  case LOAD_ALL_CENTERS_FAIL:
    return {
      ...state,
      error: action.error
    };
  case LOAD_ONE_CENTER_SUCCESS:
    return {
      ...state,
      center: action.centerReturned
    };
  case LOAD_ONE_CENTER_FAIL:
    return {
      ...state,
      error: action.error
    };
  case ADD_CENTER_SUCCESS:
    return {
      ...state,
      centers: action.centerData
    };
  case ADD_CENTER_FAIL:
    return {
      ...state,
      error: action.error
    };
  case UPDATE_CENTER_SUCCESS:
    return {
      ...state,
      centers: {
        center: action.center.modifiedCenter
      }
    };
  case UPDATE_CENTER_FAIL:
    return {
      ...state,
      error: action.error
    };
  case LOAD_UNPAGINATED_CENTERS_SUCCESS:
    return {
      ...state,
      unPaginatedCenters: action.unPaginatedCenters
    };
  case LOAD_UNPAGINATED_CENTERS_FAIL:
    return {
      ...state,
      error: action.error
    };
  default:
    return state;
  }
};

export default centerReducer;
