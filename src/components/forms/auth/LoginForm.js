import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Validator from 'validator';

import { Form,Button} from 'semantic-ui-react';

import {login} from '../../../actions/Auth';

import ServerError from '../../messages/ServerError';
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

        e.preventDefault();

        this.setState({
            data:{ ...this.state.data,[e.target.name]:e.target.value}
        });

    };

    
    onSubmitHandler = (e) => {

        e.preventDefault();
        
        if(!this.dataValidation(this.state.data)) return; // if validation got error stop login process
        
        // validation OK;
        
        this.props.login(this.state.data,this.context);

    }


    dataValidation = (data) =>{

        const validationErrors={};

        this.setState({validationErrors});  // set validation errors state emty obj;

        if(!Validator.isEmail(data.email)) validationErrors.email = 'invalid email';
        if(!data.password) validationErrors.password = 'password is required';

        // make check if validation errors have any error 
        if(Object.keys(validationErrors).length > 0)
            this.setState({
                validationErrors
            });
        
    
        // return validation error status;
        return (Object.keys(validationErrors).length === 0); // true or false;

    }


  render() {
    // ---------------------state variables-------------------------------
    const {validationErrors,data} = this.state;
    const {serverErrors,loading} = this.props.auth; // redux: auth reducer
    // -------------------------------------------------------------------

    const serverErrorContent = serverErrors.global && <ServerError errors={serverErrors.global} />

    const content =
        <Form onSubmit={this.onSubmitHandler} loading={loading}>

            {validationErrors.email && <InlineError text={validationErrors.email} />}
            <Form.Field error={!!validationErrors.email}>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="example@example.com" 
                    value={data.email}
                    onChange={this.onChangeHandler}
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
                    onChange={this.onChangeHandler}
                />
            </Form.Field>

            <Button primary disabled={loading}>login</Button>
            <div>
                <p><Link to="/forgot_password">forgot password</Link></p>
                <p><Link to="/signup">sign up</Link></p>
            </div>


        </Form>

    return (

        <div>

            {serverErrorContent}

            {content}

        </div>
    )
  }
}

LoginForm.propTypes = {

    login: propTypes.func.isRequired,
    auth: propTypes.shape({
        loading: propTypes.bool.isRequired,
        serverErrors: propTypes.shape({
            global: propTypes.arr
        }).isRequired
    }).isRequired

}

LoginForm.contextTypes = {
    router: propTypes.object.isRequired
}


function  mapStateToProps(state){

    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps,{login})(LoginForm);