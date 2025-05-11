import React from 'react';
import { Box, Switch, Typography, SxProps, Theme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleMode } from '@/store/slices/themeSlice';
import { useAppSelector } from '@/store/hooks';

interface ThemeToggleProps {
    sx?: SxProps<Theme>;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ sx }) => {
    const dispatch = useDispatch();
    const mode = useAppSelector(state => state.theme.mode);
    const isDarkMode = mode === 'dark';

    const handleToggleTheme = () => {
        dispatch(toggleMode());
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                ...sx,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">Dark Mode</Typography>
            </Box>

            <Switch checked={isDarkMode} onChange={handleToggleTheme} color="primary" size="small" />
        </Box>
    );
};

export default ThemeToggle;
