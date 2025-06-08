import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Stack,
    useTheme,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import HeadacheAnimation from '@/components/animations/HeadacheAnimation';

const SplitContainer: React.FC = () => {
    const theme = useTheme();

    return (
        <Box
            position="relative"
            overflow="hidden"
            maxWidth="lg"
            mx="auto"
            bgcolor={theme.palette.background.default}
            borderRadius={4}
            boxShadow={4}
            px={{ xs: 2, sm: 4, lg: 8 }}
            py={{ xs: 8, sm: 12, md: 16 }}
            minHeight="80vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            color={theme.palette.text.primary}
        >
            {/* Decorative Circles */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -90,
                    right: -90,
                    width: 220,
                    height: 220,
                    bgcolor: theme.palette.primary.dark,
                    opacity: 1,
                    borderRadius: '50%',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -90,
                    left: -90,
                    width: 220,
                    height: 220,
                    bgcolor: theme.palette.primary.dark,
                    opacity: { xs: 0.2, sm: 0.3, md: 0.4 },
                    borderRadius: '50%',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />

            {/* Header Section */}
            <Box
                zIndex={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                mb={{ xs: 8, sm: 10 }}
            >
                <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                    <FormatQuoteIcon sx={{ color: theme.palette.warning.main, fontSize: { xs: 28, sm: 32 } }} />
                    <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }}>
                        Struggling to Keep Up with Endless Video Content?
                    </Typography>
                </Stack>
                <Typography
                    variant="body1"
                    sx={{
                        mb: 3,
                        fontSize: { xs: 16, sm: 18 },
                        lineHeight: 1.7,
                        maxWidth: 600,
                    }}
                >
                    We get it - hours of video content can be overwhelming. Whether you're a student, researcher, or
                    professional, SnipScribe helps you extract the key insights without wasting time.
                </Typography>
            </Box>

            {/* Main Grid */}
            <Grid container spacing={{ xs: 4, sm: 6, lg: 8 }} maxWidth="lg" zIndex={1}>
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={3}
                        sx={{
                            bgcolor: theme.palette.primary.dark,
                            p: { xs: 3, sm: 5, md: 6 },
                            borderRadius: 3,
                            height: { xs: 180, sm: 220, md: 260 },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <HeadacheAnimation />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={0}
                        sx={{
                            bgcolor: 'transparent',
                            p: { xs: 3, sm: 5, md: 6 },
                            borderRadius: 3,
                            height: { xs: 180, sm: 220, md: 260 },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <List sx={{ width: '100%' }}>
                            <ListItem alignItems="flex-start">
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <CheckCircleIcon sx={{ color: theme.palette.success.light, mt: 0.5 }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography variant="body1" sx={{ fontSize: { xs: 14, sm: 16 } }}>
                                            <strong>Save up to 70%</strong> of your time with AI-powered video
                                            summaries.
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <CheckCircleIcon sx={{ color: theme.palette.success.light, mt: 0.5 }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography variant="body1" sx={{ fontSize: { xs: 14, sm: 16 } }}>
                                            Focus on what matters—get straight to the point with concise summaries.
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <CheckCircleIcon sx={{ color: theme.palette.success.light, mt: 0.5 }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography variant="body1" sx={{ fontSize: { xs: 14, sm: 16 } }}>
                                            Maximize productivity without watching lengthy videos.
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SplitContainer;
