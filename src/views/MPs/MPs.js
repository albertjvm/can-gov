import React, { useEffect, useState } from 'react';
import './MPs.scss';
import { getPoliticians } from '../../api';
import { Grid } from '../../components';
import { useHistory } from 'react-router-dom';

export const MPs = () => {
    const history = useHistory();
    const [ mps, setMPs ] = useState([]);

    useEffect(() => {
        const results = getPoliticians();
        results.then(setMPs)
    }, []);

    const handleRowClick = ({ id }) => {
        history.push(`/mps/${id}`);
    };

    return (
        <section className="MPs">
            <Grid 
                data={mps}
                filterable
                onRowClick={handleRowClick}
                rowClassnameFn={record => `MPs--row ${record.party.toLowerCase()}`}
                columns={[
                    { name: 'Name', dataKey: "name" },
                    { name: 'Party', dataKey: "party" },
                    { name: 'Riding', dataKey: "riding" },
                    { name: 'Province', dataKey: "province" },
                ]}
            />
        </section>
    );
};
