import axios from 'axios';
import api from '../api/api';

import {
    AUTH_LOADING_START,
    AUTH_LOADING_STOP,

    AUTH_ERROR,

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
    AUTH_RESET_PASSWORD_SUCCESS_NO

} from './types';

export const authLoading = (status) => ({ 

    type:(status)? AUTH_LOADING_START : AUTH_LOADING_STOP,

});

export const authError = (errors) => ({
    
    type: AUTH_ERROR,
    payload:errors
    
});

export const authLoggedIn = (status,auth={}) => ({
    
    type: (status)? AUTH_LOGGED_IN_YES : AUTH_LOGGED_IN_NO,
    payload:auth

});

export const authLoggedOut = (status) => ({

    type: (status)? AUTH_LOGGED_OUT_YES : AUTH_LOGGED_OUT_NO

});

export const authAuthentication = (status,auth={}) => ({

    type: (status)? AUTH_AUTHENTICATION_STATUS_YES : AUTH_AUTHENTICATION_STATUS_NO,
    payload:auth

});

export const authSignupEmailExists = (isEmail) => ({
     
    type: (isEmail)? AUTH_SIGNUP_EMAIL_EXISTS_YES: AUTH_SIGNUP_EMAIL_EXISTS_NO

})

export const authSignup = (status) => ({

    type: (status)? AUTH_SIGNUP_SUCCESS_YES : AUTH_SIGNUP_SUCCESS_NO

})

export const authSignupConfirmationToken = (status) => ({

    type: (status)? AUTH_SIGNUP_CONFIRMATION_TOKEN_YES : AUTH_SIGNUP_CONFIRMATION_TOKEN_NO

})

export const authForgotPassword = (status) => ({

    type: (status)? AUTH_FORGOT_PASSWORD_SEND_YES : AUTH_FORGOT_PASSWORD_SEND_NO

})

export const authResetPasswordToken = (status) => ({

    type: (status)? AUTH_RESET_PASSWORD_TOKEN_YES : AUTH_RESET_PASSWORD_TOKEN_NO

})

export const authResetPassword = (status) => ({

    type: (status)? AUTH_RESET_PASSWORD_SUCCESS_YES: AUTH_RESET_PASSWORD_SUCCESS_NO

})

// ---------------REQUEST HEADER-----------------------

export const setAuthorizationHeader = token => {

    if(!token || token === 'undefined'){
        
        delete axios.defaults.headers.common.Authorization;

        localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN);

        return;
    } 

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN,token); // save token on browser local storage;
    
}

export const deleteAuthorizationHeader = () =>{

    delete axios.defaults.headers.common.Authorization;

    localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN);

}

// -------------------------------------------------------


export const login = (credentials) => (dispatch) =>{


    dispatch(authLoading(true));

    api.auth.login(credentials)
        .then(user=>{   // login on server-side process OK;

            setAuthorizationHeader(user.token); // add token to request header

            dispatch(authLoggedIn(true,user));

        })
        .catch(err=>{    // login occurs error on server

            dispatch(authLoggedIn(false));

            dispatch(authError(err.response.data.errors))

        });

 
}


export const authenticationCheck = () => (dispatch) => {

    // note: authenticationCheck() initialized on: routes->appRoute->componentWillMount()

    dispatch(authLoading(true));

    api.auth.authenticationCheck()
        .then(user=>{

            setAuthorizationHeader(user.token); // add token to request header

            dispatch(authAuthentication(true,user));   // redux login

        })
        .catch(()=>{
        
                deleteAuthorizationHeader();
    
                dispatch(authAuthentication(false));

        });   

}



export const logout = (logoutToken) => (dispatch) => {

    dispatch(authLoading(true));

    api.auth.logout(logoutToken)
        .then(()=>{
    
            deleteAuthorizationHeader();

            dispatch(authLoggedOut(true));

        })
        .catch(err=>{

            dispatch(authLoggedOut(false));

            dispatch(authError(err.response.data.errors));

        })


}


export const signupEmailExists = (email) => (dispatch) => {

    dispatch(authLoading(true));

    api.auth.signupEmailExists(email)
        .then(()=>{

            dispatch(authSignupEmailExists(false));

        })
        .catch(err=>{    // login occurs error on server

            dispatch(authSignupEmailExists(true));

            dispatch(authError(err.response.data.errors));

        });
    

}


export const signup = (data) => (dispatch) => {

    dispatch(authLoading(true));

    api.auth.signup(data)
        .then(()=>{

            dispatch(authSignup(true));

        })
        .catch(err=>{

            dispatch(authSignup(false));

            dispatch(authError(err.response.data.errors));

        })
    
 
}


export const signupConfirmationToken = (token) => (dispatch) => {

    dispatch(authLoading(true));

    api.auth.signupConfirmationToken(token)
        .then(()=>{

            dispatch(authSignupConfirmationToken(true));

        })
        .catch(err=>{

            dispatch(authSignupConfirmationToken(false));

            dispatch(authError(err.response.data.errors));

        });


}


export const forgotPassword = (email) => (dispatch) => {
    
    dispatch(authLoading(true));

    api.auth.forgotPassword(email)
        .then(()=>{

            dispatch(authForgotPassword(true));

        })
        .catch(err=>{

            dispatch(authForgotPassword(false));

            dispatch(authError(err.response.data.errors));

        });


}


export const resetPasswordToken = (token) => (dispatch) => {

    dispatch(authLoading(true));

    api.auth.resetPasswordToken(token)
        .then(()=>{

            dispatch(authResetPasswordToken(true));

        })
        .catch(err=>{

            dispatch(authResetPasswordToken(false));

            dispatch(authError(err.response.data.errors));

        });


}


export const resetPassword = (data) => (dispatch) => {

    dispatch(authLoading(true));

    api.auth.resetPassword(data)
        .then(()=>{

            dispatch(authResetPassword(true));

        })
        .catch(err=>{

            dispatch(authResetPassword(false));

            dispatch(authError(err.response.data.errors));

        });

}

