import React, { useState } from 'react';
import { Card, CardActionArea, CardActions, Typography, Box, IconButton, useTheme } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MiniSummaryCardProps } from './types';
import { favoriteService } from '@/services/favorite.service';
import { toast } from 'react-toastify';

const MiniSummaryCard: React.FC<MiniSummaryCardProps> = ({
    id,
    title,
    summaryText,
    language,
    isInFavorites,
    onClick,
    onFavorite,
    onShare,
}) => {
    const theme = useTheme();

    const [favorite, setFavorite] = useState(isInFavorites);
    const [submitting, setSubmitting] = useState(false);

    const preview = summaryText.length > 100 ? `${summaryText.slice(0, 100)}...` : summaryText;

    const handleFavorite = async () => {
        if (submitting) return;

        const { addSummaryToFavorites, removeSummaryFromFavorites } = favoriteService();

        setSubmitting(true);

        if (favorite) {
            await removeSummaryFromFavorites({ summaryId: id });

            toast.success('Summary removed from favorites');
        } else {
            await addSummaryToFavorites({ summaryId: id });

            toast.success('Summary added to favorites');
        }

        setFavorite(!favorite);

        if (onFavorite) {
            onFavorite();
        }

        setSubmitting(false);
    };

    const handleShare = () => {
        if (onShare) {
            onShare();
        } else {
            const rootUrl = window.location.origin;
            const summaryUrl = `${rootUrl}/summary/${id}`;
            navigator.clipboard.writeText(summaryUrl);
            toast.success('Link copied to clipboard');
        }
    };

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
                    <IconButton aria-label="like" size="small" onClick={handleFavorite} disabled={submitting}>
                        {favorite ? (
                            <FavoriteIcon fontSize="small" color="primary" />
                        ) : (
                            <FavoriteBorderIcon fontSize="small" />
                        )}
                    </IconButton>
                    <IconButton aria-label="share" onClick={handleShare} size="small">
                        <ShareIcon fontSize="small" />
                    </IconButton>
                </Box>
            </CardActions>
        </Card>
    );
};

export default MiniSummaryCard;
