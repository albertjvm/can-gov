import React from 'react';
import { connect } from 'react-redux';

function BallotRow({ ballot, politician }) {
  return (
    <div className="BallotList-row">
      <span>{ politician ? politician.name : ''}</span>
      <span>{ballot.ballot}</span>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    politician: state.politicians.find(p => p.url === ownProps.ballot.politician_url),
  };
}

export default connect(mapStateToProps)(BallotRow);
