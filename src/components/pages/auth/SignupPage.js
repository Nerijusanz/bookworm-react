import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import SignupForm from '../../forms/auth/SignupForm';
import InlineMessage from '../../messages/InlineMessage';

class SignupPage extends Component {


  messageSignupInfo = () =>

     <InlineMessage msgType="info" headerText="Sign up" contentText={`User account confirmation was sent into your email`} />
    


  render() {
    // ----------------state variables ------------------------
    const {success} = this.props.auth; // redux: auth reducer
    // --------------------------------------------------------

    const content = success ? this.messageSignupInfo() : <SignupForm />
         

    return (
      <div>
        <h1>Sign up Page</h1>

          {content}
            
      </div>
    )
  }
}

SignupPage.propTypes = {
  auth: propTypes.shape({

      success: propTypes.bool.isRequired,

  }).isRequired,

}


function mapStateToProps(state){

  return {
      auth: state.auth
  }
}


export default connect(mapStateToProps,{})(SignupPage);
