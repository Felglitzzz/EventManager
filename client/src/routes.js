import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';

const Routes = () => (
        <BrowserRouter>
            <div>
                <Route path="/" exact component={App} />
            </div>
        </BrowserRouter>
);

export default Routes;
