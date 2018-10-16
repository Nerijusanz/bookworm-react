import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {resetPasswordToken} from '../../../actions/Auth';
import InlineMessage from '../../messages/InlineMessage';
import ResetPasswordForm from '../../forms/auth/ResetPasswordForm';
import ServerError from '../../messages/ServerError';



class ResetPasswordPage extends Component {


    componentDidMount(){
        
        this.props.resetPasswordToken(this.props.match.params.token);   // get token from url param;

    }
    
    messageLoad = () =>

        <InlineMessage msgType="load" headerText="reset password" contentText="reset password process" />


    messageSuccess = () => {
        const content = `reset password successfully done. Go to login`;
        return <InlineMessage msgType="success" headerText="Reset Password" contentText={content} />
    }


  render() {

    // ---------------------state variables-------------------------------
    const token = this.props.match.params.token; // got token from url param;
    const {serverErrors,loading,success,resetPasswordTokenStatus} = this.props.auth; // redux: auth reducer
    // -------------------------------------------------------------------


    const loadingContent = loading && this.messageLoad();

    const serverErrorContent = serverErrors.global && <ServerError errors={serverErrors.global} />

    const resetPasswordFormContent = (!success && resetPasswordTokenStatus) && <ResetPasswordForm token={token} />

    const successContent  = success && this.messageSuccess();


    return (
      <div>
          <h1>Resset password page</h1>

          {loadingContent}

          {serverErrorContent}

          {resetPasswordFormContent}

          {successContent}

      </div>
    )
  }
}

ResetPasswordPage.propTypes={
    
    match:propTypes.shape({
        params:propTypes.shape({
            token:propTypes.string.isRequired
        }).isRequired
    }).isRequired,
    auth: propTypes.shape({
        loading: propTypes.bool.isRequired,
        success: propTypes.bool.isRequired,
        resetPasswordTokenStatus: propTypes.bool.isRequired,
        serverErrors: propTypes.shape({
            global: propTypes.arr
        }).isRequired,

    }).isRequired,
    resetPasswordToken: propTypes.func.isRequired
}

ResetPasswordPage.contextTypes = {
    router: propTypes.object.isRequired
  }

function mapStateToProps(state){

    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps,{resetPasswordToken})(ResetPasswordPage);
