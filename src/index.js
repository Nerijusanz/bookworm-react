import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { addLocaleData } from 'react-intl';
import lt from 'react-intl/locale-data/lt';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';

import store from './store';    // REDUX STORE;
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {setAuthorizationHeader} from './actions/Auth';

addLocaleData(lt);
addLocaleData(en);
addLocaleData(ru);

// ---------------set auth token-------------------------------

if(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN))
    setAuthorizationHeader(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN));


ReactDOM.render(
    <Router>      
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();