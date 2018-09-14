import React from 'react';
import {Route} from 'react-router-dom';
import MainRoute from './routes/MainRoute';


const App = () => (
  <div className="ui container">
    <Route component={MainRoute} />
  </div>
);

export default App;
