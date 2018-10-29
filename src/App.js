import React from 'react';
import {Route} from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import AppRoute from './routes/AppRoute';
import FlashMessage from './components/messages/flash/FlashMessage';


const App = () => (
  <div>
    <Navigation/>
    <div className="ui container">
      <FlashMessage/>
      <Route component={AppRoute} />
    </div>
  </div>
)
export default App;