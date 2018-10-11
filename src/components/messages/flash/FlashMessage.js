import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';


import FlashMessageItem from './FlashMessageItem';

class FlashMessage extends Component {

    state={}

  render() {

    const flashMessage = this.props.flashMessage.messages.map(message =>
        <FlashMessageItem key={message.id} message={message} />
    )

    return (
        <div>
            {flashMessage}
        </div>
    )
  }
}

FlashMessage.propTypes={
    flashMessage: propTypes.shape({
        messages: propTypes.array.isRequired
    }).isRequired,
}

function mapStateToProps(state){
    return{
        flashMessage: state.flashMessage
    }
}

export default connect(mapStateToProps,{})(FlashMessage);


