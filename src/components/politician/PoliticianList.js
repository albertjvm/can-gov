import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import "./PoliticianList.css";

import PoliticianView from "./PoliticianView";
import FilterInput from "../filterInput/FilterInput";

function PoliticianList({ politicians }) {
  const match = useRouteMatch();
  const [sortField, setSortField] = useState('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [filterString, setFilterString] = useState('');

  const sortedData = () => (
    filteredData().sort((a , b) => a[sortField].localeCompare(b[sortField]) * (sortAsc ? 1 : -1))
  );

  const filteredData = () => (
    politicians.filter(p => {
      return new RegExp(
        filterString,
        "i"
      ).test([p.name, p.party, p.riding, p.province].join('|'))
    })
  );

  const handleHeaderClick = (field) => {
    if (field === sortField) {
      setSortAsc(!sortAsc);
    } else {
      setSortAsc(true);
      setSortField(field);
    }
  };

  return (
    <Switch>
      <Route path={`${match.path}/:politicianId`}>
        <PoliticianView />
      </Route>
      <Route path={match.path}>
        <div className="PoliticianList">
          <FilterInput 
            filterString={filterString}
            setFilterString={setFilterString}
          />
          <div className="PoliticianList-header">
            <span className="PoliticianList-cell f2" onClick={() => handleHeaderClick('name')}>Name</span>
            <span className="PoliticianList-cell" onClick={() => handleHeaderClick('party')}>Party</span>
            <span className="PoliticianList-cell f3" onClick={() => handleHeaderClick('riding')}>Riding</span>
            <span className="PoliticianList-cell" onClick={() => handleHeaderClick('province')}>Province</span>
          </div>
          {politicians &&
            sortedData().map((p, i) => (
              <Link to={p.url} key={i}>
                <div className={`PoliticianList-row ${p.party.toLowerCase()}`}>
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
