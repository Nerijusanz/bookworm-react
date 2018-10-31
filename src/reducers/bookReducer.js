import {
    BOOK_LOADING_START,
    BOOK_LOADING_STOP,
    
    BOOK_ERROR,

    BOOK_SEARCH_BOOKS_STATUS_YES,
    BOOK_SEARCH_BOOKS_STATUS_NO,


    BOOK_SEARCH_SELECTED_BOOK_STATUS_YES,
    BOOK_SEARCH_SELECTED_BOOK_STATUS_NO,
} from '../actions/types';

const initialState={
    loading:false,
    serverErrors:{},
    books:[],
    searchBookObj:{
        searchDropdownOptions:[]
    },
    
};

export default function books(state=initialState,action){
    switch(action.type){

        case BOOK_LOADING_START:
            return {
                ...state,
                loading:true,
            }

        case BOOK_ERROR:
            return {
                ...state,
                serverErrors:action.payload,
                loading:false
            }

        case BOOK_LOADING_STOP:
            return {
                ...state,
                loading:false
            }

        case BOOK_SEARCH_BOOKS_STATUS_YES:
            return {
                ...state,
                books: action.payload.books,
                searchBookObj:{
                    ...state.searchBookObj,
                    searchDropdownOptions: action.payload.searchDropdownOptions
                },
                loading:false
            }

        case BOOK_SEARCH_BOOKS_STATUS_NO:
            return {
                ...state,
                books:[],
                searchBookObj:{
                    ...state.searchBookObj,
                    searchDropdownOptions:[],
                },
                loading:false
            }

        case BOOK_SEARCH_SELECTED_BOOK_STATUS_YES:
            return {
                ...state,
                books: action.payload.books,
                searchBookObj:{
                    ...state.searchBookObj,
                    searchDropdownOptions: action.payload.searchDropdownOptions
                },
                loading: false
            }

        case BOOK_SEARCH_SELECTED_BOOK_STATUS_NO:
            return {
                ...state,
                loading:false
            }

        default:return state;
    }
} 