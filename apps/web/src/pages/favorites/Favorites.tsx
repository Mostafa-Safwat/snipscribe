import React, { useEffect } from 'react';
import { Typography, Box, Grid2 as Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MiniSummaryCard from '@/components/summary/MiniSummaryCard';
import { SummaryDto } from '@snipscribe/typescript-client';
import { favoriteService } from '@/services/favorite.service';

const Favorites: React.FC = () => {
    const navigate = useNavigate();

    const [summaries, setSummaries] = React.useState<SummaryDto[]>([]);

    const fetchSummaries = async () => {
        const { getFavorites } = favoriteService();

        const summariesRes = await getFavorites();
        setSummaries(summariesRes.summaries);
    };

    useEffect(() => {
        fetchSummaries();
    }, []);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Favorites
                </Typography>
            </Box>
            <Box>
                <Grid container spacing={3}>
                    {summaries.map(summary => (
                        <Grid key={summary.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <MiniSummaryCard
                                id={summary.id}
                                summaryText={summary.body}
                                title={summary.title}
                                language={summary.summaryRequest?.language || 'English'}
                                isInFavorites={true}
                                onClick={() => navigate(`/summary/${summary.id}`)}
                                onFavorite={() => fetchSummaries()}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Favorites;
