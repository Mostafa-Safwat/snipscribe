import React, { useEffect } from 'react';
import { Typography, Box, Button, Grid2 as Grid } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MiniSummaryCard from '@/components/summary/MiniSummaryCard';
import { summaryService } from '@/services/summary.service';
import { SummaryDto } from '@snipscribe/typescript-client';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const [summaries, setSummaries] = React.useState<SummaryDto[]>([]);

    const fetchSummaries = async () => {
        const { getOwnSummaries } = summaryService();

        const summariesRes = await getOwnSummaries();
        setSummaries(summariesRes.summaries);
    };

    useEffect(() => {
        fetchSummaries();
    }, []);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
                <Grid container spacing={3}>
                    {summaries.map((summary, idx) => (
                        <Grid key={idx} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <MiniSummaryCard
                                summaryText={summary.body}
                                title={summary.title}
                                language={summary.summaryRequest?.language || 'English'}
                                onClick={() => navigate(`/summary/${summary.id}`)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Home;
