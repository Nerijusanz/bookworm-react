import {combineReducers} from 'redux';
import locale from './localeReducer';
import auth from './authReducer';
import book from './bookReducer';
import userbook from './userbookReducer';
import flashMessage from './flashReducer';

export default combineReducers({
    locale,
    auth,
    book,
    userbook,
    flashMessage
})