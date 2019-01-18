import React from 'react';
import propTypes from 'prop-types';


const ServerErrorItem = ({item}) => <li>{item}</li>


ServerErrorItem.propTypes = {

    item: propTypes.string.isRequired
}

export default ServerErrorItem;
