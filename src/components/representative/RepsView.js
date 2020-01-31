import React from "react";
import { connect } from "react-redux";
import "./RepsView.css";

import PostalCodeSearch from "../postalCodeSearch/PostalCodeSearch";

function RepsView({ reps, hasReps }) {
  return hasReps ? (
    <div>
      <h2>Your government representatives are:</h2>
      {reps.MP && <p>MP: {reps.MP.name}</p>}
      {reps.MPP && <p>MPP: {reps.MPP.name}</p>}
      {reps.Councillor && <p>City Councillor: {reps.Councillor.name}</p>}
    </div>
  ) : (
    <PostalCodeSearch />
  );
}

function mapStateToProps(state) {
  return {
    reps: state.representatives,
    hasReps: Object.keys(state.representatives).length > 0
  };
}

export default connect(mapStateToProps)(RepsView);
