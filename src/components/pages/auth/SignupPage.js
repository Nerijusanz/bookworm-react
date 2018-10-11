import React, { Component } from 'react';
import SignupForm from '../../forms/auth/SignupForm';

class SignupPage extends Component {

  render() {
    return (
      <div>
        <h1>Sign up</h1>
        <SignupForm />
      </div>
    )
  }
}


export default SignupPage;
