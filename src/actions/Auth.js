import axios from 'axios';
import api from '../api/api';

import {
    AUTH_LOGGED_IN,
    AUTH_LOGGED_OUT,
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


export const setAuthorizationHeader = token => {

    if(token)
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
         
}

export const deleteAuthorizationHeader = () =>{

    delete axios.defaults.headers.common.Authorization;

}


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