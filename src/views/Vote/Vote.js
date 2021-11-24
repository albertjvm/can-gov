import React from 'react';
import { useParams } from 'react-router-dom';
import './Vote.scss';
import { useVote } from '../../hooks';
import { Icon } from '../../components';

export const Vote = () => {
    const { number, session } = useParams();
    const { isLoading, data: vote } = useVote({ number, session });

    if (isLoading) return 'Loading...';

    return (
        <section className="Vote">
            <h2>Party Votes</h2>
            { vote?.party_votes.map(({party, vote, disagreement}) => (
                <div
                    className={`Vote--partyvote ${party.toLowerCase()}`}
                    key={party}
                >
                    <Icon name={vote === "Yes" ? 'check-circle' : 'times-circle'} title={vote} />
                    <span className="Vote--partyvote--party">{party}</span>
                    {disagreement > 0 && <span>({100 - Math.round(disagreement * 100)}%)</span>}
                </div>
            ))}
            <div className="Vote--description">{vote.description}</div>
        </section>
    );
};