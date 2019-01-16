import { 
    LOCALE_SET_LANG_YES,
    LOCALE_SET_LANG_NO
} from '../actions/types';

const initialState={
    lang:'en'
};

export default function locale(state=initialState,action){
    switch(action.type){
        
        case LOCALE_SET_LANG_YES:
            return {
                ...state,
                lang:action.payload
                 
            }

        case LOCALE_SET_LANG_NO:
            return {
                ...state,
            }

        default:return state;
    }
} 