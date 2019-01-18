import React, { Component } from 'react';
import propTypes from 'prop-types';
import Validator from 'validator';

import { Form,Button } from 'semantic-ui-react';

import InlineError from '../../messages/InlineError';



class SignupForm extends Component {

    state={
        data:{
            email:'',
            password:'',
            passwordConf:'',
        },
        validationErrors:{}
    }

    onChangeHanlder = (e) => {
  
        this.setState({
            data:{
                ...this.state.data,
                [e.target.name]:e.target.value
            }
        });

    }

    onBlurHandler = (e) =>{

        /*
        TODO: not working yet
        // ----------------CUSTOM VALIDATION EMAIL INPUT ON BLUR EVENT ---------------
        const validationErrors={};

        if(!Validator.isEmail(this.state.data.email)) validationErrors.email="invalid email";

        if(Object.keys(validationErrors).length > 0){

            this.setState({
                data:{
                    ...this.state.data,
                    [e.target.name]:e.target.value
                },
                validationErrors
            });

            return;
        }
        
        this.props.signupEmailExists(this.state.data.email);
        */
    }
    

    onSubmitHandler = (e) => {

        e.preventDefault();
        
        if(!this.dataValidation(this.state.data)) return;

        this.props.signup(this.state.data);

    }


    dataValidation = (data) => {

        const validationErrors = {};
        
        if(!Validator.isEmail(data.email)) validationErrors.email = "invalid email";
       
        if(data.password.length < 5) validationErrors.password = "password must consist min 5 simbols";
        if(data.passwordConf.length < 5) validationErrors.passwordConf = "password must consist min 5 simbols";

        if(!Validator.equals(data.password,data.passwordConf)) validationErrors.passwordConf = 'pasword isn`t match';
        
        this.setState({
            validationErrors
        });   

        // return validation error status;
        return (Object.keys(validationErrors).length === 0) // true or false

    }


  render() {

    // ---------------------state variables-------------------------------
    const {validationErrors,data} = this.state;
    const {auth} = this.props; // redux: props
    // -------------------------------------------------------------------

    return (

        <div className="signup-form">
        
            <Form onSubmit={this.onSubmitHandler} loading={auth.loading} >

                {validationErrors.email && <InlineError error={validationErrors.email} />}
                <Form.Field error={!!validationErrors.email || !!auth.serverErrors.signup_email}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email@email.com" 
                        value={data.email}
                        onBlur={this.onBlurHandler}
                        onChange={this.onChangeHanlder}
                        
                    />
                </Form.Field>

                {validationErrors.password && <InlineError error={validationErrors.password} />}
                <Form.Field error={!!validationErrors.password}>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        placeholder=""
                        value={data.password}
                        onChange={this.onChangeHanlder}
                    />
                </Form.Field>

                {validationErrors.passwordConf && <InlineError error={validationErrors.passwordConf} />}
                <Form.Field error={!!validationErrors.passwordConf}>
                    <label htmlFor="passwordConf">Password confirm</label>
                    <input 
                        type="password"
                        id="passwordConf"
                        name="passwordConf"
                        placeholder=""
                        value={data.passwordConf}
                        onChange={this.onChangeHanlder}
                    />
                </Form.Field>

                <Button primary disabled={auth.loading}>sign up</Button>

            </Form>

        </div>
    )
  }

}

SignupForm.propTypes = {

    auth: propTypes.shape({
        loading: propTypes.bool.isRequired,
    }).isRequired,

    signupEmailExists: propTypes.func.isRequired,
    signup: propTypes.func.isRequired

}

export default (SignupForm);