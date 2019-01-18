import React, { Component } from 'react'
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage } from 'react-intl';

import {login} from '../../../actions/Auth';

import ServerError from '../../messages/ServerError';
import LoginForm from '../../forms/auth/LoginForm';


class LoginPage extends Component {


  login = (data) => {

    this.props.login(data);
    
  }

  render() {

    // ---------------------state variables-------------------------------
    const {auth} = this.props // redux: auth reducer
    // -------------------------------------------------------------------
    
    return (

      <div className="page login-page">

        <h1 className="page-title"><FormattedMessage id="page_login_page_title" /></h1>

        { auth.serverErrors.global && <ServerError errors={auth.serverErrors.global} /> }

        <LoginForm auth={auth} login={this.login} />

      </div>
    )

  }

}

LoginPage.propTypes = {

  auth: propTypes.shape({
    serverErrors: propTypes.shape({
      global: propTypes.arr,
    }).isRequired

  }).isRequired,

  login: propTypes.func.isRequired,

}

function  mapStateToProps(state){

  return {
      auth: state.auth,
  }
}


export default connect(mapStateToProps,{login})(LoginPage);