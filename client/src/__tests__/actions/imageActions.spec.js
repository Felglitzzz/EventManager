import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  SAVE_IMAGE_SUCCESS
} from '../../actions/actionTypes';
import {
  uploadToCloudinary
} from '../../actions/imageActions';
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import mockData from '../__mocks__/mockData';

const mockStore = configureStore([thunk]);
const {
  image
} = mockData.images;
const url = '/api/v1/';

window.localStorage = mockLocalStorage;

describe('Image Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('upload image action', (done) => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: image
      });
    });

    const expectedAction = [
      {
        type: SAVE_IMAGE_SUCCESS,
        saveImage: image
      }
    ];

    const store = mockStore({});

    return store.dispatch(uploadToCloudinary('image'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });
});