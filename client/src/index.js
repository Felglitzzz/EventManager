import React from 'react';
import { render } from 'react-dom';
import 'bootstrap';

import Routes from './routes';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../public/css/style.css';

render(<Routes />, document.querySelector('#app'));
