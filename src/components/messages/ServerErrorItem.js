import React from 'react';
import propTypes from 'prop-types';



const ServerErrorItem = ({key,error}) => (
    <li key={key}>{error}</li>
);


ServerErrorItem.propTypes = {
    key: propTypes.number.isRequired,
    error: propTypes.string.isRequired
}

export default ServerErrorItem;
