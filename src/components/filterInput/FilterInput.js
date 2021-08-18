import React from 'react';
import './FilterInput.css';

const FilterInput = ({
    filterString,
    setFilterString,
    className,
    placeholder = 'Search...'
}) => {
    return (
        <div className={`FilterInput ${className}`}>
            <span className="fas fa-search"></span>
            <input
                type="text"
                placeholder={placeholder}
                value={filterString}
                onChange={e => setFilterString(e.target.value)}
            />
        </div>
    );
};

export default FilterInput;
