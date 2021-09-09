import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Vote.scss';
import { getVote, getBallots, getPoliticians } from '../../api';
import { Icon } from '../../components';

export const Vote = () => {
    const { number, session } = useParams();
    const [ vote, setVote ] = useState();
    const [ party, setParty ] = useState();
    const [ ballots, setBallots ] = useState([]);

    useEffect(() => {
        getVote({number, session}).then(setVote);
        getPoliticians().then(mps => {
            getBallots({number, session}).then(ballots => {
                setBallots(ballots.map(({ballot, politician_url}) => ({
                    ballot,
                    politician: mps.find(mp => mp.url === politician_url)
                })))
            });
        });
    }, [number, session]);

    const filteredBallots = () => (
        party ? ballots.filter(({ politician }) => (
            politician?.party === party
        )) : ballots
    );

    const handleClickParty = (clicked) => {
        setParty(clicked === party ? null : clicked);
    };

    if (!vote) return 'Loading...';

    return (
        <section className="Vote">
            <h2>Party Votes</h2>
            { vote.party_votes.map(({party, vote, disagreement}) => (
                <div
                    className={`Vote--partyvote ${party.toLowerCase()}`}
                    key={party}
                    onClick={() => handleClickParty(party)}
                >
                    <Icon name={vote === "Yes" ? 'check-circle' : 'times-circle'} title={vote} />
                    <span className="Vote--partyvote--party">{party}</span>
                    {disagreement > 0 && <span>({100 - Math.round(disagreement * 100)}%)</span>}
                </div>
            ))}
            <div className="Vote--description">{vote.description}</div>
            <h2>Ballots</h2>
            <div className="Vote--ballotlist">
                {filteredBallots().map(({ballot, politician}) => (
                    <div
                        className={`Vote--ballot ${politician?.party.toLowerCase()} ${ballot === "Didn't vote" ? 'no-vote' : ''}`}
                        key={politician?.name}
                    >
                        <Icon
                            name={ballot === "Yes" ? 'check-circle' : (ballot === "No" ? 'times-circle' : 'minus-circle')}
                            title={ballot}
                        />
                        <span className="Vote--ballot--name">{politician?.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};