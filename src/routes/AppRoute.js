import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';

// --------------Auth Routes-------------------------------------
import GuestRoute from './GuestRoute';
import AuthRoute from './AuthRoute';
// ---------------------------------------------------------

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


const defaultRoute = () => <Redirect to="/" />

const AppRoute = ({ location,isAuthenticated }) => (

    // <AppRoute location={this.props.location} isAuthenticated={isAuthenticated} />
    // important note: location prop coming from index.js <Route component={App} />

    <Switch>
        <Route location={location} path="/" exact component={HomePage} />    
        
        <GuestRoute location={location} isAuthenticated={isAuthenticated} path="/signup" exact component={SignupPage} />
        <GuestRoute location={location} isAuthenticated={isAuthenticated} path="/signup_confirmation_token/:token" exact component={SignupConfirmationPage} /> 
        <GuestRoute location={location} isAuthenticated={isAuthenticated} path="/forgot_password" exact component={ForgotPasswordPage} />
        <GuestRoute location={location} isAuthenticated={isAuthenticated} path="/reset_password_token/:token" exact component={ResetPasswordPage} />
        <GuestRoute location={location} isAuthenticated={isAuthenticated} path="/login" exact component={LoginPage} />

        <AuthRoute location={location} isAuthenticated={isAuthenticated} path="/dashboard_books_add" exact component={AddBook} />
        <AuthRoute location={location} isAuthenticated={isAuthenticated} path="/dashboard_books" exact component={Books} />
        <AuthRoute location={location} isAuthenticated={isAuthenticated} path="/dashboard" exact component={DashboardPage} />

        <AuthRoute location={location} isAuthenticated={isAuthenticated} path="/dashboard_userbooks" exact component={UserBooks} />
        
        <Route component={defaultRoute} />

    </Switch>

);

AppRoute.propTypes={
    isAuthenticated: propTypes.bool.isRequired,
    location: propTypes.shape({
      pathname: propTypes.string.isRequired
    }).isRequired,
  
  }

export default AppRoute;