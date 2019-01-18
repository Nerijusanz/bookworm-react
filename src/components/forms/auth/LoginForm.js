import React, { Component } from 'react';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {FormattedMessage} from 'react-intl';
import Validator from 'validator';
import { Form,Button } from 'semantic-ui-react';

import InlineError from '../../messages/InlineError';

class LoginForm extends Component {

    state={
        data:{
            email:'',
            password:''
        },
        validationErrors:{}
    }

    onChangeHandler = (e) => {

        this.setState({
            data:{
                ...this.state.data,
                [e.target.name]:e.target.value
            }
        });

    };

    
    onSubmitHandler = (e) => {

        e.preventDefault();
        
        if(!this.dataValidation(this.state.data)) return;

        this.props.login(this.state.data);

    }


    dataValidation = (data) =>{

        const validationErrors={};

        if(!Validator.isEmail(data.email)) validationErrors.email = 'invalid email';
        if(!data.password) validationErrors.password = 'password is required';

        this.setState({validationErrors});
    
        // return validation error status;
        return (Object.keys(validationErrors).length === 0); // true or false;

    }


  render() {
    // ---------------------state variables-------------------------------
    const {validationErrors,data} = this.state;
    const {auth} = this.props; // redux props;
    // -------------------------------------------------------------------

    return (

        <div className="login-form">

            <Form onSubmit={this.onSubmitHandler} loading={auth.loading}>

                <Form.Field error={!!validationErrors.email}>
                    { validationErrors.email && <InlineError error={validationErrors.email} /> }
                    <label htmlFor="email"><FormattedMessage id="page_login_form_input_email_label" /></label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="email@email.com" 
                        value={data.email}
                        onChange={this.onChangeHandler}
                    />
                </Form.Field>

                <Form.Field error={!!validationErrors.password}>
                    { validationErrors.password && <InlineError error={validationErrors.password} /> }
                    <label htmlFor="password"><FormattedMessage id="page_login_form_input_password_label" /></label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        placeholder=""
                        value={data.password}
                        onChange={this.onChangeHandler}
                    />
                </Form.Field>

                <Button primary disabled={auth.loading}><FormattedMessage id="page_login_form_button_login" /></Button>

                <div className="login-form-links">
                    <p><Link to="/forgot_password"><FormattedMessage id="page_login_form_link_forgot_password" /></Link></p>
                    <p><Link to="/signup"><FormattedMessage id="page_login_form_link_signup" /></Link></p>
                </div>

            </Form>
        </div>
    )
  }
}

LoginForm.propTypes = {
    auth: propTypes.shape({
        loading: propTypes.bool.isRequired,
    }).isRequired,

    login: propTypes.func.isRequired,
}

export default (LoginForm);