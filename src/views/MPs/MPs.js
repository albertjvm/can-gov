import React from 'react';
import './MPs.scss';
import { useMPs } from '../../hooks';
import { Grid } from '../../components';
import { useHistory } from 'react-router-dom';

export const MPs = () => {
    const history = useHistory();
    const { isLoading, data } = useMPs();

    const handleRowClick = ({ id }) => {
        history.push(`/mps/${id}`);
    };

    if (isLoading) return 'Loading...';

    return (
        <section className="MPs">
            <Grid 
                data={data}
                filterable
                onRowClick={handleRowClick}
                rowClassnameFn={record => `MPs--row ${record.party.toLowerCase()}`}
                columns={[
                    { name: 'Name', dataKey: "name" },
                    { name: 'Party', dataKey: "party" },
                    { name: 'Riding', dataKey: "riding" },
                    { name: 'Province', dataKey: "province", flexWeight: 0.7 },
                ]}
            />
        </section>
    );
};
