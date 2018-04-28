import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap';


import Routes from './routes';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/toastr/build/toastr.min.css';
import '../public/css/style.css';
import '../public/css/animate.css';
import '../public/css/aos.css';
import { store } from './store/configureStore';

render(<Provider store={store}>
  <Routes />
</Provider>, document.querySelector('#app'));
