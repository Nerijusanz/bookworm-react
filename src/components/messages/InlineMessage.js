import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Message,MessageContent,MessageHeader,Icon } from 'semantic-ui-react';




class InlineMessage extends Component {

    state={}

  render() {

    // ------------------props variables -----------------
    const {msgType,headerText,contentText} = this.props;
    // --------------------------------------------------
    const msgLoad = (msgType === 'load') &&
        <Message icon>
            <Icon name="circle notched" loading />
            <MessageContent>
                <MessageHeader>{headerText}</MessageHeader>
                <p>{contentText}</p>
            </MessageContent>
        </Message>

    const msgInfo = (msgType === 'info') &&
        <Message info>
            <MessageContent>
                <MessageHeader>{headerText}</MessageHeader>
                <p>{contentText}</p>
            </MessageContent>
        </Message>

    const msgError = (msgType === 'error') &&
        <Message negative> 
            <MessageContent>
                <MessageHeader>{headerText}</MessageHeader>
                <p>{contentText}</p>
            </MessageContent>
        </Message>

    const msgSuccess = (msgType === 'success') &&
        <Message success> 
            <MessageContent>
                <MessageHeader>{headerText}</MessageHeader>
                <p>{contentText}</p>
            </MessageContent>
        </Message>

    return (
        <div>
            {msgLoad}
            {msgInfo}
            {msgError}
            {msgSuccess}
        </div>
    )
  }
}

InlineMessage.propTypes={
    msgType: propTypes.string.isRequired,
    headerText: propTypes.string.isRequired,
    contentText: propTypes.string.isRequired
}

export default InlineMessage;