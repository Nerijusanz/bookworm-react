import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import propTypes from 'prop-types';
import {connect} from 'react-redux';


const AuthRoute = ({isAuthenticatedToken,component:Component,...rest}) => (
    
    <Route {...rest} render={props=>
        isAuthenticatedToken ? <Component {...props} /> : <Redirect to="/login" /> } />
)

AuthRoute.propTypes={
    component: propTypes.func.isRequired,
    isAuthenticatedToken: propTypes.bool.isRequired

}


function mapStateToProps(state){


    return{
        isAuthenticatedToken: !!state.auth.token
    }
}

export default connect(mapStateToProps,{})(AuthRoute);
