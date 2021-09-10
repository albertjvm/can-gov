import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MP.scss';
import { getMP } from '../../api';
import { Icon } from '../../components';

export const MP = () => {
    const { id } = useParams();
    const [ mp, setMP ] = useState();

    useEffect(() => {
        getMP({id}).then(setMP);
    }, [id]);

    const formatDateString = (dateString) => (
        new Date(dateString).toLocaleDateString("en-US", {
            year: 'numeric', month: 'long', day: 'numeric'
        })
    );

    const renderAddressLine = (line, i) => {
        if (i === 0 ) return <h3>{line}</h3>;
        else if (line.indexOf("Phone:") > -1) {
            const tel = line.replace(/Phone: (.*)/, "$1");
            return (
                <span>
                    <Icon name="phone" />
                    <a href={`tel:${tel}`}>{tel}</a>
                </span>
            );
        }
        else return <span>{line}</span>
    };

    if (!mp) return 'Loading...';

    return (
        <section className="MP">
            <h2 className="MP--name">{mp?.name}</h2>
            <span className="MP--email">
                <Icon name="envelope"/>
                <a href={`mailto:${mp?.email}`}>{mp?.email}</a>
            </span>
            <span className="MP--tel">
                <Icon name="phone"/>
                <a href={`tel:${mp?.voice}`}>{mp?.voice}</a>
            </span>
            <img className="MP--image" src={`https://api.openparliament.ca${mp.image}`} alt={mp.name} />
            {mp.memberships.map(({start_date, end_date, riding, party, label}) => (
                <span className={`MP--membership ${party.short_name.en.toLowerCase()}`}>
                    {label.en}: {formatDateString(start_date)} - {end_date ? formatDateString(end_date) : 'Present'}
                </span>
            ))}
            {mp?.other_info?.favourite_word && 
                <span className="MP--favword">Favourite word: {mp?.other_info?.favourite_word.join(' ')}</span>
            }
            {mp?.other_info?.constituency_offices.map((address) => (
                <div className="MP--office">
                    {address.split('\n').map(renderAddressLine)}
                </div>
            ))}
        </section>
    );
};