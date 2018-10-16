import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';


import {logout} from '../../../actions/Auth';

import Timezone from './Timezone';


class DashboardPage extends Component {

  componentDidMount(){

    
/*
    api.dashboard.page()
    .then(()=>{

    })
    .catch(()=>{
      // console.log(err.response.data.errors);
      this.props.history.push('/');
      // this.context.router.push('/login')
    })
    */

  }
  

  onlogoutHandler=(logoutToken)=>{

    this.props.logout(logoutToken);

    // this.props.history.push('/');
  }


  render() {

      const {logoutToken} = this.props.auth;

    return (
      <div>

        <h1>DashboardPage</h1>
        <Timezone />
        {<button onClick={()=>this.onlogoutHandler(logoutToken)}>logout</button> }
      </div>
    )
  }
}


DashboardPage.propTypes={
  auth: propTypes.shape({

    logoutToken: propTypes.string.isRequired,

  }).isRequired,
  logout: propTypes.func.isRequired,

}

DashboardPage.contextTypes = {
  router: propTypes.object.isRequired
}

function mapStateToProps(state){

  return {
      auth: state.auth
  }
}


export default connect(mapStateToProps,{logout})(DashboardPage);
