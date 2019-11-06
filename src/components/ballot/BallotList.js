import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BallotList.css';
import BallotRow from './BallotRow';

function BallotList() {
  const { session, voteId } = useParams();
  const [ballots, setBallots] = useState([]);

  useEffect(() => {
    fetch(`https://api.openparliament.ca/votes/ballots/?vote=/votes/${session}/${voteId}&limit=338`, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        setBallots(response.objects)
      });
  }, [session, voteId]);

  return (
    <div className="BallotList">
      {ballots.map((b, i) => (
        <BallotRow ballot={b} key={i} />
      ))}
    </div>
  );
}

export default BallotList;
