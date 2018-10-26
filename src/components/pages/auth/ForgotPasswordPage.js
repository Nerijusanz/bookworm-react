import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import ForgotPasswordForm from '../../forms/auth/ForgotPasswordForm';
import InlineMessage from '../../messages/InlineMessage';



class ForgotPasswordPage extends Component {

  messageForgotPasswordSendInfo = () =>

    <InlineMessage msgType="info" headerText="Forgot password" contentText={`Password verification has been sent to your email. Check your email`} />
 

  render() {

      // ----------------state variables ------------------------
      const {success} = this.props.auth; // redux: auth reducer
      // --------------------------------------------------------

      const content = success ? this.messageForgotPasswordSendInfo() : <ForgotPasswordForm />

    return (
      <div>
        <h1>Forgot password page</h1>

        {content}
          
      </div>
    )
  }
}

ForgotPasswordPage.propTypes = {
  auth: propTypes.shape({

      success: propTypes.bool.isRequired,

  }).isRequired,

}


function mapStateToProps(state){

  return {
      auth: state.auth
  }
}


export default connect(mapStateToProps,{})(ForgotPasswordPage);