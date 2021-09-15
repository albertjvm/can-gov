import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './Bills.scss';
import { Grid } from '../../components';
import { getBillsForSession } from '../../api';
import { useHistory } from 'react-router-dom';

export const Bills = () => {
    const history = useHistory();
    const { session } = useParams();
    const [ bills, setBills ] = useState([]);

    useEffect(() => {
        getBillsForSession({session}).then(setBills);
    }, [session]);

    const handleRowClick = ({number}) => {
        history.push(`/bills/${session}/${number}`);
    };

    return (
        <section className="Bills">
            <Grid 
                data={bills}
                onRowClick={handleRowClick}
                filterable
                columns={[
                    { name: 'Number', dataKey: "number" },
                    { name: 'Name', dataKey: "name", flexWeight: 5 },
                    { name: 'Introduced', dataKey: "introduced" },
                ]}
            />
        </section>
    );
};