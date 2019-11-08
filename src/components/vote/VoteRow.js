import React, { 
  // useEffect,
} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestBill } from '../../actions';

function VoteRow({ vote, bill, requestBill }) {

  // useEffect(() => {
  //   if (vote.bill_url) {
  //     requestBill(vote.bill_url);
  //   }
  // }, [vote.bill_url, requestBill]);

  return (
    <div className="VoteList-row">
      <span className="VoteList-cell">#{vote.number}</span>
      <span className="VoteList-cell">{vote.date}</span>
      <span className="VoteList-cell f3" title={vote.description.en}>{vote.description.en}</span>
      <span className="VoteList-cell">{vote.result}</span>
      <span className="VoteList-cell" 
        onClick={() => vote.bill_url && requestBill(vote.bill_url)}
      >
        {vote.bill_url ? 
          bill ? <a href={bill.text_url} target="_blank" rel="noopener noreferrer">{bill.number}</a> : 'load bill'
        : '-'}
      </span>
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
