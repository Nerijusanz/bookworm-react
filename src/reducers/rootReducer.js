import {combineReducers} from 'redux';
import auth from './authReducer';
import book from './bookReducer';
import flashMessage from './flashReducer';

export default combineReducers({
    auth,
    book,
    flashMessage
})