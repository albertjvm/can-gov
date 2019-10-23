import React, { useEffect, useState } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import './Votes.css';

function Votes() {
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
      <Route path ={`${match.path}/:voteId`}>
        
      </Route>
      <Route path={match.path}>
        <table className="Votes">
          { votes.map(v => (
            <Link to={`/votes/${v.number}`}>
              <tr className="Votes-row">
                <td className="Votes-cell">#{v.number}</td>
                <td className="Votes-cell">{v.date}</td>
                <td className="Votes-cell f3" title={v.description.en}>{v.description.en}</td>
                <td className="Votes-cell">{v.result}</td>
                <td className="Votes-cell">Y: {v.yea_total} N: {v.nay_total}</td>
              </tr>
            </Link>
          ))}
          <button onClick={() => {setPage(Math.max(1, page - 1))}}>Prev Page</button>
          <button onClick={() => {setPage(page + 1)}}>Next Page</button>
        </table>
      </Route>
    </Switch>
  );
}

export default Votes;
