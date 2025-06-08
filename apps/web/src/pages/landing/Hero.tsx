import React from 'react';
import { Box, Button, Container, Grid, Stack, Typography, useTheme } from '@mui/material';
import ProfessionalSVG from '@/assets/professional.svg';
import StudentSVG from '@/assets/student.svg';
import ResearcherSVG from '@/assets/resercher.svg';
import MainImageSVG from '@/assets/main image.svg';
import { useNavigate } from 'react-router-dom';

const roles = [
    {
        img: ProfessionalSVG,
        alt: 'Professionals',
        label: 'Professionals',
    },
    {
        img: StudentSVG,
        alt: 'Students',
        label: 'Students',
    },
    {
        img: ResearcherSVG,
        alt: 'Researchers',
        label: 'Researchers',
    },
];

const Hero: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            component="section"
            sx={{
                pt: { xs: 12, md: 20 },
                pb: 6,
                bgcolor: theme.palette.background.default,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={6} alignItems="center" justifyContent="space-between">
                    {/* Left column */}
                    <Grid item xs={12} md={6}>
                        <Stack spacing={4}>
                            <Typography
                                variant="h2"
                                fontWeight="bold"
                                sx={{
                                    color: theme.palette.text.primary,
                                    fontSize: { xs: 32, sm: 40, md: 48 },
                                    lineHeight: 1.2,
                                }}
                            >
                                <Box component="span" sx={{ color: theme.palette.info.main }}>
                                    Watch Less{' '}
                                </Box>
                                & Learn More{' '}
                                <Box component="span" sx={{ display: 'inline' }}>
                                    AI Summarization for
                                </Box>
                                <Box
                                    component="span"
                                    sx={{
                                        color: theme.palette.warning.main,
                                        display: 'inline',
                                    }}
                                >
                                    {' '}
                                    Smarter Viewing
                                </Box>
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontWeight: 300,
                                    fontSize: { xs: 20, sm: 24, md: 28 },
                                    lineHeight: 1.5,
                                }}
                            >
                                Maximize Efficiency with instant video
                                <Box component="span" sx={{ display: 'inline' }}>
                                    {' '}
                                    summaries ideal for
                                </Box>
                            </Typography>
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                                alignItems="center"
                                sx={{ color: theme.palette.text.primary, fontWeight: 300 }}
                            >
                                {roles.map(role => (
                                    <Stack direction="row" alignItems="center" spacing={1} key={role.alt}>
                                        <Box
                                            component="img"
                                            src={role.img}
                                            alt={role.alt}
                                            sx={{ height: 32, width: 32 }}
                                        />
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 300,
                                                fontSize: { xs: 18, sm: 22, md: 24 },
                                            }}
                                        >
                                            {role.label}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                            <Button
                                variant="contained"
                                href="/new-summary-request"
                                sx={{
                                    height: 48,
                                    bgcolor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    px: 4,
                                    my: 2,
                                    borderRadius: 2,
                                    fontWeight: 'bold',
                                    fontSize: { xs: 18, sm: 22 },
                                    '&:hover': {
                                        bgcolor: theme.palette.primary.light,
                                    },
                                    alignSelf: 'flex-start',
                                }}
                                onClick={() => navigate('/new-summary-request')}
                            >
                                Upload Your Video Now
                            </Button>
                        </Stack>
                    </Grid>
                    {/* Right column */}
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={MainImageSVG}
                            alt="main image"
                            sx={{
                                width: '100%',
                                maxHeight: { xs: 300, sm: 400, md: 500 },
                                objectFit: 'cover',
                                borderRadius: 3,
                                boxShadow: 3,
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Hero;
