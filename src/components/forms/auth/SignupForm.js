import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import Validator from 'validator';
import { Form,Button,Message,MessageContent,MessageHeader } from 'semantic-ui-react';

import {signupEmailExists,signup} from '../../../actions/Auth';

import InlineError from '../../messages/InlineError';
import ServerError from '../../messages/ServerError';


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

        e.preventDefault();
        
        this.setState({
            data:{...this.state.data,[e.target.name]:e.target.value}
        });

    }

    onBlurHandler = (e) =>{
        
        e.preventDefault();

        // ----------------CUSTOM VALIDATION EMAIL INPUT ON BLUR EVENT ---------------
        const validationErrors={};

        this.setState({validationErrors});

        if(!Validator.isEmail(this.state.data.email)) validationErrors.email="invalid email";

        // check if got validation error
        if(Object.keys(validationErrors).length > 0){
            this.setState({
                validationErrors
            });
            
            return;
        }

        this.props.signupEmailExists(this.state.data.email);
        
    }

    onSubmitHandler = (e) => {

        e.preventDefault();
        
        if(!this.dataValidation(this.state.data)) return; // stop signup process;
        
        // validation goes OK;

        this.props.signup(this.state.data);

    }


    dataValidation = (data) => {

        const validationErrors = {};

        this.setState({validationErrors});
        
        if(!Validator.isEmail(data.email)) validationErrors.email = "invalid email";
       
        if(data.password.length < 5) validationErrors.password = "password must consist min 5 simbols";
        if(data.passwordConf.length < 5) validationErrors.passwordConf = "password must consist min 5 simbols";

        if(!Validator.equals(data.password,data.passwordConf)) validationErrors.passwordConf = 'pasword isn`t match';
        

        // check if got validation error
        if(Object.keys(validationErrors).length > 0)
            this.setState({
                validationErrors
            });   

        // return validation error status;
        return (Object.keys(validationErrors).length === 0) // true or false

    }


  render() {

    // ---------------------state variables-------------------------------
    const {validationErrors,data} = this.state;
    const {serverErrors,loading} = this.props.auth; // redux: auth reducer
    // -------------------------------------------------------------------

    
    
    const serverErrorContent = serverErrors.global && <ServerError errors={serverErrors.global} />

    const content = 
        
        <Form onSubmit={this.onSubmitHandler} loading={loading} >

            {validationErrors.email && <InlineError text={validationErrors.email} />}
            {serverErrors.email && <InlineError text={serverErrors.email} />} 
            <Form.Field error={!!validationErrors.email || !!serverErrors.email}>
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@example.com" 
                    value={data.email}
                    onChange={this.onChangeHanlder}
                    onBlur={this.onBlurHandler}
                />
            </Form.Field>

            {validationErrors.password && <InlineError text={validationErrors.password} />}
            <Form.Field error={!!validationErrors.password}>
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={this.onChangeHanlder}
                />
            </Form.Field>

            {validationErrors.passwordConf && <InlineError text={validationErrors.passwordConf} />}
            <Form.Field error={!!validationErrors.passwordConf}>
                <label htmlFor="passwordConf">Password confirm</label>
                <input 
                    type="password"
                    id="passwordConf"
                    name="passwordConf"
                    value={data.passwordConf}
                    onChange={this.onChangeHanlder}
                />
            </Form.Field>

            <Button primary disabled={loading}>sign up</Button>

        </Form>


    return (
      <div>

        {serverErrorContent}

        {content}

      </div>
    )
  }

}

SignupForm.propTypes = {
    auth: propTypes.shape({
        // signupIsEmail: propTypes.bool.isRequired,
        loading: propTypes.bool.isRequired,
        serverErrors: propTypes.shape({
            global: propTypes.arr,
            email:  propTypes.string
        }).isRequired
    }).isRequired,
    signupEmailExists: propTypes.func.isRequired,
    signup: propTypes.func.isRequired

}
/*
SignupForm.contextTypes = {
    router: propTypes.object.isRequired
}
*/

function mapStateToProps(state){

    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps,{signupEmailExists,signup})(SignupForm);