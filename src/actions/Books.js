import axios from 'axios';
import api from '../api/api';
import {
    BOOK_LOADING_START,
    BOOK_LOADING_STOP,
    
    BOOK_SEARCH_BOOKS_STATUS_YES,
    BOOK_SEARCH_BOOKS_STATUS_NO,
} from './types';


const bookLoading = (status) => ({ 

    type:(status)? BOOK_LOADING_START : BOOK_LOADING_STOP,

});

const bookSearchBook = (status,book={}) => ({ 

    type:(status)? BOOK_SEARCH_BOOKS_STATUS_YES : BOOK_SEARCH_BOOKS_STATUS_NO,
    payload:book

});

export const books = () => (dispatch) => {}

export const addBook = () => (dispatch) => {}

export const searchBook = (query) => (dispatch) => {

    dispatch(bookLoading(true));

    api.books.searchBook(query)
        .then(res=>{

            const options=[];
            const booksHash=[];

            res.books.forEach(book => {

                // booksHash[book.goodreadsId] = book;
                booksHash.push(book);

                options.push({
                    key: book.goodreadsId,
                    value: book.goodreadsId,
                    text: book.title
                });

            });


            const searchBookObj={
                books:booksHash,
                options
            };

            dispatch(bookSearchBook(true,searchBookObj));

        })
        .catch(()=>{

            dispatch(bookSearchBook(false));

        })

/*
    dispatch(authLoading(true));

    api.auth.signup(data)
        .then(()=>{

            dispatch(authSignup(true));

        })
        .catch(err=>{

            dispatch(authSignup(false));

            dispatch(authError(err.response.data.errors));

        })
*/
}