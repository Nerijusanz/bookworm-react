import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import propTypes from 'prop-types';
import {connect} from 'react-redux';


const UserRoute = ({isUserAuthenticated,component:Component,...rest}) => (
    <Route {...rest} render={props=>
        isUserAuthenticated ? <Component {...props} /> : <Redirect to="/" /> } />
)


UserRoute.propTypes={
    component: propTypes.func.isRequired,
    isUserAuthenticated: propTypes.bool.isRequired
}

function mapStateToProps(state){
    return{
        isUserAuthenticated: !!state.user.token
    }
}

export default connect(mapStateToProps)(UserRoute)