import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Vote.css';

function Vote() {
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
    <div className="Vote">
      {ballots.map((b, i) => (
        <>
          <span>{b.politician_url.split('/')[2]}</span>
          <span>{b.ballot}</span>
        </>
      ))}
    </div>
  );
}

export default Vote;
