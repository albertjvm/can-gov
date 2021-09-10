import React, { useState } from 'react';
import './Grid.scss';
import { TextInput } from '../TextInput';

const DIR = {ASC: 'asc', DESC: 'desc'};

export const Grid = ({columns, data, filterable = false, onRowClick, rowClassnameFn}) => {
    const [sortField, setSortField] = useState(null);
    const [sortDir, setSortDir] = useState(DIR.ASC);
    const [filterString, setFilterString] = useState('');

    const sortedData = () => {
        if (!sortField) return filteredData();

        return filteredData().sort((d1, d2) => (
            d1[sortField].localeCompare(d2[sortField]) * (sortDir === DIR.DESC ? -1 : 1)
        ));
    };

    const filteredData = () => {
        if (filterable) {
            return data.filter(record => (
                new RegExp(filterString, "i").test(JSON.stringify(record))
            ));
        } else {
            return data;
        }
    };

    const handleHeaderClick = (dataKey) => {
        if (sortField === dataKey) {
            setSortDir(sortDir === DIR.ASC ? DIR.DESC : DIR.ASC);
        } else {
            setSortDir(DIR.ASC);
        }
        setSortField(dataKey);
    };

    return (
        <div className="Grid">
            {filterable && 
                <div className="Grid--filterbar">
                    <TextInput
                        placeholder="search..."
                        value={filterString}
                        onChange={setFilterString}
                    />
                </div>
            }
            <div className="Grid--header">
                {columns.map(({ name, dataKey, sortable = true, flexWeight = 1 }, i) => (
                    <div
                        key={`grid-header-${i}`}
                        className={`Grid--cell ${sortable ? 'sortable' : ''}`}
                        style={{flex: flexWeight}}
                        onClick={() => sortable && handleHeaderClick(dataKey)}
                    >
                        {name}
                    </div>
                ))}
            </div>
            {sortedData().map((record, r) => (
                <div
                    className={`Grid--row ${rowClassnameFn ? rowClassnameFn(record) : ''}`}
                    key={`grid-row-${r}`}
                    onClick={() => onRowClick && onRowClick(record)}
                >
                    {columns.map(({ dataKey, renderer, flexWeight = 1 }, c) => (
                        <div
                            key={`grid-cell-${r}-${c}`}
                            className="Grid--cell"
                            style={{flex: flexWeight}}
                        >
                            {renderer ? renderer(record[dataKey], record) : record[dataKey]}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};