import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap';
import { PersistGate } from 'redux-persist/integration/react'


import Routes from './routes';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/toastr/build/toastr.min.css';
import '../public/css/style.css';
import { store, persistor } from './store/configureStore';
// import { loadCenters } from './actions/centerActions';

render( // eslint-disable-line
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>, document.querySelector('#app'));
