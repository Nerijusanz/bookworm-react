import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import AppRoute from './routes/AppRoute';
import FlashMessage from './components/messages/flash/FlashMessage';



class App extends Component {


  render() {

    return (
    <div className="ui container">
      <FlashMessage />
      <Route component={AppRoute} />
    </div>
    )
  }
}

export default App;