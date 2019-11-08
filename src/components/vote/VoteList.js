import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import './VoteList.css';

import BallotList from '../ballot/BallotList';
import VoteRow from './VoteRow';

function VoteList() {
  const match = useRouteMatch();
  const [page, setPage] = useState(1);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    fetch(`https://api.openparliament.ca/votes/?limit=50&offset=${(page - 1) * 50}`, {
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        setVotes(response.objects);
      });
  }, [page]);

  return (
    <Switch>
      <Route path={`${match.path}/:session/:voteId`}>
        <BallotList />
      </Route>
      <Route path={match.path}>
        <div className="VoteList">
          { votes.map((v, i) => (
            <VoteRow vote={v} key={i} />
          ))}
        </div>
        <button onClick={() => {setPage(Math.max(1, page - 1))}}>Prev Page</button>
        <button onClick={() => {setPage(page + 1)}}>Next Page</button>
      </Route>
    </Switch>
  );
}

export default VoteList;
