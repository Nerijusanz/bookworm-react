import React, { Component } from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import Validator from 'validator';
import {Form,Button} from 'semantic-ui-react';

import {resetPassword} from '../../../actions/Auth';
import ServerError from '../../messages/ServerError';
import InlineError from '../../messages/InlineError';


// import {addFlashMessage} from '../../../actions/FlashMessage';


class ResetPasswordForm extends Component {

    state={    
        data:{
            token:this.props.token, // <ResetPasswordForm token={tokencode} />
            password:'',
            passwordConfirm:'',
        },
        validationErrors:{}
    }

    onChangeHandler = e => {

        e.preventDefault();

        this.setState({
            data:{ ...this.state.data,[e.target.name]:e.target.value}
        });

    };

    onSubmitHandler = e => {

        e.preventDefault();

        if(!this.dataValidation(this.state.data)) return;

        this.props.resetPassword(this.state.data);

    }


    dataValidation = (data) =>{
        
        const validationErrors={};

        this.setState({validationErrors});
        
        if(data.password.length < 5) validationErrors.password = "password must consist min 5 simbols";
        if(!Validator.equals(data.password,data.passwordConfirm))
            validationErrors.passwordConfirm = 'pasword isn`t match';
        
        
        if(Object.keys(validationErrors).length > 0)
            this.setState({      
                validationErrors
            });
        
    
        // validation error status;
        return (Object.keys(validationErrors).length === 0); // true or false
        
    }

  render(){

    // ---------------------state variables-------------------------------
    const {validationErrors,data} = this.state;
    const {loading} = this.props.auth; // redux: auth reducer
    // -------------------------------------------------------------------

    const content =

            <Form onSubmit={this.onSubmitHandler} loading={loading}>

                {validationErrors.password && <InlineError text={validationErrors.password} />}
                <Form.Field error={!!validationErrors.password}>
                    <label htmlFor="password">enter new password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password"  
                        value={data.password}
                        onChange={this.onChangeHandler}
                    />
                </Form.Field>

                {validationErrors.passwordConfirm && <InlineError text={validationErrors.passwordConfirm} />}
                <Form.Field error={!!validationErrors.passwordConfirm}>
                    <label htmlFor="passwordConfirm">confirm new password</label>
                    <input 
                        type="password" 
                        id="passwordConfirm" 
                        name="passwordConfirm"  
                        value={data.passwordConfirm}
                        onChange={this.onChangeHandler}
                    />
                </Form.Field>

                <Button primary disabled={loading}>save password</Button>

            </Form>


    return (
        <div>

            {content}
            
        </div>
    )
  }
}

ResetPasswordForm.propTypes = {
    token: propTypes.string.isRequired,
    auth: propTypes.shape({
        loading: propTypes.bool.isRequired,
        serverErrors: propTypes.shape({
            global: propTypes.arr,
        }).isRequired
    }).isRequired,
    resetPassword: propTypes.func.isRequired,


}


function mapStateToProps(state){

    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps,{resetPassword})(ResetPasswordForm);
