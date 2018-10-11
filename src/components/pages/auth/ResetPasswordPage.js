import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {Message,MessageContent, MessageHeader,Icon} from 'semantic-ui-react';

import api from '../../../api/api';
import ResetPasswordForm from '../../forms/auth/ResetPasswordForm';
import ServerError from '../../messages/ServerError';



class ResetPasswordPage extends Component {

    state={
        loading:true,
        success:false,
        errors:{}
    }

    componentDidMount(){

        // ResetPasswordToken
        api.auth.resetPasswordToken(this.props.match.params.token)
            .then(()=>{ // resetPassword token server-side verify OK;
                this.setState({loading:false,error:false,success:true});
            })
            .catch(err=>{ // resetPassword token server-side occurs error;
                this.setState({
                    loading:false,
                    success:false,
                    errors: err.response.data.errors
                });
            })


    }

  render() {

    // ------------variables----------
    const {loading,success,errors} = this.state;
    const token = this.props.match.params.token;
    // -------------------------------

    const loadingContent = loading &&
        <Message icon>
            <Icon name="circle notched" loading />
            <MessageContent>
                <MessageHeader>process password</MessageHeader>
            </MessageContent>   
        </Message>;
    

    const serverError = errors.global && <ServerError errors={errors.global} />

    const successContent = success &&  <ResetPasswordForm token={token} />


    return (
      <div>
          {loadingContent}

          {serverError}

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
    }).isRequired
}

export default connect(null,{})(ResetPasswordPage);
