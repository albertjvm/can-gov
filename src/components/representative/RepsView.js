import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./RepsView.css";

import PostalCodeSearch from "../postalCodeSearch/PostalCodeSearch";

const Rep = ({ title, rep }) => {
    return (
        <div className="rep-row">
            <span className="rep-title">{title}</span>
            {rep
            ? <>
                <span className="rep-name">{rep.name}</span>
                <span className="rep-email">{rep.email.toLowerCase()}</span>
            </>
            : <span>not found</span>}
        </div>
    );
}

function RepsView({ reps, hasReps }) {
  return hasReps ? (
    <div>
      <h2>Your government representatives are:</h2>
      <div className="rep-table">
          {Object.keys(reps).map((keyName, i) => (
              <Rep title={keyName} rep={reps[keyName]} />
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
