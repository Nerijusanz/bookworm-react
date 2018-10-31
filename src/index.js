import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import dotenv from 'dotenv';
import 'semantic-ui-css/semantic.min.css';

import store from './store';    // REDUX STORE;
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {setAuthorizationHeader} from './actions/Auth';

// -------------initialize env variables---------
dotenv.config();
// ----------------------------------------------

if(localStorage.getItem('bookwormUserToken'))
    setAuthorizationHeader(localStorage.getItem('bookwormUserToken'));


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

registerServiceWorker();
