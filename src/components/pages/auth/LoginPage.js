import React, { Component } from 'react';
import LoginForm from '../../forms/auth/LoginForm';



class LoginPage extends Component {

  state={}

  render() {
    return (
      <div>
        <h1>LoginPage</h1>
        <LoginForm />
      </div>
    )
  }
}


export default LoginPage;
