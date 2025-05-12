export interface SummaryProps {
    title: string;
    videoUrl: string;
    summaryText: string;
    language: string;
}

export interface MiniSummaryCardProps {
    title: string;
    summaryText: string;
    language: string;
    onClick?: () => void;
    onLike?: () => void;
    onShare?: () => void;
}
