import React from 'react';
import { Box, Button, Container, Stack, TextField, Typography, useTheme } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const NewsletterSection: React.FC = () => {
    const theme = useTheme();

    return (
        <Box
            component="section"
            sx={{
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                py: { xs: 12, sm: 16 },
                px: { xs: 4, sm: 6, lg: 12 },
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Container maxWidth="lg" sx={{ textAlign: 'center', position: 'relative' }}>
                {/* Decorative Squares */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: -50,
                        left: -50,
                        width: 80,
                        height: 80,
                        bgcolor: theme.palette.info.main,
                        opacity: 0.5,
                        transform: 'rotate(45deg)',
                        zIndex: 0,
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: -50,
                        right: -50,
                        width: 80,
                        height: 80,
                        bgcolor: theme.palette.info.main,
                        opacity: 0.5,
                        transform: 'rotate(45deg)',
                        zIndex: 0,
                    }}
                />

                <Typography
                    variant="h3"
                    fontWeight="bold"
                    mb={2}
                    sx={{ color: theme.palette.warning.main, zIndex: 1, position: 'relative' }}
                >
                    Get our free newsletter + bonus content
                </Typography>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                    mb={3}
                    sx={{ zIndex: 1, position: 'relative' }}
                >
                    <RocketLaunchIcon
                        sx={{ color: theme.palette.warning.main, fontSize: { xs: 28, sm: 32, md: 36 } }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.primary.dark,
                            fontWeight: 400,
                            fontSize: { xs: 18, sm: 22, md: 24 },
                        }}
                    >
                        Get the latest updates, exclusive features, and expert insights delivered to your inbox.
                    </Typography>
                </Stack>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                    mb={4}
                    sx={{ zIndex: 1, position: 'relative' }}
                >
                    <TextField
                        type="email"
                        placeholder="Enter a valid Email"
                        variant="outlined"
                        sx={{
                            width: { xs: '100%', sm: 'auto' },
                            bgcolor: theme.palette.background.paper,
                            borderRadius: 2,
                            '& .MuiOutlinedInput-root': {
                                color: theme.palette.text.primary,
                                borderColor: theme.palette.warning.main,
                                '& fieldset': {
                                    borderColor: theme.palette.warning.main,
                                    borderRadius: 2,
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.info.main,
                                    borderRadius: 2,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.warning.main,
                                    borderRadius: 2,
                                },
                            },
                            input: {
                                px: 3,
                                py: 2,
                            },
                        }}
                        InputProps={{
                            sx: {
                                color: theme.palette.text.primary,
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            width: { xs: '100%', sm: 'auto' },
                            px: 4,
                            py: 1.5,
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            borderRadius: 2,
                            fontWeight: 'bold',
                            fontSize: { xs: 16, sm: 18 },
                            '&:hover': {
                                bgcolor: theme.palette.info.main,
                            },
                            transition: 'background-color 0.2s',
                        }}
                    >
                        Subscribe
                    </Button>
                </Stack>
                <Typography
                    variant="h6"
                    sx={{
                        color: theme.palette.warning.main,
                        fontWeight: 500,
                        zIndex: 1,
                        position: 'relative',
                        fontSize: { xs: 18, sm: 22 },
                    }}
                >
                    Get a FREE AI-generated summary every week — subscribe now!
                </Typography>
            </Container>
        </Box>
    );
};

export default NewsletterSection;
