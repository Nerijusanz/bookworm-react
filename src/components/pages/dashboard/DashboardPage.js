import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import Timezone from './Timezone';

import {BooksLink} from './books/BooksLink';

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

        <Timezone />
        <BooksLink/>
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
