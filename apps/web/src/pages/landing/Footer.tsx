import React from 'react';
import { Box, Container, Grid, Typography, Divider, Stack, IconButton, useTheme } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import fullLogoDark from '@/assets/full-logo-dark.png';
import fullLogoLight from '@/assets/full-logo-light.png';

const Footer: React.FC = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                m: 5,
                borderRadius: 4,
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                py: { xs: 6, sm: 8 },
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 4, sm: 6, md: 8 }} justifyContent="space-between">
                    {/* Logo and Description */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Stack spacing={2}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Box
                                    component="img"
                                    src={theme.palette.mode === 'dark' ? fullLogoDark : fullLogoLight}
                                    alt="SnipScribe Logo"
                                    sx={{ height: { xs: 48, sm: 60 } }}
                                />
                            </Stack>
                            <Typography variant="subtitle2" fontWeight="bold">
                                Summarize Smarter, Watch Faster
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                                SnipScribe: Transforming long videos into concise summaries with AI efficiency.
                            </Typography>
                        </Stack>
                    </Grid>

                    {/* Social Media & Contact Information */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle2" fontWeight="bold" mb={2}>
                            SOCIAL MEDIA & CONTACT INFORMATION
                        </Typography>
                        <Stack spacing={2}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Box
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        bgcolor: theme.palette.grey[400],
                                        borderRadius: '50%',
                                    }}
                                />
                                <Typography variant="body2">Email: snipscribe@gmail.com</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Box
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        bgcolor: theme.palette.grey[400],
                                        borderRadius: '50%',
                                    }}
                                />
                                <Typography variant="body2">Phone: +1-234-567-8900</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Box
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        bgcolor: theme.palette.grey[400],
                                        borderRadius: '50%',
                                    }}
                                />
                                <Typography variant="body2">Follow Us:</Typography>
                                <Stack direction="row" alignItems="center">
                                    <IconButton
                                        href="https://youtube.com"
                                        color="inherit"
                                        sx={{ '&:hover': { color: '#FF0000' } }}
                                    >
                                        <YouTubeIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        href="https://facebook.com"
                                        color="inherit"
                                        sx={{ '&:hover': { color: '#1877F3' } }}
                                    >
                                        <FacebookIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        href="https://linkedin.com"
                                        color="inherit"
                                        sx={{ '&:hover': { color: '#0A66C2' } }}
                                    >
                                        <LinkedInIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        href="https://x.com"
                                        color="inherit"
                                        sx={{ '&:hover': { color: '#000' } }}
                                    >
                                        <TwitterIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
                <Divider
                    sx={{
                        my: 4,
                        width: { xs: '33%', sm: '25%' },
                        mx: 'auto',
                        borderColor: theme.palette.warning.main,
                    }}
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="center">
                    <Typography variant="caption">
                        © 2025 SnipScribe, All rights reserved.&nbsp;&nbsp; Made with{' '}
                        <Box component="span" sx={{ color: theme.palette.error.main }}>
                            ❤️
                        </Box>{' '}
                        for smarter content consumption.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
