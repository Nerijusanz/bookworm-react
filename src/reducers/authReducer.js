import jwtDecode from 'jwt-decode';
import { 
    AUTH_LOGGED_IN_YES,
    AUTH_LOGGED_IN_NO,

    AUTH_LOGGED_OUT_YES,
    AUTH_LOGGED_OUT_NO,

    AUTH_AUTHENTICATION_STATUS_YES,
    AUTH_AUTHENTICATION_STATUS_NO,

    AUTH_SIGNUP_EMAIL_EXISTS_YES,
    AUTH_SIGNUP_EMAIL_EXISTS_NO,

    AUTH_SIGNUP_SUCCESS_YES,
    AUTH_SIGNUP_SUCCESS_NO,

    AUTH_SIGNUP_CONFIRMATION_TOKEN_YES,
    AUTH_SIGNUP_CONFIRMATION_TOKEN_NO,

    AUTH_FORGOT_PASSWORD_SEND_YES,
    AUTH_FORGOT_PASSWORD_SEND_NO,

    AUTH_RESET_PASSWORD_TOKEN_YES,
    AUTH_RESET_PASSWORD_TOKEN_NO,

    AUTH_RESET_PASSWORD_SUCCESS_YES,
    AUTH_RESET_PASSWORD_SUCCESS_NO,

    AUTH_LOADING_START,
    AUTH_LOADING_STOP,

    AUTH_ERROR
} from '../actions/types';

const initialState={
    token:'',
    logoutToken:'',
    user:{},
    serverErrors:{},
    loading:false,
    success:false,

    signupIsEmail:false,

    resetPasswordTokenStatus:false,

    
};

export default function auth(state=initialState,action){
    
    switch(action.type){

        case AUTH_LOGGED_IN_YES:
            return {
                ...state,
                token: action.payload.token,    // expiration time: on
                logoutToken: action.payload.logoutToken,    // expiration time: off
                user: jwtDecode(action.payload.token),
                serverErrors:{},
                success:true,
                loading:false
            }

        case AUTH_LOGGED_IN_NO:
            return{
                ...state,
                token:'',
                logoutToken:'',
                user:{},
                success:false,
                loading:false
            }

        case AUTH_LOGGED_OUT_YES:
            return {
                ...state,
                token:'',
                logoutToken:'',
                user:{},
                success:false,
                loading:false
            }

        case AUTH_LOGGED_OUT_NO:
            return {
                ...state,
                loading:false
            }
        
        case AUTH_AUTHENTICATION_STATUS_YES:
            return {
                ...state,
                token: action.payload.token,    // expiration time: on
                logoutToken: action.payload.logoutToken,    // expiration time: off
                user: jwtDecode(action.payload.token),
                serverErrors:{},
                success:true,
                loading:false
            }

        case AUTH_AUTHENTICATION_STATUS_NO:
            return {
                ...state,
                token:'',
                logoutToken:'',
                user:{},
                success:false,
                loading:false
            }

        case AUTH_SIGNUP_EMAIL_EXISTS_YES:
            return {
                ...state,
                signupIsEmail:true,
                loading:false
            }

        case AUTH_SIGNUP_EMAIL_EXISTS_NO:
            return {
                ...state,
                signupIsEmail:false,
                serverErrors:{},
                loading:false
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

        case AUTH_SIGNUP_CONFIRMATION_TOKEN_YES:{
            return {
                ...state,
                serverErrors:{},
                success:true,
                loading:false
            }
        }

        case AUTH_SIGNUP_CONFIRMATION_TOKEN_NO:{
            return {
                ...state,
                success:false,
                loading:false
            }
        }

        case AUTH_FORGOT_PASSWORD_SEND_YES:{
            return {
                ...state,
                serverErrors:{},
                success:true,
                loading:false
            }
        }

        case AUTH_FORGOT_PASSWORD_SEND_NO:{
            return {
                ...state,
                success:false,
                loading:false
            }
        }

        case AUTH_RESET_PASSWORD_TOKEN_YES:{
            return {
                ...state,
                serverErrors:{},
                resetPasswordTokenStatus:true,
                loading:false
            }
        }

        case AUTH_RESET_PASSWORD_TOKEN_NO:{
            return {
                ...state,
                resetPasswordTokenStatus:false,
                loading:false
            }
        }

        case AUTH_RESET_PASSWORD_SUCCESS_YES:{
            return {
                ...state,
                serverErrors:{},
                resetPasswordTokenStatus:false, // note: important make false;
                success:true,
                loading:false
            }
        }

        case AUTH_RESET_PASSWORD_SUCCESS_NO:{
            return {
                ...state,
                success:false,
                loading:false
            }
        }

        case AUTH_LOADING_START:
            return {
                ...state,
                loading:true
            }

        case AUTH_LOADING_STOP:
            return {
                ...state,
                loading:false
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