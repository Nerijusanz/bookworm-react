import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Validator from 'validator';
import { Form,Button,Message,MessageContent,MessageHeader } from 'semantic-ui-react';

import api from '../../../api/api';

import InlineError from '../../messages/InlineError';
import ServerError from '../../messages/ServerError';


class SignupForm extends Component {

    state={
        data:{
            email:'',
            password:'',
            passwordConf:'',
        },
        loading:false,
        success:false,
        redirect:false,
        errors:{}
    }

    onChangeInput = e => {

        e.preventDefault();
        
        this.setState({
            data:{...this.state.data,[e.target.name]:e.target.value}
        });

    }

    setRedirectOn = () => {
        // check function: renderRedirect(); 
        // turn on redirect page
        setTimeout(()=>{
            this.setState({redirect:true})

        }, 10000);
    }


    handleOnBlur = e =>{

        e.preventDefault();

        const errors={};

        this.setState({errors});

        if(!Validator.isEmail(this.state.data.email)) errors.email="invalid email";

        // check if got validation error
        if(Object.keys(errors).length > 0){
            this.setState({
                errors,
                loading:false,
                success:false
            });
            
            return;
        }


        this.doSignupUserExists(this.state.data.email);

    }


    validate = (data) => {

        const errors = {};

        this.setState({errors});
        
        if(!Validator.isEmail(data.email)) errors.email = "invalid email";
       
        if(data.password.length < 5) errors.password = "password must consist min 5 simbols";
        if(data.passwordConf.length < 5) errors.passwordConf = "password must consist min 5 simbols";

        if(!Validator.equals(data.password,data.passwordConf)){
            errors.passwordConf = 'pasword isn`t match';
        }

        // check if got validation error
        if(Object.keys(errors).length > 0)
            this.setState({
                errors,
                loading:false,
                success:false
            })       

        // return validation error status;
        return (Object.keys(errors).length === 0) // true or false

    }


    doSubmit = (e) => {

        e.preventDefault();

        this.setState({loading:true});
        
        if(!this.validate(this.state.data) ) // if validation false
            return; // stop signup process;
        
        // validation goes OK;

        this.doSignup(this.state.data);
    }


    doSignupUserExists=(email)=>{

        api.auth.signupUserExists(email)
            .then(()=>{ // email not founded on db
                // TODO: you can make input email border success; 
            })
            .catch(err=>{   // signup process occurs error

                this.setState({
                    errors:err.response.data.errors,
                    loading:false,
                    success:false
                });

            });

    }


    doSignup=(data)=>{

        api.auth.signup(data)
            .then(()=>{ // signup process on server-side done OK;
                this.setState({loading:false,success:true});
                // show message success, 
                this.setRedirectOn(); // enable redirect timer;
                // redirect page to login;
            })
            .catch(err=>{   // signup process on server-side occurs error

                this.setState({
                    errors:err.response.data.errors,
                    loading:false,
                    success:false
                });

                // show error message

            });

    }


    renderRedirect(){
        // look at setRedirectOn();
        return this.state.redirect ? <Redirect to="/login" />:'';
                 
    }

  render() {
    // --------------variables -------------------
    const {data,loading,errors,success} = this.state;
    // ----------------------------------------

    const serverError = errors.global && <ServerError errors={errors.global} />

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
    (
        <Form onSubmit={this.doSubmit} loading={loading} >
            {errors.email && <InlineError text={errors.email} />}
            <Form.Field error={!!errors.email}>
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@example.com" 
                    value={data.email}
                    onChange={this.onChangeInput}
                    onBlur={this.handleOnBlur}
                />
            </Form.Field>

            {errors.password && <InlineError text={errors.password} />}
            <Form.Field error={!!errors.password}>
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={this.onChangeInput}
                />
            </Form.Field>

            {errors.passwordConf && <InlineError text={errors.passwordConf} />}
            <Form.Field error={!!errors.passwordConf}>
                <label htmlFor="passwordConf">Password confirm</label>
                <input 
                    type="password"
                    id="passwordConf"
                    name="passwordConf"
                    value={data.passwordConf}
                    onChange={this.onChangeInput}
                />
            </Form.Field>

            <Button primary disabled={loading}>sign up</Button>
        </Form>
    );

    return (
      <div>

        {serverError}

        {content}

      </div>
    )
  }

}

SignupForm.propTypes = {


}

SignupForm.contextTypes = {
    router: propTypes.object.isRequired
}


function mapStateToProps(state){

    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps,{})(SignupForm);