import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

import Votes from './votes/Votes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/votes">
            <Votes />
          </Route>
          <Route path="/">
            <Redirect to="/votes" />
          </Route>
        </Switch>    
      </div>
    </Router>
  );
}

export default App;
