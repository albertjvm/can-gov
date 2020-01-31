import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./RepsView.css";

import PostalCodeSearch from "../postalCodeSearch/PostalCodeSearch";

function RepsView({ reps, hasReps }) {
  return hasReps ? (
    <div>
      <h2>Your government representatives are:</h2>
      {reps.MP && (
        <p>
          MP:{" "}
          <Link
            to={`/politicians/${reps.MP.name.toLowerCase().replace(" ", "-")}`}
          >
            {reps.MP.name}
          </Link>
        </p>
      )}
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
