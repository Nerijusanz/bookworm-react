import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import propTypes from 'prop-types';
import {connect} from 'react-redux';


const AuthRoute = ({isAuthenticated,component:Component,...rest}) => (
    
    <Route {...rest} render={props=>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" /> } />
)

AuthRoute.propTypes={
    component: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool.isRequired

}


function mapStateToProps(state){


    return{
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps,{})(AuthRoute);
