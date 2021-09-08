import React, { useEffect, useState } from 'react';
import './Votes.scss';
import { getVotes } from '../../api';
import { Grid } from '../../components';
import { useHistory } from 'react-router-dom';

export const Votes = () => {
    const history = useHistory();
    const [votes, setVotes] = useState([]);

    useEffect(() => {
        getVotes({}).then(setVotes);
    }, [])

    return (
        <section className="Votes">
            <Grid
                data={votes}
                columns={[
                    { name: 'Date', dataKey: "date", sortable: false },
                    { name: 'Text', dataKey: "description", sortable: false, flexWeight: 2, renderer: d => d.en },
                    { name: 'Result', dataKey: "result", sortable: false },
                    { name: 'Vote', dataKey: "result", sortable: false, renderer: (_, {yea_total, nay_total}) => 
                        <div className="Votes--votecell"><span>{yea_total}</span>/<span>{yea_total + nay_total}</span></div>
                    },
                    { name: 'Bill', dataKey: "bill_url", sortable: false, renderer: b => b && b.split('/')[3] },
                ]}
                onRowClick={record => history.push(`/votes/${record.session}/${record.number}`)}
                rowClassnameFn={record => `Votes--row ${record.result.toLowerCase()}`}
            />
        </section>
    );
};