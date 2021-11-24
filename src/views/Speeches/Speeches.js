import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import './Speeches.scss';
import { useSpeechesForDate } from '../../hooks';
import { Speech } from '../../views';

export const Speeches = () => {
    const query = new URLSearchParams(useLocation().search);
    const date = query.get("date");
    const bottomRef = useRef(null);
    const { isLoading, data } = useSpeechesForDate({ date });

    useEffect(() => {
        if (!bottomRef.current) return;
        bottomRef.current.scrollIntoView({
            behavior: 'smooth'
        });
    }, [isLoading, bottomRef]);

    if (isLoading) return 'Loading...';

    return (
        <section className="Speeches">
            {
                data?.pages.map((group, i) => (
                    <React.Fragment key={i}>
                        {
                            group.objects.map((speech, i) => (
                                <Speech 
                                    key={`speech-${i}`}
                                    speech={speech}
                                />
                            ))
                        }
                    </React.Fragment>
                ))
            }
            <span ref={bottomRef}></span>
        </section>
    )
};