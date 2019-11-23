import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import "./PoliticianView.css";

function PoliticianView({ politician }) {
  return politician ? (
    <div>
      <h1>{politician.name}</h1>
      <h2>
        {politician.party} MP from {politician.riding}, {politician.province}
      </h2>
      <img
        alt={politician.name}
        src={`https://api.openparliament.ca/${politician.image}`}
      />
    </div>
  ) : null;
}

function mapStateToProps(state, ownProps) {
  const { politicianId } = ownProps.match.params;
  return {
    politician: state.politicians.find(p => p.id === politicianId)
  };
}

export default withRouter(connect(mapStateToProps)(PoliticianView));
