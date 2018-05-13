import * as actionTypes from '../actions/actionTypes';

const {
  LOAD_ALL_CENTERS_SUCCESS,
  LOAD_ALL_CENTERS_FAIL,
  ADD_CENTER_FAIL,
  ADD_CENTER_SUCCESS,
  UPDATE_CENTER_SUCCESS,
  UPDATE_CENTER_FAIL,
  LOAD_ONE_CENTER_FAIL,
  LOAD_ONE_CENTER_SUCCESS,
  DELETE_ONE_CENTER_FAIL,
  DELETE_ONE_CENTER_SUCCESS
} = actionTypes;

const centerReducer = (state = {}, action) => {
  const { type } = action;

  switch (type) {
  case LOAD_ALL_CENTERS_SUCCESS:
    return {
      ...state,
      loadedCenters: Object.assign({}, action.loadedCenters)
    };
  case LOAD_ALL_CENTERS_FAIL:
    return {
      ...state,
      error: Object.assign({}, action.error)
    };
  case LOAD_ONE_CENTER_SUCCESS:
    return {
      ...state,
      centerReturned: Object.assign({}, action.centerReturned)
    };
  case LOAD_ONE_CENTER_FAIL:
    return {
      ...state,
      error: Object.assign({}, action.error)
    };
  case ADD_CENTER_SUCCESS:
    return {
      ...state,
      centerData: Object.assign({}, action.centerData)
    };
  case ADD_CENTER_FAIL:
    return {
      ...state,
      error: Object.assign({}, action.error)
    };
  case UPDATE_CENTER_SUCCESS:
    return {
      ...state,
      updateCenterData: action.updateCenterData.modifiedCenter
    };
  case UPDATE_CENTER_FAIL:
    return {
      ...state,
      error: Object.assign({}, action.error)
    };
  case DELETE_ONE_CENTER_FAIL:
    return {
      ...state,
      error: action.error
    };
  case DELETE_ONE_CENTER_SUCCESS: {
    const remainingCenters = state.loadedCenters.Centers.filter(center =>
      center.id !== parseInt(action.deletedStatus.centerId, 10));
    return {
      ...state,
      loadedCenters: {
        ...state.loadedCenters,
        Centers: remainingCenters
      }
    };
  }
  default:
    return state;
  }
};

export default centerReducer;
