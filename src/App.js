import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

import VoteList from './components/vote/VoteList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/votes">
            <VoteList />
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
