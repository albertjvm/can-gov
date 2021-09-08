import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './PostalCodeSearch.scss';
import { Button, TextInput } from '../../components';

export const PostalCodeSearch = () => {
    const history = useHistory();
    const [ searchText, setSearchText ] = useState("");

    const sanitizedSearchText = () => searchText.replace(/\W/g,'');

    const handleSearch = () => {
        history.push(`/postalCode/${sanitizedSearchText()}`);
    };

    return (
        <section className="PostalCodeSearch">
            <TextInput
                placeholder="A1A 1A1"
                value={searchText}
                onChange={setSearchText}
                onEnter={handleSearch}
            />
            <Button onClick={handleSearch}>Find</Button>
        </section>
    );
};
