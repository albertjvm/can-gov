import React from 'react';
import { useParams } from 'react-router';
import './Bill.scss';
import { useBill } from '../../hooks';
import { useMP } from '../../hooks';
import { Link } from 'react-router-dom';

export const Bill = () => {
    const { session, number } = useParams();
    const { isLoading, data: bill } = useBill({ number, session });
    const { isLoading: isSponsorLoading, data: sponsor } = useMP(bill?.sponsor_id);

    if (isLoading) return 'Loading...';

    return (
        <section className="Bill">
            <h2>{number}: {bill?.short_title || bill?.name}</h2>
            <span>Status: {bill?.status}</span>
            {
                <span className="Bill--sponsor">Sponsor: {
                    isSponsorLoading || !sponsor ? 'Loading...' :
                    <Link to={`/mps/${sponsor.id}`}>
                        <span className={`Bill--sponsorname ${sponsor?.party?.toLowerCase()}`}>{sponsor.name}</span>
                    </Link>
                }
                </span>
            }
            <a href={bill?.text_url} target="_blank" rel="noreferrer">View Bill</a>
            <iframe src={bill?.text_url} title={bill?.name}></iframe>
        </section>
    );
};