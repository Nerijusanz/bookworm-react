import React, { Component } from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import {Link} from 'react-router-dom';
import Validator from 'validator';
import {Form,Button,Message,MessageContent, MessageHeader} from 'semantic-ui-react';


import ServerError from '../../messages/ServerError';
import InlineError from '../../messages/InlineError';

import api from '../../../api/api';
import {addFlashMessage} from '../../../actions/FlashMessage';


class ResetPasswordForm extends Component {

    state={    
        data:{
            token:this.props.token, // <ResetPasswordForm token={tokencode} />
            password:'',
            passwordConfirm:'',
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

        if(!this.validate(this.state.data)) // validation false
            return; // validation false

        // reorganize state.data; Do not need passwordConf send to server;
        const {token,password} = this.state.data;

        const data={
            token,
            password
        };

        api.auth.resetPassword(data)
            .then(()=>{ // reset password successfully done on server
                this.setState({loading:false,success:true});
                
                /* this.props.addFlashMessage({
                    type:'success',
                    message:'Password has been reset successfully'
                }); */
            })
            .catch(err=>    // reset password occurs error on server
                this.setState({
                    loading:false,
                    success:false,
                    errors:err.response.data.errors
                })

            );

    }


    validate = (data) =>{
        
        const errors={};

        this.setState({errors});
        
        if(data.password.length < 5) errors.password = "password must consist min 5 simbols";
        if(!Validator.equals(data.password,data.passwordConfirm))
            errors.passwordConfirm = 'pasword isn`t match';
        
        
        if(Object.keys(errors).length > 0){
            
            this.setState({      
                loading:false,
                success:false,
                errors
            })
        }
    
        // validation error status;
        return (Object.keys(errors).length === 0); // true or false
        
    }

  render(){

    const {data,errors,loading,success} = this.state;

    const serverError = errors.global && <ServerError errors={errors.global} />


    const content = success ?
    (
        <Message info>
            <MessageHeader>Password has been reset successfully</MessageHeader>
            <MessageContent>
                <p>go to <Link to="/login">login</Link></p>
            </MessageContent>
        </Message>
    ):
    (
        <div>
            <h2>Reset password</h2>

            {errors.global && <ServerError errors={errors.global} />}

            <Form onSubmit={this.onSubmit} loading={loading}>

                {errors.password && <InlineError text={errors.password} />}
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">enter new password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password"  
                        value={data.password}
                        onChange={this.onChangeInput}
                    />
                </Form.Field>

                {errors.passwordConfirm && <InlineError text={errors.passwordConfirm} />}
                <Form.Field error={!!errors.passwordConfirm}>
                    <label htmlFor="passwordConfirm">confirm new password</label>
                    <input 
                        type="password" 
                        id="passwordConfirm" 
                        name="passwordConfirm"  
                        value={data.passwordConfirm}
                        onChange={this.onChangeInput}
                    />
                </Form.Field>

                <Button primary disabled={loading}>save password</Button>

            </Form>
        </div>
    );

    return (
        <div>

            {serverError}

            {content}
            
        </div>
    )
  }
}

ResetPasswordForm.propTypes={

    token: propTypes.string.isRequired,
    addFlashMessage: propTypes.func.isRequired
}


export default connect(null,{addFlashMessage})(ResetPasswordForm);
