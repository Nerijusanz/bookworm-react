import axios from 'axios';
import api from '../api/api';

import {
    AUTH_LOADING,
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

export const authLoading = () => ({ 

    type: AUTH_LOADING

});

export const authError = (errors) => ({
    
    type: AUTH_ERROR,
    payload:errors
    
});

export const authLoggedIn = (status,auth) => ({
    
    type: (status)? AUTH_LOGGED_IN_YES : AUTH_LOGGED_IN_NO,
    payload:auth

});

export const authLoggedOut = (status) => ({

    type: (status)? AUTH_LOGGED_OUT_YES : AUTH_LOGGED_OUT_NO

});

export const authAuthentication = (status,auth) => ({

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

    if(token)
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
         
}

export const deleteAuthorizationHeader = () =>{

    delete axios.defaults.headers.common.Authorization;

}

// -------------------------------------------------------


export const login = (credentials) => (dispatch) =>{


    dispatch(authLoading());

    api.auth.login(credentials)
        .then(user=>{   // login on server-side process OK;
        
            const {token,logoutToken} = user;

            localStorage.setItem('bookwormUserToken',token); // save token on browser local storage;

            setAuthorizationHeader(token); // add token to request header

            const authObj={
                token,
                logoutToken
            }

            dispatch(authLoggedIn(true,authObj));


        })
        .catch(err=>{    // login occurs error on server

            const authObj={}

            dispatch(authLoggedIn(false,authObj));
            dispatch(authError(err.response.data.errors))
        });
}


export const authenticationCheck = () => (dispatch) =>


    api.auth.authenticationCheck()
        .then(user=>{

            const authObj={
                token:user.token,
                logoutToken: user.logoutToken
            }
            
            dispatch(authAuthentication(true,authObj));   // redux login

        })
        .catch(()=>{

            // make full logout process
            if(localStorage.getItem('bookwormUserToken'))
                localStorage.removeItem('bookwormUserToken');
        
                deleteAuthorizationHeader();

                const authObj={}
    
                dispatch(authAuthentication(false,authObj));

        })




export const logout = (logoutToken) => (dispatch) => {

    dispatch(authLoading());

    api.auth.logout(logoutToken)
        .then(()=>{

            if(localStorage.getItem('bookwormUserToken'))
                localStorage.removeItem('bookwormUserToken');
    
            deleteAuthorizationHeader();

            dispatch(authLoggedOut(true));

        })
        .catch(err=>{

            dispatch(authLoggedOut(false));
            dispatch(authError(err.response.data.errors));
        })

    
}


export const signupEmailExists = (email) => (dispatch) => {

    dispatch(authLoading());

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

    dispatch(authLoading());

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

    dispatch(authLoading());

    api.auth.signupConfirmationToken(token)
        .then(()=>{
            dispatch(authSignupConfirmationToken(true));
        })
        .catch(err=>{
            dispatch(authSignupConfirmationToken(false));
            dispatch(authError(err.response.data.errors));
        })

}


export const forgotPassword = (email) => (dispatch) => {
    
    dispatch(authLoading());

    api.auth.forgotPassword(email)
        .then(()=>{
            dispatch(authForgotPassword(true));
        })
        .catch(err=>{
            dispatch(authForgotPassword(false));
            dispatch(authError(err.response.data.errors));
        })
}


export const resetPasswordToken = (token) => (dispatch) => {

    dispatch(authLoading());

    api.auth.resetPasswordToken(token)
        .then(()=>{
            dispatch(authResetPasswordToken(true));
        })
        .catch(err=>{
            dispatch(authResetPasswordToken(false));
            dispatch(authError(err.response.data.errors));
        })

}


export const resetPassword = (data) => (dispatch) => {


    dispatch(authLoading());

    api.auth.resetPassword(data)
        .then(()=>{
            dispatch(authResetPassword(true));
        })
        .catch(err=>{
            dispatch(authResetPassword(false));
            dispatch(authError(err.response.data.errors));
        })

}

