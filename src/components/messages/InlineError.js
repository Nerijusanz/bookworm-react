import React from 'react';
import propTypes from 'prop-types';

const InlineError = ({text}) => (
    <div>
        <span style={{color:"#ae5856"}}>{text}</span>
    </div>
);

InlineError.propTypes = {
    text:propTypes.string.isRequired
}


export default InlineError;