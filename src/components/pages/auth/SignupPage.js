import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {signupEmailExists,signup} from '../../../actions/Auth';

import ServerError from '../../messages/ServerError';

import SignupForm from '../../forms/auth/SignupForm';
import InlineMessage from '../../messages/InlineMessage';



class SignupPage extends Component {

  signup = (data) => {

    this.props.signup(data);

  }

  signupEmailExists = (email) => {

    this.props.signupEmailExists(email);

  }

  messageInfo = () =>

     <InlineMessage msgType="info" headerText="Sign up" contentText={`User account confirmation was sent into your email`} />
    


  render() {
    // ----------------state variables ------------------------
    const {auth} = this.props; // redux: auth reducer
    // --------------------------------------------------------

    const content = auth.success ? this.messageInfo() : <SignupForm auth={auth} signupEmailExists={this.signupEmailExists} signup={this.signup} />
         

    return (
      <div className="page signup-page">

        <h1 className="page-title">Sign up Page</h1>

          { auth.serverErrors.global && <ServerError errors={auth.serverErrors.global} /> }
          { auth.serverErrors.signup_email && <ServerError errors={auth.serverErrors.signup_email} /> }

          {content}
            
      </div>
    )
  }
}

SignupPage.propTypes = {

  auth: propTypes.shape({
      success: propTypes.bool.isRequired,
  }).isRequired,

  signupEmailExists: propTypes.func.isRequired,
  signup: propTypes.func.isRequired,
}


function mapStateToProps(state){

  return {
      auth: state.auth
  }
}


export default connect(mapStateToProps,{signupEmailExists,signup})(SignupPage);
