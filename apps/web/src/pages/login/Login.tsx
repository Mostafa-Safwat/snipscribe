import React, { useEffect } from 'react';
import { Container, Paper, Typography, Box, Avatar, useTheme } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { useAuth } from '@/hooks/useAuth';

const Login: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlined />
                    </Avatar>

                    <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                        Sign In
                    </Typography>

                    <LoginForm />

                    <Box
                        sx={{
                            mt: 2,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Link
                            to="/forgot-password"
                            style={{
                                textDecoration: 'none',
                                color: theme.palette.primary.main,
                                fontSize: '0.875rem',
                            }}
                        >
                            Forgot password?
                        </Link>

                        <Link
                            to="/register"
                            style={{
                                textDecoration: 'none',
                                color: theme.palette.primary.main,
                                fontSize: '0.875rem',
                            }}
                        >
                            Create an account
                        </Link>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;
