import { SxProps, Theme } from '@mui/material';

export interface SummaryProps {
    id: number;
    title: string;
    videoUrl: string;
    summaryText: string;
    language: string;
    isShared: boolean;
}

export interface MiniSummaryCardProps {
    id: number;
    title: string;
    summaryText: string;
    language: string;
    isInFavorites: boolean;
    onClick?: () => void;
    onFavorite?: () => void;
    onShare?: () => void;
}

export interface ShareToggleProps {
    id: number;
    isShared: boolean;
    sx?: SxProps<Theme>;
}
