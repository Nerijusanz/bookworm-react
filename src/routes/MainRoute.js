import React from 'react';
import {Route} from 'react-router-dom';
import propTypes from 'prop-types';

import GuestRoute from './GuestRoute';
import UserRoute from './UserRoute';

import HomePage from '../components/pages/HomePage';
import LoginPage from '../components/pages/LoginPage';
import DashboardPage from '../components/pages/DashboardPage';



const MainRoute = ({location}) => (
  <div>
    <Route location={location} path="/" exact component={HomePage} />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />

    <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />

  </div>
);

MainRoute.propTypes={
  location: propTypes.shape({
    pathname: propTypes.string.isRequired
  }).isRequired
}


export default MainRoute;