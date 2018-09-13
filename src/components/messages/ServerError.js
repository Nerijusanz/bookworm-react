import React from 'react';
import propTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

const ServerError = ({text}) => (

    <Message negative>
        <Message.Header>server error occurs</Message.Header>
        <p>{text}</p>
    </Message>
  
)

ServerError.propTypes = {
    text: propTypes.string.isRequired
}

export default ServerError;