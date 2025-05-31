export interface SummaryProps {
    title: string;
    videoUrl: string;
    summaryText: string;
    language: string;
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
