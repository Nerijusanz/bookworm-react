import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';
import Validator from 'validator';
import {Form,Button,Message,MessageContent, MessageHeader} from 'semantic-ui-react';

import ServerError from '../../messages/ServerError';
import InlineError from '../../messages/InlineError';

import api from '../../../api/api';
import {addFlashMessage} from '../../../actions/FlashMessage';


class ForgotPasswordForm extends Component {

    state={    
        data:{
            email:''
        },
        loading:false,
        success:false,
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

        this.setState({loading:true});

        if(!this.validate(this.state.data) ) // validation false
            return; // validation false
        
        // validation OK;
        api.auth.forgotPassword(this.state.data.email)
            .then(()=>{
                this.setState({loading:false,success:true});
                // turn off flash message;
                /* this.props.addFlashMessage({
                    type:'success',
                    message:'Password verification has been sent to your email. Check your email'
                }); */
            })
            .catch(err=>
                this.setState({
                    loading:false,
                    success:false,
                    errors:err.response.data.errors,
                })
            );

    }


    validate = (data) =>{

        const errors={};

        this.setState({errors});

        if(!Validator.isEmail(data.email)) errors.email = 'invalid email';
        
        if(Object.keys(errors).length >0){

            this.setState({
                loading:false,
                success:false,
                errors,
            });
        }
        // return validation error status;
        return (Object.keys(errors).length === 0); // true or false

    }


  render() {
      
    // -------------variables---------------------
    const {errors,data,loading,success} = this.state;
    // -------------------------------------------

    const serverError = errors.global && <ServerError errors={errors.global} />

    // -----------render content-----------------
    const content = success ?
    (
        <Message info>
            <MessageHeader>Password verification has been sent to your email. Check your email</MessageHeader>
            <MessageContent>
                <p><Link to="/login">login</Link></p>
            </MessageContent>
        </Message>
    ):
    (
        <div>
            <h2>Forgot password</h2>

            {errors.global && <ServerError errors={errors.global} />}

            <Form onSubmit={this.onSubmit} loading={loading}>

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

                <Button primary disabled={loading}>reset password</Button>

            </Form>
        </div>
    );
    // ---------------render content end-------------------

    return (
        <div>

            {serverError}

            {content}
        
        </div>
    )
  }
}

ForgotPasswordForm.propTypes={
    addFlashMessage: propTypes.func.isRequired
}


export default connect(null,{addFlashMessage})(ForgotPasswordForm);