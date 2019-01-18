import React from 'react';
import propTypes from 'prop-types';


const ServerErrorItem = ({key,item}) => 
    <li key={key}>{item}</li>


ServerErrorItem.propTypes = {
    key: propTypes.string.isRequired,
    item: propTypes.string.isRequired
}

export default ServerErrorItem;
