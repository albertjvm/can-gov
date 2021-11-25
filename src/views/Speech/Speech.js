import React from "react";
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Message } from '../../components';
import { useMP } from "../../hooks";

export const Speech = ({ speech: { attribution, mp: mpId, content, time } }) => {
    const { isLoading: isMpLoading, data: mp } = useMP(mpId);

    const renderSpeaker = ({attribution, mpId}) => (
        mpId 
        ? 
            <Link to={`/mps/${mpId}`}>
                { isMpLoading ? 'Loading...' : `${mp?.name} [${mp?.party}] (${mp?.memberships[0]?.riding?.name?.en})` }
            </Link>
        : attribution
    );

    return (
        <Message 
            sender={renderSpeaker({attribution, mpId})}
            time={dayjs(time).format('hh:mm A')}
            content={content}
        />
    );
};