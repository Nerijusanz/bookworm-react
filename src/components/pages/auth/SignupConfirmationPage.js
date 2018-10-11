import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Message,MessageContent, MessageHeader,Icon} from 'semantic-ui-react';

import api from '../../../api/api';
import {addFlashMessage} from '../../../actions/FlashMessage';

import ServerError from '../../messages/ServerError';


class SignupConfirmationPage extends Component {

    state={
        loading:true,
        success:false,
        errors:{}
    }

    componentDidMount(){

        api.auth.signupConfirmationToken(this.props.match.params.token)
            .then(()=>{ // signup confirmation on server-side OK;
                this.setState({loading:false,success:true,error:false});
                // some additional flash message
                /* this.props.addFlashMessage({
                    type:'success',
                    message:'account has been success verified
                }); */
            })
            .catch(err=>{   // signup confirmation on server-side occurs error
                this.setState({
                    loading:false,
                    success:false,
                    errors:err.response.data.errors 
                });

            });

    }


  render() {
    // -----------variables ----------------
    const {loading,errors,success} = this.state;
    // ----------------------------------

    const loadingContent = loading &&
        <Message icon>
            <Icon name="circle notched" loading />
            <MessageContent>
                <MessageHeader>signup confirmation proccess</MessageHeader>
            </MessageContent>
        </Message>;

    const serverError = errors.global && <ServerError errors={errors.global} />

    const successContent = success &&
        <Message success icon>
            <Icon name="checkmark" />  
            
            <MessageContent>
                <MessageHeader>account has been success verified</MessageHeader>
                <Link to="/login">login</Link>
            </MessageContent>
        </Message>

    return (

      <div>

        {loadingContent}

        {serverError}

        {successContent}

      </div>
    )
  }
}

SignupConfirmationPage.propTypes={
    addFlashMessage: propTypes.func.isRequired,
    match:propTypes.shape({
        params:propTypes.shape({
            token:propTypes.string.isRequired
        }).isRequired
    }).isRequired
}

export default connect(null,{addFlashMessage})(SignupConfirmationPage);