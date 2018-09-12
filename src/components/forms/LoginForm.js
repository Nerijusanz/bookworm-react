import React, { Component } from 'react';
import propTypes from 'prop-types';
import Validator from 'validator';
import { Form, Button } from 'semantic-ui-react';

import InlineError from '../messages/InlineError';

class LoginForm extends Component {
 
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
            data:{ ...this.state.data,[e.target.name]:e.target.value}
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const errors = this.validate(this.state.data);

        if(errors) this.setState({errors});

        if(Object.keys(errors).length > 0)
            return;

            this.props.submit(this.state.data);

        

    }


    validate = (data) =>{

        const errors={};
        if(!Validator.isEmail(data.email)) errors.email = 'invalid email';
        if(!data.password) errors.password = 'password is empty'

        return errors;
    }


  render() {

    const {errors,data} = this.state;

    return (
        <Form onSubmit={this.onSubmit}>
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
    )
  }
}

LoginForm.propTypes = {

    submit:propTypes.func.isRequired 
}

export default LoginForm;