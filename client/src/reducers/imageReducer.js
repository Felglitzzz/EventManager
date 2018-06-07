import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

const {
  SAVE_IMAGE_SUCCESS,
  SAVE_IMAGE_FAIL,
} = actionTypes;

/**
 * @export imageReducer
 * @description defines imageReducer
 * @param {object} state
 * @param {object} action
 * @returns {object} action type and payload
 */

const imageReducer = (state = initialState.images, action) => {
  const { type } = action;

  switch (type) {
  case SAVE_IMAGE_SUCCESS:
    return {
      ...state,
      image: action.saveImage
    };
  case SAVE_IMAGE_FAIL:
    return {
      ...state,
      error: action.error
    };
  default:
    return state;
  }
};

export default imageReducer;
