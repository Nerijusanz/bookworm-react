import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';

class DashboardPage extends Component {

    state={}

  render() {
    return (
      <div>
          <h1>DashboardPage</h1>
        {!this.props.isConfirmed && <ConfirmEmailMessage />}
      </div>
    )
  }
}

DashboardPage.propTypes={
    isConfirmed: propTypes.bool.isRequired
}

function mapStateToProps(state){
    return{
        isConfirmed:!!state.user.confirmed
    }
}

export default connect(mapStateToProps)(DashboardPage);
