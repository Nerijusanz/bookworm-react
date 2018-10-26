import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import LoginForm from '../../forms/auth/LoginForm';



class LoginPage extends Component {

  state={}

  render() {

    // ----------------state variables ------------------------
    const {success} = this.props.auth; // redux: auth reducer
    // --------------------------------------------------------

    const content = success ? this.context.router.history.push('/dashboard') : <LoginForm />

    return (
      <div>
        <h1>LoginPage</h1>
          {content}
      </div>
    )
  }
}


LoginPage.propTypes = {
  auth: propTypes.shape({

      success: propTypes.bool.isRequired,

  }).isRequired,

}

LoginPage.contextTypes = {
  router: propTypes.object.isRequired
}


function mapStateToProps(state){

  return {
      auth: state.auth
  }
}


export default connect(mapStateToProps,{})(LoginPage);