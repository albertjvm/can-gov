import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Vote.scss';
import { getVote } from '../../api';
import { Icon } from '../../components';

export const Vote = () => {
    const { number, session } = useParams();
    const [ vote, setVote ] = useState();

    useEffect(() => {
        getVote({number, session}).then(setVote);
    }, [number, session]);

    if (!vote) return 'Loading...';

    return (
        <section className="Vote">
            { vote.party_votes.map(({party, vote, disagreement}) => (
                <div className={`Vote--partyvote ${party.toLowerCase()}`}  key={party}>
                    <Icon name={vote === "Yes" ? 'check-circle' : 'times-circle'} />
                    <span className="Vote--partyvote--party">{party}</span>
                    {disagreement > 0 && <span>({100 - Math.round(disagreement * 100)}%)</span>}
                </div>
            ))}
            <div className="Vote--description">{vote.description}</div>
        </section>
    );
};