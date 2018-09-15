import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import Validator from 'validator';
import {Form,Button} from 'semantic-ui-react';

import {signup} from '../../actions/User';
import InlineError from '../messages/InlineError';
import ServerError from '../messages/ServerError';

class SignupForm extends Component {

    state={
        data:{
            email:'',
            password:''
        },
        loading:false,
        errors:{}
    }

    onChangeInput = e => {

        e.preventDefault();
        this.setState({
            data:{...this.state.data,[e.target.name]:e.target.value}
        });

    }

    onSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate(this.state.data);

        if(errors) this.setState({errors});

        if(Object.keys(errors).length > 0)
            return;

        // validation OK;
        this.setState({loading:true});
        
        this.props.signup(this.state.data)
            .then(()=>this.props.history.push("/dashboard"))
            .catch(err=>
                this.setState({
                    errors:err.response.data.errors,
                    loading:false
                })
            );
            
    }

    validate = (data) => {

        const errors = {};
        
        if(!Validator.isEmail(data.email)) errors.email = "invalid credentials";
        if(!data.password) errors.password = "invalid credentials";

        return errors;

    }


  render() {

    const {data,errors,loading} = this.state;


    return (
      <div>

        {errors.global && <ServerError text={errors.global} />}

        <Form onSubmit={this.onSubmit} loading={loading} >
            {errors.email && <InlineError text={errors.email} />}
            <Form.Field error={!!errors.email}>
                <label htmlFor="email">Email</label>
                <input 
                    type="text"
                    id="email"
                    name="email"
                    placeholder="example@example.com" 
                    value={data.email}
                    onChange={this.onChangeInput}
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

            <Button primary>sign up</Button>
        </Form>
      </div>
    )
  }
}

SignupForm.propTypes={
    history: propTypes.shape({
         push: propTypes.func.isRequired
     }).isRequired,
     signup: propTypes.func.isRequired
 }
 


export default connect(null,{signup})(SignupForm);
