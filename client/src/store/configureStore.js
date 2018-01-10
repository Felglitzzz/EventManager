import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'; // eslint-disable-line
/**
 * Configure redux store
 * @param {object} initialState
 * @param {object} rootReducer
 * @returns {object} store
 */
// export default function configureStore(initialState, rootReducer) {
//   return createStore(
//     initialState,
//     rootReducer,
//     applyMiddleware(thunk, reduxImmutableStateInvariant)
//   );
// }
const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);

export default store;
