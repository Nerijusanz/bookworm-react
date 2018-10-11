import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import api from '../../../api/api';
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
  

  onlogout=()=>{
    this.props.logout();
    this.props.history.push('/');
    
  }



  render() {

    return (
      <div>

        <h1>DashboardPage</h1>
        <Timezone />
        {<button onClick={()=>this.onlogout()}>logout</button> }
      </div>
    )
  }
}

DashboardPage.propTypes={
  
  logout: propTypes.func.isRequired,

}

DashboardPage.contextTypes = {
  router: propTypes.object.isRequired
}



export default connect(null,{logout})(DashboardPage);
