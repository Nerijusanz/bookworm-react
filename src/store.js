import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';


// --------REDUX-STORE--------

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    (process.env.REACT_APP_NODE_ENV !== 'production') ? composeWithDevTools(applyMiddleware(...middleware)) : applyMiddleware(...middleware)

)

// get redux store initials state
// console.log(store.getState());

export default store;