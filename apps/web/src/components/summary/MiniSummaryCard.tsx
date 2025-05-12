import React from 'react';
import { Card, CardActionArea, CardActions, Typography, Box, IconButton, useTheme } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { MiniSummaryCardProps } from './types';

const MiniSummaryCard: React.FC<MiniSummaryCardProps> = ({
    title,
    summaryText,
    language,
    onClick,
    onLike,
    onShare,
}) => {
    const theme = useTheme();

    const preview = summaryText.length > 100 ? `${summaryText.slice(0, 100)}...` : summaryText;

    return (
        <Card
            elevation={2}
            sx={{
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            <CardActionArea onClick={onClick} sx={{ flexGrow: 1, p: 2, textAlign: 'left' }}>
                <Typography
                    variant="h6"
                    fontWeight={600}
                    color="primary"
                    gutterBottom
                    sx={{
                        borderLeft: `4px solid ${theme.palette.primary.main}`,
                        pl: 1,
                        py: 0.5,
                    }}
                >
                    {title}
                </Typography>

                <Box
                    sx={{
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        color: theme.palette.text.secondary,
                        overflow: 'hidden',
                        whiteSpace: 'pre-wrap',
                        direction: language === 'Arabic' ? 'rtl' : 'ltr',
                        textAlign: language === 'Arabic' ? 'right' : 'left',
                    }}
                >
                    {preview}
                </Box>
            </CardActionArea>

            <CardActions sx={{ justifyContent: 'space-between', px: 1, pb: 1 }}>
                <Box>
                    <IconButton aria-label="like" onClick={onLike} size="small">
                        <FavoriteBorderIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="share" onClick={onShare} size="small">
                        <ShareIcon fontSize="small" />
                    </IconButton>
                </Box>
            </CardActions>
        </Card>
    );
};

export default MiniSummaryCard;
