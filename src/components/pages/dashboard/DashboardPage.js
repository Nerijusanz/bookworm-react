import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import Timezone from './Timezone';

import {BooksLink} from './books/BooksLink';

class DashboardPage extends Component {
  
  render() {

    return (
      <React.Fragment>
        <Timezone />
        <BooksLink/>
      </React.Fragment>
    )
  }
}


DashboardPage.propTypes={}


export default connect(null,{})(DashboardPage);