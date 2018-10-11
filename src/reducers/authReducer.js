import { 
    AUTH_LOGGED_IN,
    AUTH_LOGGED_OUT,
    AUTH_LOADING,
    AUTH_ERROR
} from '../actions/types';

const initialState={
    token:'',
    loading:false,
    serverErrors:{},

    signup:{
        success:false
    }
};

export default function auth(state=initialState,action){
    
    switch(action.type){

        case AUTH_LOGGED_IN:
            return {
                ...state,
                token: action.payload.token,
                serverErrors:{},
                loading:false
            }

        case AUTH_LOGGED_OUT:
            return {
                ...state,
                token:''
            };

        case AUTH_LOADING:
            return {
                ...state,
                loading:true
            }

        case AUTH_ERROR:
            return {
                ...state,
                serverErrors:action.payload,
                loading:false
            }

        default:return state;
    }
}