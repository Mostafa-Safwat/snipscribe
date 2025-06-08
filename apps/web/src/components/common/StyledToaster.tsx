import { ToastContainer, ToastContainerProps } from 'react-toastify';
import { Box, useTheme } from '@mui/material';

function StyledToaster(props: ToastContainerProps) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                '& .Toastify__toast': {
                    fontFamily: theme.typography.fontFamily,
                    background:
                        theme.palette.mode === 'dark'
                            ? theme.palette.background.paper
                            : theme.palette.background.default,
                    color: theme.palette.getContrastText(
                        theme.palette.mode === 'dark'
                            ? theme.palette.background.paper
                            : theme.palette.background.default
                    ),
                    '& .Toastify__toast-icon, & .Toastify__toast-icon svg, & .Toastify__toast-icon path': {
                        color: theme.palette.getContrastText(
                            theme.palette.mode === 'dark'
                                ? theme.palette.background.paper
                                : theme.palette.background.default
                        ),
                        fill: 'currentColor',
                    },
                },
                '& .Toastify__toast--success': {
                    background: theme.palette.success.main,
                    color: theme.palette.getContrastText(theme.palette.success.main),
                    '& .Toastify__toast-icon, & .Toastify__toast-icon svg, & .Toastify__toast-icon path': {
                        color: theme.palette.getContrastText(theme.palette.success.main),
                        fill: 'currentColor',
                    },
                },
                '& .Toastify__toast--error': {
                    background: theme.palette.error.main,
                    color: theme.palette.getContrastText(theme.palette.error.main),
                    '& .Toastify__toast-icon, & .Toastify__toast-icon svg, & .Toastify__toast-icon path': {
                        color: theme.palette.getContrastText(theme.palette.error.main),
                        fill: 'currentColor',
                    },
                },
                '& .Toastify__toast--info': {
                    background: theme.palette.info.main,
                    color: theme.palette.getContrastText(theme.palette.info.main),
                    '& .Toastify__toast-icon, & .Toastify__toast-icon svg, & .Toastify__toast-icon path': {
                        color: theme.palette.getContrastText(theme.palette.info.main),
                        fill: 'currentColor',
                    },
                },
                '& .Toastify__toast--warning': {
                    background: theme.palette.warning.main,
                    color: theme.palette.getContrastText(theme.palette.warning.main),
                    '& .Toastify__toast-icon, & .Toastify__toast-icon svg, & .Toastify__toast-icon path': {
                        color: theme.palette.getContrastText(theme.palette.warning.main),
                        fill: 'currentColor',
                    },
                },
                '& .Toastify__progress-bar--success': {
                    background: theme.palette.text.secondary,
                },
            }}
        >
            <ToastContainer {...props} />
        </Box>
    );
}

export default StyledToaster;
