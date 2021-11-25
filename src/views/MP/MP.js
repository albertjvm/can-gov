import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './MP.scss';
import { useBills, useMP } from '../../hooks';
import { Icon, Link } from '../../components';

export const MP = () => {
    const history = useHistory();
    const { id } = useParams();
    const { isLoading, data } = useMP(id);
    const { isLoading: isBillsLoading, data: sponsoredBills } = useBills({mpId: id});

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

    if (isLoading) return 'Loading...';

    return (
        <section className="MP">
            <h2 className="MP--name">{data?.name}</h2>
            <Link
                className="MP--email"
                href={`mailto:${data?.email}`}
            >
                <Icon name="envelope"/>
                {data?.email}
            </Link>
            <Link
                className="MP--tel"
                href={`tel:${data?.voice}`}
            >
                <Icon name="phone"/>
                {data?.voice}
            </Link>
            <img className="MP--image" src={`https://api.openparliament.ca${data.image}`} alt={data.name} />
            {data.memberships.map(({start_date, end_date, riding, party, label}, i) => (
                <span className={`MP--membership ${party.short_name.en.toLowerCase()}`} key={`membership-${i}`}>
                    <span className="MP--membership--label">{label.en}: </span>
                    <span className="MP--membership--dates">
                        {formatDateString(start_date)} - {end_date ? formatDateString(end_date) : 'Present'}
                    </span>
                </span>
            ))}
            {data?.other_info?.favourite_word && 
                <span className="MP--favword">Favourite word: <span>{data?.other_info?.favourite_word.join(' ')}</span></span>
            }
            {data?.other_info?.constituency_offices.map((address, i) => (
                <div className="MP--office" key={`office-${i}`}>
                    {address.split('\n').map(renderAddressLine)}
                </div>
            ))}
            <div className="MP--bills">
                <h2>Sponsored Bills</h2>
                {
                    isBillsLoading ? 'Loading...' :
                    sponsoredBills.map(({ name, number, url}, i) => (
                        <div
                            key={`bill-${i}`} 
                            className="MP--bill"
                            onClick={() => history.push(url)}
                        >
                            {number && <h3>{number}:</h3>}
                            {name && <h3>{name}</h3>}
                        </div>
                    ))
                }
            </div>
        </section>
    );
};