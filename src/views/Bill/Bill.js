import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './Bill.scss';
import { getBill, getMP } from '../../api';
import { Link } from 'react-router-dom';

export const Bill = () => {
    const {session, number} = useParams();
    const [ bill, setBill ] = useState({});
    const [ sponsor, setSponsor ] = useState({});

    useEffect(() => {
        getBill({session, number}).then(setBill)
    }, [session, number]);

    useEffect(() => {
        if (!bill.sponsor_id) return;
        getMP({id: bill.sponsor_id}).then(setSponsor)
    }, [bill.sponsor_id])

    const { name, short_title, status, text_url} = bill;

    return (
        <section className="Bill">
            <h2>{number}: {short_title || name}</h2>
            <span>Status: {status}</span>
            {sponsor && (
                <span className="Bill--sponsor">Sponsor: <Link to={`/mps/${sponsor.id}`}>
                    <span className={`Bill--sponsorname ${sponsor?.party?.toLowerCase()}`}>{sponsor.name}</span>
                </Link></span>
            )}
            <iframe src={text_url} title={name}></iframe>
        </section>
    );
};