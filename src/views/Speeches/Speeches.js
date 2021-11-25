import React, { createRef, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import './Speeches.scss';
import { useSpeechesForDate } from '../../hooks';
import { Speech } from '../../views';

export const Speeches = () => {
    const bottomRef = useRef(null);
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useSpeechesForDate();
    const dateRefs = {};

    useEffect(() => {
        if (!bottomRef.current) return;
        bottomRef.current.scrollIntoView({
            behavior: 'smooth'
        });
    }, [isLoading, bottomRef]);

    if (isLoading) return 'Loading...';

    const renderSpeeches = (speeches, pageNum) => {
        const renders = [];
        let prevDate = '';

        speeches.forEach((speech, i) => {
            let nextDate = `${dayjs(speech?.time).format('YYYYMMDD')}-${pageNum}`;

            if(prevDate !== nextDate) {
                dateRefs[nextDate] = createRef();

                renders.push(
                    <button
                        key={`button-${nextDate}`}
                        className="Speeches--datepill"
                        onClick={() => {
                            let count = dateRefs[nextDate].current.offsetTop - (28 + 11 * window.innerHeight / 100)
                            window.scroll({top: count, left: 0, behavior: 'smooth'})
                        }}
                    >
                        {dayjs(speech?.time).format('dddd, MMMM D, YYYY')}
                    </button>
                );
                renders.push(<span key={`ref-${nextDate}`} ref={dateRefs[nextDate]}></span>);
            }

            prevDate = nextDate;

            renders.push(
                <Speech 
                    key={`speech-${i}`}
                    speech={speech}
                />
            );
        })

        return renders;
    };
    
    return (
        <section className="Speeches">
            <button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
            >
                {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                ? 'Load More'
                : 'Nothing more to load'}
            </button>
            {
                data?.pages.slice(0).reverse().map((group, i) => (
                    <React.Fragment key={i}>
                        { renderSpeeches(group.objects, i) }
                    </React.Fragment>
                ))
            }
            <span ref={bottomRef}></span>
        </section>
    )
};