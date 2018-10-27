import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import Timezone from './Timezone';
import TopDashboardNavigation from './TopDashboardNavigation';

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
  
  render() {

    return (
      <div>
        <TopDashboardNavigation/>
        <Timezone />
      </div>
    )
  }
}


DashboardPage.propTypes={
  auth: propTypes.shape({

    logoutToken: propTypes.string.isRequired,

  }).isRequired,


}

DashboardPage.contextTypes = {
  router: propTypes.object.isRequired
}

function mapStateToProps(state){

  return {
      auth: state.auth
  }
}


export default connect(mapStateToProps,{})(DashboardPage);
