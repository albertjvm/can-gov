import React from 'react';

export const Link = ({ className = '', children, href }) => {
    return (
        <a
            className={`Button ${className}`}
            href={href}
        >
            {children}
        </a>
    );
};