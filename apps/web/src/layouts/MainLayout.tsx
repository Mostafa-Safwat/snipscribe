import React from 'react';
import Drawer from '@/components/drawer/Drawer';
import ThemeToggle from '@/components/common/ThemeToggle';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { usePathname } from '@/hooks/usePathname';

const Header = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: '100%',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
}));

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const pathname = usePathname();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
                <Drawer />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        overflow: 'hidden',
                    }}
                >
                    <Header>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            Aquail Home
                        </Typography>
                        <ThemeToggle />
                    </Header>

                    <Box
                        component={motion.div}
                        key={pathname}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            overflow: 'auto',
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;
