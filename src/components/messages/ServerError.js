import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import ServerErrorItem from './ServerErrorItem';




 class ServerError extends Component {

    render(){

        // usage example: <ServerError errors={serverErrors.global} />

        const errorsItems = this.props.errors.map((error,index) => 
            <ServerErrorItem key={index} error={error} />
        );

        const errorsList = <ul>{errorsItems}</ul>;
        
        return (
            <div>
                <Message negative>
                    <Message.Header>server errors</Message.Header>
                        {errorsList}
                </Message>
            </div>
        );
    }


}

ServerError.propTypes = {
    errors: propTypes.array.isRequired  // <ServerError errors={errors.global} />
}

export default ServerError;