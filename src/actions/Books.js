import api from '../api/api';
import {
    BOOK_LOADING_START,
    BOOK_LOADING_STOP,

    BOOK_ERROR,
    
    BOOK_SEARCH_BOOKS_STATUS_YES,
    BOOK_SEARCH_BOOKS_STATUS_NO,

    BOOK_SEARCH_SELECTED_BOOK_STATUS_YES,
    BOOK_SEARCH_SELECTED_BOOK_STATUS_NO,

    BOOK_SEARCH_SELECTED_BOOK_SAVE_STATUS_YES,
    BOOK_SEARCH_SELECTED_BOOK_SAVE_STATUS_NO,

} from './types';


const bookLoading = (status) => ({ 

    type:(status)? BOOK_LOADING_START : BOOK_LOADING_STOP,

});

export const bookError = (errors) => ({
    
    type: BOOK_ERROR,
    payload:errors
    
});

const bookSearchBook = (status,book={}) => ({ 

    type:(status)? BOOK_SEARCH_BOOKS_STATUS_YES : BOOK_SEARCH_BOOKS_STATUS_NO,
    payload:book

});

const bookSearchBookSelected = (status,book={}) => ({ 

    type:(status)? BOOK_SEARCH_SELECTED_BOOK_STATUS_YES : BOOK_SEARCH_SELECTED_BOOK_STATUS_NO,
    payload:book

});

const bookSearchBookSelectedSave = (status,book={}) => ({ 

    type:(status)? BOOK_SEARCH_SELECTED_BOOK_SAVE_STATUS_YES : BOOK_SEARCH_SELECTED_BOOK_SAVE_STATUS_NO,
    payload:book

});




export const addBook = (book) => (dispatch) => {
    
    dispatch(bookLoading(true));
    
    api.userbook.addBook(book)
        .then(()=>{

            dispatch(bookSearchBookSelectedSave(true))

        })
        .catch(err=>{

            dispatch(bookSearchBookSelectedSave(false));

            dispatch(bookError(err.response.data.errors));

        })
        
 
}



export const searchBook = (query) => (dispatch) => {

    dispatch(bookLoading(true));

    api.booksApi.searchBook(query)
        .then(res=>{

            const searchDropdownOptions=[];
            
            res.books.forEach(book => {

                // books values for search dropdown element
                searchDropdownOptions.push({
                    key: book.goodreadsId,
                    value: book.goodreadsId,
                    text: book.title,
                    image: { avatar: true, src: book.covers[0] }
                });

            });

            const searchBookObj={
                books:res.books,
                searchDropdownOptions
            };

            
            dispatch(bookSearchBook(true,searchBookObj));
            dispatch(bookSearchBookSelected(false));

        })
        .catch(err=>{

            dispatch(bookSearchBook(false));
            dispatch(bookError(err.response.data.errors))
        })

}


export const searchBookSelected = (bookObj) => (dispatch) => {
    // user seleceted book on dropdown list. get selected book object
    dispatch(bookLoading(true));

    if(!bookObj){
        dispatch(bookSearchBookSelected(false));
        return;
    }

    const searchDropdownOptions=[];

    searchDropdownOptions.push({
        key: bookObj[0].goodreadsId,
        value: bookObj[0].goodreadsId,
        text: bookObj[0].title
    });

    const searchBookObj={
        books:bookObj,
        searchDropdownOptions
    };

    
    dispatch(bookSearchBookSelected(true,searchBookObj));


}