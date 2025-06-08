import React, { useEffect } from 'react';
import { Typography, Box, Button, Grid2 as Grid, useTheme, CircularProgress } from '@mui/material';
import { Add, ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MiniSummaryCard from '@/components/summary/MiniSummaryCard';
import { summaryService } from '@/services/summary.service';
import { SummaryDto } from '@snipscribe/typescript-client';
import NoSummariesFound from '@/components/summary/NoSummariesFound';

const Home: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [recentSummaries, setRecentSummaries] = React.useState<SummaryDto[]>([]);
    const [popularSummaries, setPopularSummaries] = React.useState<SummaryDto[]>([]);
    const [recentLoaded, setRecentLoaded] = React.useState<boolean>(false);
    const [popularLoaded, setPopularLoaded] = React.useState<boolean>(false);

    const fetchSummaries = async () => {
        const { getOwnSummaries, getPublicSummaries } = summaryService();

        setRecentLoaded(false);
        const ownSummariesRes = await getOwnSummaries({ skip: 0, take: 4 });
        setRecentSummaries(ownSummariesRes.summaries);
        setRecentLoaded(true);

        setPopularLoaded(false);
        const publicSummariesRes = await getPublicSummaries({ skip: 0, take: 4 });
        setPopularSummaries(publicSummariesRes.summaries);
        setPopularLoaded(true);
    };

    useEffect(() => {
        fetchSummaries();
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Home
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => navigate('/new-summary-request')}
                >
                    New Summary Request
                </Button>
            </Box>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        color="primary"
                        gutterBottom
                        sx={{
                            mb: 2,
                            borderLeft: `4px solid ${theme.palette.primary.main}`,
                            pl: 2,
                            py: 0.5,
                        }}
                    >
                        Your Recent Summaries
                    </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        endIcon={<ArrowForward />}
                        onClick={() => navigate('/history')}
                    >
                        See more
                    </Button>
                </Box>
                {recentLoaded ? (
                    recentSummaries.length ? (
                        <Grid container spacing={3}>
                            {recentSummaries.map((summary, idx) => (
                                <Grid key={idx} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
                    ) : (
                        <NoSummariesFound />
                    )
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <CircularProgress />
                    </Box>
                )}
            </Box>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        color="primary"
                        gutterBottom
                        sx={{
                            mb: 2,
                            borderLeft: `4px solid ${theme.palette.primary.main}`,
                            pl: 2,
                            py: 0.5,
                        }}
                    >
                        Popular Summaries
                    </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        endIcon={<ArrowForward />}
                        onClick={() => navigate('/discover')}
                    >
                        See more
                    </Button>
                </Box>
                {popularLoaded ? (
                    popularSummaries.length ? (
                        <Grid container spacing={3}>
                            {popularSummaries.map((summary, idx) => (
                                <Grid key={idx} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
                    ) : (
                        <NoSummariesFound />
                    )
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <CircularProgress />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Home;
