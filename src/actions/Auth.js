import axios from 'axios';
import api from '../api/api';

import {
    AUTH_LOGGED_IN,
    AUTH_LOGGED_OUT,

    AUTH_SIGNUP_EMAIL_EXISTS_YES,
    AUTH_SIGNUP_EMAIL_EXISTS_NO,
    AUTH_SIGNUP_SUCCESS_YES,
    AUTH_SIGNUP_SUCCESS_NO,
    AUTH_LOADING,
    AUTH_ERROR
} from './types';



export const authLoggedIn = auth => ({
    
    type: AUTH_LOGGED_IN,
    payload:auth

});

export const authLoggedOut = () => ({

    type: AUTH_LOGGED_OUT

});

export const authLoading = () => ({ 

    type: AUTH_LOADING

});

export const authError = (errors) => ({
    
    type: AUTH_ERROR,
    payload:errors
    
});

export const authSignupEmailExists = (isEmail) => ({
     
        type: (isEmail)? AUTH_SIGNUP_EMAIL_EXISTS_YES: AUTH_SIGNUP_EMAIL_EXISTS_NO,
        payload:isEmail

})

export const authSignup = (status) => ({

    type: (status)? AUTH_SIGNUP_SUCCESS_YES : AUTH_SIGNUP_SUCCESS_NO

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


export const login = (credentials,context) => (dispatch) =>{


    dispatch(authLoading());

    api.auth.login(credentials)
        .then(user=>{   // login on server-side process OK;
        
            const userToken = user.token;

            localStorage.setItem('bookwormUserToken',userToken); // save token on browser local storage;

            setAuthorizationHeader(userToken); // add token to request header

            const authObj={
                token:userToken,

            }

            dispatch(authLoggedIn(authObj));

            context.router.history.push('/dashboard');


        })
        .catch(err=>    // login occurs error on server
                dispatch(authError(err.response.data.errors))
        );
}


export const authenticationCheck = () => (dispatch) =>


    api.auth.authenticationCheck()
        .then(user=>{

            const authObj={
                token:user.token,

            }

            dispatch(authLoggedIn(authObj));   // redux login

        })
        .catch(()=>{

            // make full logout process
            if(localStorage.getItem('bookwormUserToken'))
                localStorage.removeItem('bookwormUserToken');
        
                deleteAuthorizationHeader();
            

        })




export const logout = () => (dispatch) => {
    
    if(localStorage.getItem('bookwormUserToken'))
        localStorage.removeItem('bookwormUserToken');

        deleteAuthorizationHeader();

        dispatch(authLoggedOut());  // redux logout;
    
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
            dispatch(authError(err.response.data.errors))
        })


}

/*
export const signup = (data) => (dispatch) => {

    api.auth.signup(data)
        .then(()=>{ // signup process on server-side done OK;
            this.setState({loading:false,success:true});
            // show message success, 
            this.setRedirectOn(); // enable redirect timer;
            // redirect page to login;
        })
        .catch(err=>{   // signup process on server-side occurs error

            this.setState({
                errors:err.response.data.errors,
                loading:false,
                success:false
            });

            // show error message

        });


}
*/