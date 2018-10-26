import {combineReducers} from 'redux';
import auth from './authReducer';
import flashMessage from './flashReducer';

export default combineReducers({
    auth,
    flashMessage
})