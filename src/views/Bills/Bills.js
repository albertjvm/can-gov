import React from 'react';
import { useParams } from 'react-router';
import './Bills.scss';
import { Grid } from '../../components';
import { useBills } from '../../hooks';
import { useHistory } from 'react-router-dom';

export const Bills = () => {
    const history = useHistory();
    const { session } = useParams();
    const { isLoading, data: bills } = useBills({session});

    const handleRowClick = ({number}) => {
        history.push(`/bills/${session}/${number}`);
    };

    if (isLoading) return 'Loading...';

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