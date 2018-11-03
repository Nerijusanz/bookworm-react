import api from '../api/api';
import {
    USERBOOK_BOOKS_STATUS_YES,
    USERBOOK_BOOKS_STATUS_NO,

} from './types';

/*
const userbookLoading = (status) => ({ 

    type:(status)? BOOK_LOADING_START : BOOK_LOADING_STOP,

});

export const userbookError = (errors) => ({
    
    type: BOOK_ERROR,
    payload:errors
    
});
*/

export const userbookBooks = (status,books={}) => ({ 

    type:(status)? USERBOOK_BOOKS_STATUS_YES :USERBOOK_BOOKS_STATUS_NO,
    payload:books

});


export const getBooks = () => (dispatch) => {
    
    // dispatch(bookLoading(true));
    
    api.userbook.books()
        .then(books=>{

            dispatch(userbookBooks(true,books));

        })
        .catch(err=>{

            dispatch(userbookBooks(false));

            // dispatch(bookError(err.response.data.errors));

        })
        
 
}
