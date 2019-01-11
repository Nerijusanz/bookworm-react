import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import { logout } from '../../actions/Auth';
import TopDashboardNavigation from './TopDashboardNavigation';

class Navigation extends Component {


    logout = (logoutToken) => {
        this.props.logout(logoutToken);
    }

  render() {

    const {isAuthenticatedToken, auth} = this.props;

    const authNavigation = isAuthenticatedToken && <TopDashboardNavigation auth={auth} logout={this.logout} />

    return (
        <React.Fragment>
            {authNavigation}
        </React.Fragment>
    )
  }
}

Navigation.propTypes={

    isAuthenticatedToken: propTypes.bool.isRequired,
    auth: propTypes.shape().isRequired,
    logout: propTypes.func.isRequired
}

function mapStateToProps(state){
    return{
        isAuthenticatedToken: !!state.auth.token,
        auth: state.auth
    }
}

export default connect(mapStateToProps,{logout})(Navigation);