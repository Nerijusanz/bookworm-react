import React from 'react';
import {Route} from 'react-router-dom';
import propTypes from 'prop-types';

import GuestRoute from './GuestRoute';
import UserRoute from './UserRoute';

import HomePage from '../components/pages/HomePage';
import LoginPage from '../components/pages/LoginPage';
import DashboardPage from '../components/pages/DashboardPage';
import SignupPage from '../components/pages/SignupPage';
import ConfirmationPage from '../components/pages/ConfirmationPage';


const MainRoute = ({location}) => (
  <div>
    <Route location={location} path="/" exact component={HomePage} />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <GuestRoute location={location} path="/signup" exact component={SignupPage} />
    <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
    <Route location={location} path="/confirmation/:token" exact component={ConfirmationPage} />
  </div>
);

MainRoute.propTypes={
  location: propTypes.shape({
    pathname: propTypes.string.isRequired
  }).isRequired
}


export default MainRoute;