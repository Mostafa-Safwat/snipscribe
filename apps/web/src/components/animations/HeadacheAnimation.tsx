import Lottie from 'lottie-react';
import headacheAnimationDark from '../../assets/headache-dark.json';
import headacheAnimationLight from '../../assets/headache-light.json';
import { useTheme } from '@mui/material/styles';

const HeadacheAnimation = () => {
    const theme = useTheme();
    const headacheAnimation = theme.palette.mode === 'dark' ? headacheAnimationDark : headacheAnimationLight;

    return <Lottie animationData={headacheAnimation} autoplay />;
};

export default HeadacheAnimation;
