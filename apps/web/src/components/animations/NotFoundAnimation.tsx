import Lottie from 'lottie-react';
import notFoundAnimationDark from '../../assets/not-found-dark.json';
import notFoundAnimationLight from '../../assets/not-found-light.json';
import { useTheme } from '@mui/material/styles';

const NotFoundAnimation = () => {
    const theme = useTheme();
    const notFoundAnimation = theme.palette.mode === 'dark' ? notFoundAnimationDark : notFoundAnimationLight;

    return <Lottie animationData={notFoundAnimation} autoplay />;
};

export default NotFoundAnimation;
