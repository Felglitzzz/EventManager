import * as actionTypes from '../actions/actionTypes';

const {
  LOAD_ALL_CENTERS_SUCCESS,
  LOAD_ALL_CENTERS_FAIL,
  ADD_CENTER_FAIL,
  ADD_CENTER_SUCCESS,
  UPDATE_CENTER_SUCCESS,
  UPDATE_CENTER_FAIL,
  LOAD_ONE_CENTER_FAIL,
  LOAD_ONE_CENTER_SUCCESS
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
  case UPDATE_CENTER_SUCCESS: {
    const centerArray = [];
    if (state.centers === undefined) {
      return state;
    }
    state.loadedCenters.Centers.map((center) => {
      if (center.id === action.updateCenterData.modifiedCenter.id) {
        centerArray.push(action.updateCenterData.modifiedCenter);
      } else {
        centerArray.push(center);
      }
    });
    return {
      ...state, updateCenterData: centerArray
    };
  }
  case UPDATE_CENTER_FAIL:
    return {
      ...state,
      Error: Object.assign({}, action.error)
    };
  default:
    return state;
  }
};

export default centerReducer;
