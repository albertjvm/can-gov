import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./RepsView.css";

import PostalCodeSearch from "../postalCodeSearch/PostalCodeSearch";

function RepsView({ reps, hasReps }) {
  return hasReps ? (
    <div>
      <h2>Your government representatives are:</h2>
      <div className="rep-table">
        <div className="rep-row">
            <span className="rep-title">MP</span>
            <span className="rep-name">{reps.MP.name}</span>
            <span className="rep-email">{reps.MP.email.toLowerCase()}</span>
        </div>

        {reps.MPP &&
            <div className="rep-row">
                <span className="rep-title">MPP</span>
                <span className="rep-name">{reps.MPP.name}</span>
                <span className="rep-email">{reps.MPP.email.toLowerCase()}</span>
            </div>
        }

        { reps.Councillor &&
            <div className="rep-row">
                <span className="rep-title">City Councillor</span>
                <span className="rep-name">{reps.Councillor.name}</span>
                <span className="rep-email">{reps.Councillor.email.toLowerCase()}</span>
            </div>
        }
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
