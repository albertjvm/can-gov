import React from "react";
import { connect } from "react-redux";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import "./PoliticianList.css";

import PoliticianView from "./PoliticianView";

function PoliticianList({ politicians }) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:politicianId`}>
        <PoliticianView />
      </Route>
      <Route path={match.path}>
        <div className="PoliticianList">
          {politicians &&
            politicians.map((p, i) => (
              <Link to={p.url} key={i}>
                <div className="PoliticianList-row">
                  <span className="PoliticianList-cell f2">{p.name}</span>
                  <span className="PoliticianList-cell">{p.party}</span>
                  <span className="PoliticianList-cell f3">{p.riding}</span>
                  <span className="PoliticianList-cell">{p.province}</span>
                </div>
              </Link>
            ))}
        </div>
      </Route>
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    politicians: state.politicians
  };
}

export default connect(mapStateToProps)(PoliticianList);
