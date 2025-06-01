import React, { useEffect, useRef, useState } from 'react';

interface InfiniteScrollProps {
    loadMore: () => Promise<void>; // Ensure loadMore is async to handle loading state
    hasMore: boolean;
    loader?: React.ReactNode;
    endMessage?: React.ReactNode;
    children: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ loadMore, hasMore, loader, endMessage, children }) => {
    const observerRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(false); // Track loading state
    const [initialLoadCompleted, setInitialLoadCompleted] = useState(false); // Track if the first load is completed

    useEffect(() => {
        const observer = new IntersectionObserver(
            async entries => {
                if (entries[0].isIntersecting && hasMore && !loading && initialLoadCompleted) {
                    setLoading(true);
                    await loadMore();
                    setLoading(false);
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [loadMore, hasMore, loading, initialLoadCompleted]);

    useEffect(() => {
        // Mark the initial load as completed after the first render
        setInitialLoadCompleted(true);
    }, []);

    return (
        <div>
            {children}
            {hasMore && <div ref={observerRef}>{loader || <p>Loading...</p>}</div>}
            {!hasMore && endMessage && <div>{endMessage}</div>}
        </div>
    );
};

export default InfiniteScroll;
