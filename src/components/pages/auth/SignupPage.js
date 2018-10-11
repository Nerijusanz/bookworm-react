import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import { Message,MessageContent,MessageHeader } from 'semantic-ui-react';
import SignupForm from '../../forms/auth/SignupForm';

class SignupPage extends Component {

  state={}

  render() {

    const {success} = this.props.auth; // redux: auth reducer

    const content = success ?
    (      

        <Message info>
            <MessageHeader>Sign up</MessageHeader>
            <MessageContent>
                <ul>
                    <li>Signup successfully done</li>
                    <li>Verify account was sent into your email</li>
                </ul>
            </MessageContent>
        </Message>       
    ):
    (<SignupForm />)


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
