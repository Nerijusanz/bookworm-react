import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import Validator from 'validator';
import { Form,Button } from 'semantic-ui-react';

import {forgotPassword} from '../../../actions/Auth';
import ServerError from '../../messages/ServerError';
import InlineError from '../../messages/InlineError';


import {addFlashMessage} from '../../../actions/FlashMessage';


class ForgotPasswordForm extends Component {

    state={    
        data:{
            email:''
        },
        validationErrors:{}
    }

    onChangeHandler = e => {

        e.preventDefault();

        this.setState({
            data:{ ...this.state.data,[e.target.name]:e.target.value}
        });

    }

    onSubmitHandler = e => {

        e.preventDefault();

        if(!this.dataValidation(this.state.data)) return;
        
        // validation OK;
        this.props.forgotPassword(this.state.data.email);

    }


    dataValidation = (data) =>{

        const validationErrors={};

        this.setState({validationErrors});

        if(!Validator.isEmail(data.email)) validationErrors.email = 'invalid email';
        
        if(Object.keys(validationErrors).length > 0)
            this.setState({
                validationErrors
            });
        
        // return validation error status;
        return (Object.keys(validationErrors).length === 0); // true or false

    }


  render() {
      
    // ---------------------state variables-------------------------------
    const {validationErrors,data} = this.state;
    const {serverErrors,loading} = this.props.auth; // redux: auth reducer
    // -------------------------------------------------------------------

    const serverError = serverErrors.global && <ServerError errors={serverErrors.global} />

    // -----------render content-----------------
    const content =
            <Form onSubmit={this.onSubmitHandler} loading={loading}>

                {validationErrors.email && <InlineError text={validationErrors.email} />}
                {serverErrors.email && <InlineError text={serverErrors.email} />}
                <Form.Field error={!!validationErrors.email || !!serverErrors.email}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        id="email" 
                        name="email" 
                        placeholder="example@example.com" 
                        value={data.email}
                        onChange={this.onChangeHandler}
                    />
                </Form.Field>

                <Button primary disabled={loading}>reset password</Button>

            </Form>

    return (
        <div>

            {serverError}

            {content}
        
        </div>
    )
  }
}

ForgotPasswordForm.propTypes={
    auth: propTypes.shape({
        loading: propTypes.bool.isRequired,
        serverErrors: propTypes.shape({
            global: propTypes.arr,
            email:  propTypes.string
        }).isRequired
    }).isRequired,
    forgotPassword: propTypes.func.isRequired,
    addFlashMessage: propTypes.func.isRequired
}

function  mapStateToProps(state){

    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps,{forgotPassword,addFlashMessage})(ForgotPasswordForm);