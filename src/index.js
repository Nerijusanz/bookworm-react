import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import 'semantic-ui-css/semantic.min.css';

import store from './store';    // REDUX STORE;
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {setAuthorizationHeader} from './actions/Auth';


if(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN))
    setAuthorizationHeader(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN));


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

registerServiceWorker();
