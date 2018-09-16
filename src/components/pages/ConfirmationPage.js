import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Message,Icon} from 'semantic-ui-react';

import {confirm} from '../../actions/Auth';

 class ConfirmationPage extends Component {

    state={
        loading:true,
        success:false
    }

    componentDidMount(){
        this.props.confirm(this.props.match.params.token)
            .then(()=>this.setState({loading:false,success:true}))
            .catch(()=>this.setState({loading:false,success:false}));
    }

  render() {

    const {loading,success} = this.state;

    return (
      <div>
        {loading &&
            <Message icon>
                <Icon name="circle notched" loading />
                <Message.Header>Validating your email</Message.Header>
            </Message>
        }

        {success && 
            <Message success icon>
                <Icon name="checkmark" />
                <Message.Content>
                <Message.Header>Your account been verified</Message.Header>
                <Link to="/dashboard">dashboard</Link>
                </Message.Content>
            </Message>
        }
      </div>
    )
  }
}

ConfirmationPage.propTypes={
    confirm: propTypes.func.isRequired,
    match:propTypes.shape({
        params:propTypes.shape({
            token:propTypes.string.isRequired
        }).isRequired
    }).isRequired
}

export default connect(null,{confirm})(ConfirmationPage);