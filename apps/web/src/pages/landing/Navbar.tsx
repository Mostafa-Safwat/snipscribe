import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useTheme,
    useMediaQuery,
    Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import fullLogoDark from '@/assets/full-logo-dark.png';
import fullLogoLight from '@/assets/full-logo-light.png';
import LandingThemeToggle from './LandingThemeToggle';

const Navbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

    // Background color based on page
    const bgColor = theme.palette.background.default;

    // Drawer handlers
    const handleDrawerToggle = () => {
        setDrawerOpen(prev => !prev);
    };

    return (
        <AppBar
            position="fixed"
            elevation={2}
            sx={{
                bgcolor: bgColor,
                color: theme.palette.text.primary,
                zIndex: theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: 'space-between',
                    px: { xs: 2, sm: 4, lg: 8 },
                    py: { xs: 1.5, sm: 2 },
                }}
            >
                {/* Logo */}
                <Box component="a" href="/" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        component="img"
                        src={theme.palette.mode === 'dark' ? fullLogoDark : fullLogoLight}
                        alt="snipscript-logo"
                        sx={{ height: { xs: 40, sm: 48, md: 56 } }}
                    />
                </Box>

                {/* Desktop Actions */}
                {isMdUp && (
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <>
                            <Button
                                href="/signup"
                                variant="contained"
                                sx={{
                                    bgcolor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    fontWeight: 'bold',
                                    borderRadius: 2,
                                    px: 3,
                                    py: 1,
                                    fontSize: { xs: 14, md: 16 },
                                    '&:hover': {
                                        bgcolor: theme.palette.primary.light,
                                    },
                                }}
                            >
                                Start Now
                            </Button>
                            <Button
                                href="/signin"
                                variant="contained"
                                sx={{
                                    bgcolor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    fontWeight: 'bold',
                                    borderRadius: 2,
                                    px: 3,
                                    py: 1,
                                    fontSize: { xs: 14, md: 16 },
                                    '&:hover': {
                                        bgcolor: theme.palette.primary.light,
                                    },
                                }}
                            >
                                Sign In
                            </Button>
                            <LandingThemeToggle />
                        </>
                    </Stack>
                )}

                {/* Mobile Menu & Language */}
                {!isMdUp && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton
                            onClick={handleDrawerToggle}
                            sx={{ color: theme.palette.warning.main }}
                            size="large"
                            aria-label="menu"
                        >
                            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                    </Stack>
                )}
            </Toolbar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                PaperProps={{
                    sx: {
                        width: 260,
                        pt: 2,
                    },
                }}
            >
                <List>
                    <>
                        <ListItem disablePadding>
                            <ListItemButton
                                href="/Signup"
                                sx={{
                                    borderRadius: 2,
                                    my: 1,
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        bgcolor: theme.palette.warning.main,
                                        color: theme.palette.primary.dark,
                                    },
                                }}
                            >
                                <ListItemText primary="Start Now" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                href="/Login"
                                sx={{
                                    borderRadius: 2,
                                    my: 1,
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        bgcolor: theme.palette.warning.main,
                                        color: theme.palette.primary.dark,
                                    },
                                }}
                            >
                                <ListItemText primary="Sign In" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <LandingThemeToggle />
                        </ListItem>
                    </>
                </List>
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
