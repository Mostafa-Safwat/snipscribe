import React from 'react';
import { Paper, Typography, Box, Divider, useTheme } from '@mui/material';
import ReactPlayer from 'react-player';
import { SummaryProps } from './types';

const Summary: React.FC<SummaryProps> = ({ title, videoUrl, summaryText, language }) => {
    const theme = useTheme();

    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 2,
                overflow: 'hidden',
                maxWidth: '100%',
                border: `1px solid ${theme.palette.divider}`,
            }}
        >
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
                {title}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Box
                sx={{
                    height: '70vh',
                    borderRadius: 1,
                    boxShadow: theme.shadows[2],
                }}
            >
                <ReactPlayer
                    url={videoUrl}
                    width="100%"
                    height="100%"
                    controls={true}
                    light={false}
                    pip={true}
                    stopOnUnmount={true}
                    config={{
                        youtube: {
                            playerVars: {
                                modestbranding: 1,
                                rel: 0,
                            },
                        },
                    }}
                />
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1.5 }}>
                Summary
            </Typography>
            <Box
                sx={{
                    backgroundColor:
                        theme.palette.mode === 'dark'
                            ? theme.palette.background.paper
                            : theme.palette.background.default,
                    borderRadius: 1,
                    p: 2,
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    border: `1px solid ${theme.palette.divider}`,
                    whiteSpace: 'pre-wrap',
                    direction: language === 'Arabic' ? 'rtl' : 'ltr',
                }}
            >
                {summaryText}
            </Box>
        </Paper>
    );
};

export default Summary;
