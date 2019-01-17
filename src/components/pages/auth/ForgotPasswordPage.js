import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import ForgotPasswordForm from '../../forms/auth/ForgotPasswordForm';
import InlineMessage from '../../messages/InlineMessage';


const ForgotPasswordPage = ({auth}) => (
  <div>
      <h1>Forgot password page</h1>
      {
        auth.success ? 
          <InlineMessage msgType="info" headerText="Forgot password" contentText="Password verification has been sent to your email. Check your email" />
          :
          <ForgotPasswordForm />
      }
          
  </div>
);

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