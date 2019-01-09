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

} from '../actions/types';

const initialState={
    loading:false,
    serverErrors:{},
    books:[],
    searchBookObj:{
        selectedBookStatus:false,
        selectedBookSaveStatus:false,
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
                books: action.payload.books,    // state.books.concat(action.payload.books),
                searchBookObj:{
                    ...state.searchBookObj,
                    selectedBookStatus:false,
                    selectedBookSaveStatus:false,
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
                    selectedBookStatus:false,
                    selectedBookSaveStatus:false,
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
                    selectedBookStatus:true,
                    selectedBookSaveStatus:false,
                    searchDropdownOptions: action.payload.searchDropdownOptions
                },
                loading: false
            }

        case BOOK_SEARCH_SELECTED_BOOK_STATUS_NO:
            return {
                ...state,
                searchBookObj:{
                    ...state.searchBookObj,
                    selectedBookStatus:false,
                },
                loading:false
            }


        case BOOK_SEARCH_SELECTED_BOOK_SAVE_STATUS_YES:
            return {
                ...state,
                searchBookObj:{
                    ...state.searchBookObj,
                    selectedBookStatus:false,
                    selectedBookSaveStatus:true,
                }
            }

        case BOOK_SEARCH_SELECTED_BOOK_SAVE_STATUS_NO:
            return {
                ...state,
                searchBookObj:{
                    ...state.searchBookObj,
                    selectedBookSaveStatus:false,
                }
            }

        default:return state;
    }
} 