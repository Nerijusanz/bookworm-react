import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import LoginForm from '../../forms/auth/LoginForm';


const LoginPage = ({isAuthenticatedToken}) => (
  <div>
    <h1>LoginPage</h1>
    {isAuthenticatedToken ? this.context.router.history.push('/dashboard') : <LoginForm />}
  </div>
);

LoginPage.propTypes = {
  
  isAuthenticatedToken: propTypes.bool.isRequired

}

LoginPage.contextTypes = {
  router: propTypes.object.isRequired
}


function mapStateToProps(state){
  return{
    isAuthenticatedToken: !!state.auth.token
  }
}


export default connect(mapStateToProps,{})(LoginPage);