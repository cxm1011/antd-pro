import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import {PersonalCenter} from 'page';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={PersonalCenter} />
        <Route exact path='/home' component={PersonalCenter} />
      </Switch>
    </div>
  </Router>)

export default App;
