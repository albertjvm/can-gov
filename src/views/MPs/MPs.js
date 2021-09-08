import React, { useEffect, useState } from 'react';
import './MPs.scss';
import { getPoliticians } from '../../api';
import { Grid } from '../../components';

export const MPs = () => {
    const [mps, setMPs] = useState([]);

    useEffect(() => {
        const results = getPoliticians();
        results.then(setMPs)
    }, []);

    return (
        <section className="MPs">
            <Grid 
                data={mps}
                filterable
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
