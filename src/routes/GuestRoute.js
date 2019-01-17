import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import propTypes from 'prop-types';

const GuestRoute = ({isAuthenticated,component:Component,...rest}) => (
    <Route {...rest} render={ props =>
        !isAuthenticated ? <Component { ...props } /> : <Redirect to="/dashboard" /> } />
);

GuestRoute.propTypes={
    component: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool.isRequired
}

export default GuestRoute;