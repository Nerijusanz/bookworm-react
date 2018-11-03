import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route,Switch,Redirect} from 'react-router-dom';
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

import Books from '../components/pages/dashboard/books/Books';
import AddBook from '../components/pages/dashboard/books/AddBook';

import UserBooks from '../components/pages/dashboard/userbooks/UserBooks';

// -----------------end Pages----------------------------------------


class AppRoute extends Component {


  componentDidMount(){

    // note: if on server-side got user authenticated succes, than redux add isAuthenticated!!!
    this.props.authenticationCheck();

  }

  render() {

    // ----------------state variables ------------------------
    const {loading} = this.props.auth; // redux: auth reducer
    // --------------------------------------------------------
    const NotFoundRedirect = () => <Redirect to="/" />
    
    const routes = !loading &&
        <div>
          <Switch>
            <Route location={this.props.location} path="/" exact component={HomePage} />    
            
            <GuestRoute location={this.props.location} path="/signup" exact component={SignupPage} />
            <GuestRoute location={this.props.location} path="/signup_confirmation_token/:token" exact component={SignupConfirmationPage} /> 
            <GuestRoute location={this.props.location} path="/forgot_password" exact component={ForgotPasswordPage} />
            <GuestRoute location={this.props.location} path="/reset_password_token/:token" exact component={ResetPasswordPage} />
            <GuestRoute location={this.props.location} path="/login" exact component={LoginPage} />

            <AuthRoute location={this.props.location} path="/dashboard_books_add" exact component={AddBook} />
            <AuthRoute location={this.props.location} path="/dashboard_books" exact component={Books} />
            <AuthRoute location={this.props.location} path="/dashboard" exact component={DashboardPage} />

            <AuthRoute location={this.props.location} path="/dashboard_userbooks" exact component={UserBooks} />

            


            <Route component={NotFoundRedirect} />

          </Switch>
        </div>

    return (
        <div>
          {routes}
        </div>

    )
  }

}


AppRoute.propTypes={
  location: propTypes.shape({
    pathname: propTypes.string.isRequired
  }).isRequired,
  auth: propTypes.shape({

    loading: propTypes.bool.isRequired,

  }).isRequired,
  authenticationCheck: propTypes.func.isRequired
}


function mapStateToProps(state){

  return {
      auth: state.auth
  }
}


export default connect(mapStateToProps,{authenticationCheck})(AppRoute);

