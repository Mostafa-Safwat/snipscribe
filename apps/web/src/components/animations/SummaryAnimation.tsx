import Lottie from 'lottie-react';
import summaryAnimationDark from '../../assets/summary-dark.json';
import summaryAnimationLight from '../../assets/summary-light.json';
import { useTheme } from '@mui/material/styles';

const SummaryAnimation = () => {
    const theme = useTheme();
    const summaryAnimation = theme.palette.mode === 'dark' ? summaryAnimationDark : summaryAnimationLight;

    return <Lottie animationData={summaryAnimation} autoplay />;
};

export default SummaryAnimation;
