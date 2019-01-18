import React from 'react';
import propTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import ServerErrorItem from './ServerErrorItem';


const errorsItems = (itemsArr) => {

    const items = itemsArr.map((item,index) => <ServerErrorItem key={index} item={item} />)
     
    return items;
}


const ServerError = ({errors}) => (

    !errors.global ? null : (
        <div className="sever-errors">
            <Message negative>
                <ul>
                    {errorsItems(errors.global)}
                </ul>
            </Message>
        </div>
    )
);

ServerError.propTypes = {
    errors: propTypes.shape({
        global: propTypes.arr
    }).isRequired
}

export default ServerError;