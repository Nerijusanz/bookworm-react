import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import Validator from 'validator';
import { Form, Button } from 'semantic-ui-react';

import {login} from '../../actions/Auth';
import ServerError from '../messages/ServerError';
import InlineError from '../messages/InlineError';


class LoginForm extends Component {


    state={
        data:{
            email:'',
            password:''
        },
        loading:false,
        errors:{},
        redirect:false
    }

    onChangeInput = e => {
        e.preventDefault();
        this.setState({
            data:{ ...this.state.data,[e.target.name]:e.target.value}
        });
    };

    onSubmit = e => {
        e.preventDefault();

        
        const errors = this.validate(this.state.data);

        if(errors) this.setState({errors});

        if(Object.keys(this.state.errors).length > 0)
            return;

        // validation OK;

        this.setState({loading:true});

        this.props.login(this.state.data)
        .then(()=>this.props.history.push("/dashboard"))
        .catch(err=>
            this.setState({
                errors:err.response.data.errors,
                loading:false
            })
        );

    }


    validate = (data) =>{

        const errors={};
        if(!Validator.isEmail(data.email)) errors.email = 'invalid email';
        if(!data.password) errors.password = 'password is required'

        return errors;
    }


  render() {

    const {errors,data,loading} = this.state;

    return (

        <div>
            {errors.global && <ServerError text={errors.global} />}

            <Form onSubmit={this.onSubmit} loading={loading}>

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

                <Button primary>login</Button>

            </Form>
        </div>
    )
  }
}

LoginForm.propTypes = {

    login: propTypes.func.isRequired,
    history: propTypes.shape({
        push: propTypes.func.isRequired
      }).isRequired
    
}


export default connect(null,{login})(LoginForm);