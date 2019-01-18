import React from 'react';
import propTypes from 'prop-types';

const InlineError = ({error}) => (

    <div className="inline-error" style={{color:"#ae5856"}} >
        {error}
    </div>
);

InlineError.propTypes = {
    error: propTypes.string.isRequired
}


export default InlineError;