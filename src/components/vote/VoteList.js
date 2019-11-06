import React, { useEffect, useState } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import './VoteList.css';

import BallotList from '../ballot/BallotList';

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
        setVotes(response.objects)
      });
  }, [page]);

  return (
    <Switch>
      <Route path ={`${match.path}/:session/:voteId`}>
        <BallotList />
      </Route>
      <Route path={match.path}>
        <div className="VoteList">
          { votes.map((v, i) => (
            <Link to={`/votes/${v.session}/${v.number}`} key={i}>
              <div className="VoteList-row">
                <span className="VoteList-cell">#{v.number}</span>
                <span className="VoteList-cell">{v.date}</span>
                <span className="VoteList-cell f3" title={v.description.en}>{v.description.en}</span>
                <span className="VoteList-cell">{v.result}</span>
                <span className="VoteList-cell">Y: {v.yea_total} N: {v.nay_total}</span>
              </div>
            </Link>
          ))}
        </div>
        <button onClick={() => {setPage(Math.max(1, page - 1))}}>Prev Page</button>
        <button onClick={() => {setPage(page + 1)}}>Next Page</button>
      </Route>
    </Switch>
  );
}

export default VoteList;
