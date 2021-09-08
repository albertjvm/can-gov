import React from 'react';
import './TextInput.scss';

export const TextInput = ({ className = '', placeholder, value, onChange, onEnter }) => {

    const handleKeyPress = e => {
        if (e.key === "Enter") {
            onEnter && onEnter();
        }
    };

    return (
        <input 
            type="text"
            className={`TextInput ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={e => onChange && onChange(e.target.value)}
            onKeyPress={handleKeyPress}
        />
    );
};