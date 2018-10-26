import React from 'react';

import {Route} from 'react-router-dom';

import AppRoute from './routes/AppRoute';
import FlashMessage from './components/messages/flash/FlashMessage';



const App = () => (
  <div className="ui container">
    <FlashMessage />
    <Route component={AppRoute} />
  </div>
);

export default App;