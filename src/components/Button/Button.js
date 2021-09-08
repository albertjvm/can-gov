import React from 'react';
import './Button.scss';

export const Button = ({ className = '', children, onClick }) => {
    return (
        <button
            className={`Button ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};