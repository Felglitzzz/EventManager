/* global expect */
import imageReducer from '../../reducers/imageReducer';
import {
  SAVE_IMAGE_SUCCESS,
  SAVE_IMAGE_FAIL,
} from '../../actions/actionTypes';

import mockData from '../__mocks__/mockData';

const initialState = {
  images: {}
};

describe('Images reducer', () => {
  describe('DEFAULT', () => {
    it('Should return the initial state', () => {
      const action = {};
      const newState = imageReducer(undefined, action);
      expect(newState).toEqual(initialState.images);
    });
  });

  describe('SAVE_IMAGE', () => {
    it('should set image details in store', () => {
      const prevState = initialState.images;

      const action = {
        type: SAVE_IMAGE_SUCCESS,
        saveImage: mockData.images.image
      };

      const expected = {
        image: mockData.images.image
      };

      const newState = imageReducer(prevState, action);
      expect(newState).toEqual(expected);
    });

    it('should set error in store', () => {
      const prevState = initialState.images;

      const action = {
        type: SAVE_IMAGE_FAIL,
        error: mockData.images.imagePresetNotFound
      };

      const expected = {
        error: mockData.images.imagePresetNotFound
      };

      const newState = imageReducer(prevState, action);
      expect(newState).toEqual(expected);
    });
  });
});
