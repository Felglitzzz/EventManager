import { createStore } from 'redux';

import rootReducer from '../../reducers/rootReducer';
import eventReducer from '../../reducers/eventReducer';
import centerReducer from '../../reducers/centerReducer';
import imageReducer from '../../reducers/imageReducer';

const store = createStore(rootReducer);

describe('Rootreducer', () => {
  it('create store', () => {
    expect(store.getState().eventReducer).toEqual(eventReducer(undefined, {}));
    expect(store.getState().centerReducer).toEqual(centerReducer(undefined, {}));
    expect(store.getState().imageReducer).toEqual(imageReducer(undefined, {}));
  });

  it('log out', () => {
    const action = { type: 'LOG_OUT' };
    store.dispatch(action);
    expect(store.getState().userAccessReducer).toEqual(undefined, action);
  });
});
