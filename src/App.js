import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";

import VoteList from "./components/vote/VoteList";
import PoliticianList from "./components/politician/PoliticianList";
import Header from "./components/header/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/votes">
            <VoteList />
          </Route>
          <Route path="/politicians">
            <PoliticianList />
          </Route>
          <Route path="/">
            <Redirect to="/politicians" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
