import React from 'react';
import propTypes from 'prop-types';

const InlineError = ({text}) => (

    !text ? null : ( 
        <div className="inline-error">
            <span style={{color:"#ae5856"}}>{text}</span>
        </div>)
);

InlineError.propTypes = {
    text:propTypes.string.isRequired
}


export default InlineError;