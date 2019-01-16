import React, { Component } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Loader from 'react-loader';

import {authenticationCheck,logout} from './actions/Auth';
import TopDashboardNavigation from './components/navigation/TopDashboardNavigation';

import FlashMessage from './components/messages/flash/FlashMessage';


import GuestRoute from './routes/GuestRoute';
import AuthRoute from './routes/AuthRoute';

// -----------------Pages-----------------------------------
import HomePage from './components/pages/HomePage';

import LoginPage from './components/pages/auth/LoginPage';
import SignupPage from './components/pages/auth/SignupPage';
import SignupConfirmationPage from './components/pages/auth/SignupConfirmationPage';
import ForgotPasswordPage from './components/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/auth/ResetPasswordPage';


import DashboardPage from './components/pages/dashboard/DashboardPage';

import Books from './components/pages/dashboard/books/Books';
import AddBook from './components/pages/dashboard/books/AddBook';

import UserBooks from './components/pages/dashboard/userbooks/UserBooks';

// -----------------end Pages----------------------------------------




class App extends Component {

  componentDidMount(){

        // note: if on server-side got user authenticated succes, than redux add isAuthenticated!!!
        this.props.authenticationCheck();

  }

  logout = (logoutToken) => {
    this.props.logout(logoutToken);
  }

  render() {

        // ----------------state variables ------------------------
        const {isAuthenticated,auth} = this.props;  // REDUX props
        //---------------------------------------------------------

        const appTopNavigation = isAuthenticated && <TopDashboardNavigation auth={auth} logout={this.logout} />

        // ---------------------------ROUTES-----------------------------------------------------
        const NotFoundRedirect = () => <Redirect to="/" />
        
        const appRoutes = !auth.loading &&
            
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

        // ------------------------------------------------------------------------------

    return (
      <div>
        <Loader loaded={!auth.loading}>
          {appTopNavigation}
          <div className="ui container">
            <FlashMessage/>
            {appRoutes}
          </div>
        </Loader>
      </div>
    )
  }
}

App.propTypes={
  isAuthenticated: propTypes.bool.isRequired,

  location: propTypes.shape({
    pathname: propTypes.string.isRequired
  }).isRequired,

  auth: propTypes.shape({
    loading: propTypes.bool.isRequired,
  }).isRequired,

  authenticationCheck: propTypes.func.isRequired,
  logout: propTypes.func.isRequired
}


function mapStateToProps(state){

  return {
    isAuthenticated: !!state.auth.token,
    auth: state.auth
  }
}


export default connect(mapStateToProps,{authenticationCheck,logout})(App);