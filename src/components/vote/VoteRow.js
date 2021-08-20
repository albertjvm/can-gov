import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestBill } from '../../actions';

function VoteRow({ vote, bill, requestBill }) {
  return (
    <div className={`VoteList-row ${vote.result.toLowerCase()}`}>
      <span className="VoteList-cell">#{vote.number}</span>
      <span className="VoteList-cell">{vote.date}</span>
      <div className="VoteList-cell description" title={vote.description.en}>{vote.description.en}</div>
      <span className="VoteList-cell">{vote.result}</span>
      <span className="VoteList-cell">{vote.bill_url ? vote.bill_url.split('/')[3] : ''}</span>
      <span className="VoteList-cell">
        <Link to={`/votes/${vote.session}/${vote.number}`}>
          Y: { vote.yea_total} N: {vote.nay_total}
        </Link>
      </span>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    bill: state.bills.find(b => b.url === ownProps.vote.bill_url),
  };
}

export default connect(mapStateToProps, {
  requestBill,
})(VoteRow);
