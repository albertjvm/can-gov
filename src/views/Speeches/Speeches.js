import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import './Speeches.scss';
import { getSpeechesForDate } from '../../api';
import { Link } from 'react-router-dom';

export const Speeches = () => {
    const query = new URLSearchParams(useLocation().search);
    const date = query.get("date");
    const source_id_param = query.get("source_id");
    const [ speeches, setSpeeches ] = useState([]);
    const selectedSpeechRef = useRef();

    useEffect(() => {
        getSpeechesForDate({date}).then(setSpeeches);
    }, [date]);

    useEffect(() => {
        selectedSpeechRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    });

    const renderSpeaker = ({attribution, mp}) => (
        mp ? (
            <Link to={`/mps/${mp}`}><span>{attribution}</span></Link>
        ) : (
            <span>{attribution}</span>
        )
    );

    const sortedSpeeches = () => (
        speeches.sort((s1, s2) => (
            new Date(s1?.time) - new Date(s2?.time)
        ))
    );

    return (
        <section className="Speeches">
            {sortedSpeeches().map(({attribution, mp, title, subtitle, content, time, source_id}, i) => (
                <div
                    className={`Speeches--speech ${source_id === source_id_param ? 'selected' : ''}`}
                    key={`speech-${i}`}
                    ref={source_id === source_id_param ? selectedSpeechRef : null}
                >
                    <div className="Speeches--speechtitle">
                        {title && <h3>{title}:</h3>}
                        {subtitle && <h5>{subtitle}</h5>}
                    </div>
                    <div className="Speeches--speechheader">
                        {renderSpeaker({attribution, mp})}
                        {time}
                    </div>
                    <p>
                        {content}
                    </p>
                </div>
            ))}
        </section>
    )
};