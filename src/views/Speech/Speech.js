import React from "react";
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Message } from '../../components';
import { useMP } from "../../hooks";
import './Speech.scss';

export const Speech = ({ speech: { attribution, mp: mpId, content, time } }) => {
    const { isLoading: isMpLoading, data: mp } = useMP(mpId);

    const renderSpeaker = ({attribution, mpId}) => (
        <span className={["Speech--speaker", mp?.party?.toLowerCase()].join(' ')}>
            {
                mpId 
                ? 
                    <Link to={`/mps/${mpId}`}>
                        { isMpLoading ? 'Loading...' : `${mp?.name} (${mp?.memberships[0]?.riding?.name?.en})` }
                    </Link>
                : attribution
            }
        </span>
    );

    return (
        <Message 
            className="Speech"
            sender={renderSpeaker({attribution, mpId})}
            time={dayjs(time).format('hh:mm A')}
            content={content}
        />
    );
};