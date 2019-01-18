import React from 'react';
import propTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import ServerErrorItem from './ServerErrorItem';


const errorsItems = (errors) => {

    const items = errors.map((item,index) => <ServerErrorItem key={index} item={item} />)
     
    return items;
}


const ServerError = ({errors}) => (

    <div className="sever-errors">
        <Message negative>
            <ul>
                {errorsItems(errors)}
            </ul>
        </Message>
    </div>
    
);

ServerError.propTypes = {
    errors: propTypes.array.isRequired,
}

export default ServerError;