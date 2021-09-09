import React from 'react';
import './Icon.scss';

export const Icon = ({name, title}) => {
    return (
        <span 
            className={`Icon fas fa-${name}`}
            title={title}
        />
    );
};