import axios from 'axios';

import * as actionTypes from './actionTypes';
import { cloudinaryPreset } from '../utils/cloudinary';

const {
  SAVE_IMAGE_FAIL,
  SAVE_IMAGE_SUCCESS,
} = actionTypes;

export const saveImageSuccess = saveImage => ({
  type: SAVE_IMAGE_SUCCESS,
  saveImage
});

export const saveImageFail = error => ({
  type: SAVE_IMAGE_FAIL,
  error
});

export const uploadToCloudinary = (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', cloudinaryPreset);

  return dispatch =>
    axios.post('https://api.cloudinary.com/v1_1/felglitz/image/upload', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then((response) => {
        dispatch(saveImageSuccess(response.data));
      })
      .catch((errors) => {
        dispatch(saveImageFail(errors));
        throw (errors.response.data.message);
      });
};

