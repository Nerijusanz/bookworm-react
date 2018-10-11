import { 
    AUTH_LOGGED_IN,
    AUTH_LOGGED_OUT,
    AUTH_SIGNUP_EMAIL_EXISTS_YES,
    AUTH_SIGNUP_EMAIL_EXISTS_NO,
    AUTH_SIGNUP_SUCCESS_YES,
    AUTH_SIGNUP_SUCCESS_NO,

    AUTH_LOADING,
    AUTH_ERROR
} from '../actions/types';

const initialState={
    token:'',
    serverErrors:{},
    loading:false,
    success:false,

    signupIsEmail:false

    
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
            }

        case AUTH_SIGNUP_EMAIL_EXISTS_YES:
            return {
                ...state,
                signupIsEmail: action.payload,  // NOT USE
                loading:false
            }

        case AUTH_SIGNUP_EMAIL_EXISTS_NO:
            return {
                ...state,
                signupIsEmail: action.payload,
                serverErrors:{},
                loading: false
            }

        case AUTH_SIGNUP_SUCCESS_YES:
            return {
                ...state,
                success:true,
                serverErrors:{},
                loading:false
            }

        case AUTH_SIGNUP_SUCCESS_NO:{
            return {
                ...state,
                success:false,
                loading:false
            }
        }

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