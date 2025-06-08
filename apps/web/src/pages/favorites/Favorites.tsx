import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid2 as Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MiniSummaryCard from '@/components/summary/MiniSummaryCard';
import { SummaryDto } from '@snipscribe/typescript-client';
import InfiniteScroll from '@/components/infinite-scroll/InfiniteScroll';
import EndOfSummaries from '@/components/common/EndOfSummaries';
import { favoriteService } from '@/services/favorite.service';

const History: React.FC = () => {
    const navigate = useNavigate();

    const [summaries, setSummaries] = useState<SummaryDto[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const itemsPerPage = 10;
    const [loading, setLoading] = useState<boolean>(false);

    const fetchSummaries = async (page: number) => {
        if (loading) return;

        const { getFavorites } = favoriteService();

        const skip = (page - 1) * itemsPerPage;
        const take = itemsPerPage;

        setLoading(true);
        const summariesRes = await getFavorites({ skip, take });
        setSummaries(prev => [...prev, ...summariesRes.summaries]);
        setHasMore(summariesRes.size > summaries.length);
        setLoading(false);
    };

    useEffect(() => {
        setSummaries([]);
        setPage(1);
        fetchSummaries(1);
    }, []);

    const loadMoreSummaries = async () => {
        if (loading) return;

        const nextPage = page + 1;
        await fetchSummaries(nextPage);
        setPage(nextPage);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Favorites
                </Typography>
            </Box>
            <InfiniteScroll
                loadMore={loadMoreSummaries}
                hasMore={hasMore}
                loader={
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <CircularProgress />
                    </Box>
                }
                endMessage={<EndOfSummaries />}
            >
                <Grid container spacing={3}>
                    {summaries.map(summary => (
                        <Grid key={summary.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <MiniSummaryCard
                                id={summary.id}
                                summaryText={summary.body}
                                title={summary.title}
                                language={summary.summaryRequest?.language || 'English'}
                                isInFavorites={!!summary.favorites?.length}
                                onClick={() => navigate(`/summary/${summary.id}`)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </InfiniteScroll>
        </Box>
    );
};

export default History;
