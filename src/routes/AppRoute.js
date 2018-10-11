import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route} from 'react-router-dom';
import propTypes from 'prop-types';

import {authenticationCheck} from '../actions/Auth';

import GuestRoute from './GuestRoute';
import AuthRoute from './AuthRoute';

// -----------------Pages-----------------------------------
import HomePage from '../components/pages/HomePage';

import LoginPage from '../components/pages/auth/LoginPage';
import SignupPage from '../components/pages/auth/SignupPage';
import SignupConfirmationPage from '../components/pages/auth/SignupConfirmationPage';
import ForgotPasswordPage from '../components/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../components/pages/auth/ResetPasswordPage';



import DashboardPage from '../components/pages/dashboard/DashboardPage';

// -----------------end Pages----------------------------------------


class AppRoute extends Component {

  state={
    loading:true  // wait for doing authentication on server-side
  }

  componentWillMount(){

    // note: if on server-side got user authenticated succes, than redux add isAuthenticated!!!
    this.props.authenticationCheck()
      .then(()=>this.loadingHandle())
      .catch(()=>this.loadingHandle())

  }

  loadingHandle(){
    this.setState({loading:false})
  }


  render() {
    
    return (
      
      !this.state.loading &&
        <div>
          <Route location={this.props.location} path="/" exact component={HomePage} />    
          <Route location={this.props.location} path="/signup" exact component={SignupPage} />
          <Route location={this.props.location} path="/signup_confirmation_token/:token" exact component={SignupConfirmationPage} /> 
          <Route location={this.props.location} path="/forgot_password" exact component={ForgotPasswordPage} />
          <Route location={this.props.location} path="/reset_password_token/:token" exact component={ResetPasswordPage} />
          
          <GuestRoute location={this.props.location} path="/login" exact component={LoginPage} />
          <AuthRoute location={this.props.location} path="/dashboard" exact component={DashboardPage} />
        </div>

    )
  }

}

AppRoute.propTypes={
  location: propTypes.shape({
    pathname: propTypes.string.isRequired
  }).isRequired,
  authenticationCheck: propTypes.func.isRequired
}

export default connect(null,{authenticationCheck})(AppRoute);

