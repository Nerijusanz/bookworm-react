import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';


import {signupConfirmationToken} from '../../../actions/Auth';
import {addFlashMessage} from '../../../actions/FlashMessage';

import InlineMessage from '../../messages/InlineMessage';
import ServerError from '../../messages/ServerError';


class SignupConfirmationPage extends Component {


    componentDidMount(){
        
        this.props.signupConfirmationToken(this.props.match.params.token);

    }

    messageSignupConfirmationSuccess = () => {
        const content = `User account has been confirmed successfully`;
        return <InlineMessage msgType="success" headerText="Sign up" contentText={content} />
    }

    messageSignupConfirmationLoad = () =>

        <InlineMessage msgType="load" headerText="Sign up" contentText="Sign up confirmation process" />


  render() {

    // ---------------------state variables-------------------------------
    const {serverErrors,loading,success} = this.props.auth; // redux: auth reducer
    // -------------------------------------------------------------------

    
    const loadingContent = loading && this.messageSignupConfirmationLoad();

    const serverErrorContent = serverErrors.global && <ServerError errors={serverErrors.global} />

    const successContent = success && this.messageSignupConfirmationSuccess();


    return (

      <div>

        {loadingContent}

        {serverErrorContent}

        {successContent}

      </div>
    )
  }
}

SignupConfirmationPage.propTypes={
    
    match:propTypes.shape({
        params:propTypes.shape({
            token:propTypes.string.isRequired
        }).isRequired
    }).isRequired,
    auth: propTypes.shape({
        loading: propTypes.bool.isRequired,
        success: propTypes.bool.isRequired,
        serverErrors: propTypes.shape({
            global: propTypes.arr
        }).isRequired
    }).isRequired,
    signupConfirmationToken: propTypes.func.isRequired,
    addFlashMessage: propTypes.func.isRequired
}

function mapStateToProps(state){

    return {
        auth: state.auth
    }
  }


export default connect(mapStateToProps,{addFlashMessage,signupConfirmationToken})(SignupConfirmationPage);