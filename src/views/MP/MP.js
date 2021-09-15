import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './MP.scss';
import {
    getMP,
    getSpeechesForMP,
    getSponsoredBillsForMP
} from '../../api';
import { Icon, Link } from '../../components';

export const MP = () => {
    const history = useHistory();
    const { id } = useParams();
    const [ mp, setMP ] = useState();
    const [ speeches, setSpeeches ] = useState([]);
    const [ sponsoredBills, setSponsoredBills ] = useState([]);

    useEffect(() => {
        getMP({id}).then(setMP);
        getSpeechesForMP({id}).then(setSpeeches);
        getSponsoredBillsForMP({id}).then(setSponsoredBills);
    }, [id]);

    const formatDateString = (dateString) => (
        new Date(dateString).toLocaleDateString("en-US", {
            year: 'numeric', month: 'long', day: 'numeric'
        })
    );

    const renderAddressLine = (line, i) => {
        if (i === 0 ) return <h3 key={`address-line-${i}`}>{line}</h3>;
        else if (line.indexOf("Phone:") > -1) {
            const tel = line.replace(/Phone: (.*)/, "$1");
            return (
                <Link className="MP--tel" href={`tel:${tel}`}  key={`address-line-${i}`}>
                    <Icon name="phone" />
                    {tel}
                </Link>
            );
        }
        else return <span key={`address-line-${i}`}>{line}</span>
    };

    if (!mp) return 'Loading...';

    return (
        <section className="MP">
            <h2 className="MP--name">{mp?.name}</h2>
            <Link
                className="MP--email"
                href={`mailto:${mp?.email}`}
            >
                <Icon name="envelope"/>
                {mp?.email}
            </Link>
            <Link
                className="MP--tel"
                href={`tel:${mp?.voice}`}
            >
                <Icon name="phone"/>
                {mp?.voice}
            </Link>
            <img className="MP--image" src={`https://api.openparliament.ca${mp.image}`} alt={mp.name} />
            {mp.memberships.map(({start_date, end_date, riding, party, label}, i) => (
                <span className={`MP--membership ${party.short_name.en.toLowerCase()}`} key={`membership-${i}`}>
                    <span className="MP--membership--label">{label.en}: </span>
                    <span className="MP--membership--dates">
                        {formatDateString(start_date)} - {end_date ? formatDateString(end_date) : 'Present'}
                    </span>
                </span>
            ))}
            {mp?.other_info?.favourite_word && 
                <span className="MP--favword">Favourite word: <span>{mp?.other_info?.favourite_word.join(' ')}</span></span>
            }
            {mp?.other_info?.constituency_offices.map((address, i) => (
                <div className="MP--office" key={`office-${i}`}>
                    {address.split('\n').map(renderAddressLine)}
                </div>
            ))}
            <div className="MP--bills">
                <h2>Sponsored Bills</h2>
                {sponsoredBills.map(({ name, number, url}, i) => (
                    <div
                        key={`bill-${i}`} 
                        className="MP--bill"
                        onClick={() => history.push(url)}
                    >
                        {number && <h3>{number}:</h3>}
                        {name && <h3>{name.en}</h3>}
                    </div>
                ))}
            </div>
            <div className="MP--speeches">
                <h2>Recent Speeches</h2>
                {speeches.map(({ title, subtitle, content, date, source_id}, i) => (
                    <div
                        key={`speech-${i}`}
                        className="MP--speech"
                        onClick={() => history.push(`/speeches?date=${date}&source_id=${source_id}`)}
                    >
                        {title && <h3>{title}:</h3>}
                        {subtitle && <h5>{subtitle} - </h5>}
                        {content && <p>{content}</p>}
                    </div>
                ))}
            </div>
        </section>
    );
};