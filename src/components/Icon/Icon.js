import React from 'react';
import './Icon.scss';

export const Icon = ({name}) => {
    return (
        <span 
            className={`Icon fas fa-${name}`}
        />
    );
};