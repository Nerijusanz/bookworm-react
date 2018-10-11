import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Message } from 'semantic-ui-react';




 class ServerError extends Component {

    render(){

        const errorsList = this.props.errors.map((error,index) =>
        <li key={index}>{error}</li>)
    

        return (
            <div>
                <Message negative>
                    <Message.Header>server errors</Message.Header>
                
                    <ul>
                        {errorsList}
                    </ul>
                </Message>
            </div>
        );
    }


  
 }

ServerError.propTypes = {
    errors: propTypes.array.isRequired  // <ServerError errors={errors.global} />
}

export default ServerError;