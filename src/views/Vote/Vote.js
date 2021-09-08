import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Vote.scss';
import { getVote } from '../../api';

export const Vote = () => {
    const { number, session } = useParams();

    useEffect(() => {
        getVote({number, session});
    }, [number, session])
    return (
        <section className="Vote">

        </section>
    );
};