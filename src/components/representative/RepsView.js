import React from "react";
import { connect } from "react-redux";
import "./RepsView.css";

import PostalCodeSearch from "../postalCodeSearch/PostalCodeSearch";

const Rep = ({ title, rep }) => {
    return rep ? (
        <div className="rep-row">
          <span className="rep-title">{title}</span>
          <span className="rep-name">{rep.name}</span>
          <span className="rep-email">{rep.email.toLowerCase()}</span>
        </div>
    ) : null;
}

function RepsView({ reps, hasReps }) {
  return hasReps ? (
    <div>
      <h2>Your government representatives are:</h2>
      <div className="rep-table">
          {Object.keys(reps).map((keyName, i) => (
              <Rep title={keyName} rep={reps[keyName]} key={keyName} />
          ))}
      </div>
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
