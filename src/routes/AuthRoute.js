import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import propTypes from 'prop-types';

const AuthRoute = ({isAuthenticated,component:Component,...rest}) => (
    
    <Route {...rest} render={ props =>
        isAuthenticated ? <Component { ...props } /> : <Redirect to="/login" /> } />
);

AuthRoute.propTypes={
    component: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool.isRequired
}

export default AuthRoute;