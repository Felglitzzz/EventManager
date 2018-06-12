import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap';


import Routes from './routes';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/toastr/build/toastr.min.css';
import '../public/styles/style.scss';
import '../public/styles/animate.scss';
import { store } from './store/configureStore';

render(<Provider store={store}>
  <Routes />
</Provider>, document.querySelector('#app'));
