import * as React from 'react';
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    ListItemIcon,
    Menu as MuiMenu,
    MenuItem,
    Tooltip,
    ListItem,
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import ThemeToggle from '../common/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

const Menu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { user, logout } = useAuth();

    const userInitial = user?.username ? user.username.charAt(0).toUpperCase() : 'U';

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleClose();
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    mx: 3,
                }}
            >
                <Tooltip title="Account settings">
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                bgcolor: 'primary.main',
                            }}
                        >
                            {userInitial}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <MuiMenu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <ListItem>
                    <ThemeToggle />
                </ListItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </MuiMenu>
        </React.Fragment>
    );
};

export default Menu;
