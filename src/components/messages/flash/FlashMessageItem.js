import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';

import {deleteFlashMessage} from '../../../actions/FlashMessage';

class FlashMessageItem extends Component {

  constructor(props){
    super(props);

    this.deleteFlashMessage = this.deleteFlashMessage.bind(this);
  }

  deleteFlashMessage=()=>{

    this.props.deleteFlashMessage(this.props.message.id);

  }

  render() {

    return (
      
      <div className={classnames('ui','message',
      {
          'success': this.props.message.type === 'success',
          'negative': this.props.message.type === 'error'
      }
      )}>
        <i className="close icon"
          onClick={this.deleteFlashMessage}></i>
        <div className="header">
            {this.props.message.message}
        </div>
      </div>
      
    )
  }
}

FlashMessageItem.propTypes={
  deleteFlashMessage: propTypes.func.isRequired,
  message: propTypes.shape({
    id: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    message: propTypes.string.isRequired
  }).isRequired
}


export default connect(null,{deleteFlashMessage})(FlashMessageItem);
