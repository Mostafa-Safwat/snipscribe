import React, { useEffect } from 'react';
import { Container, Paper, Typography, Box, Avatar, useTheme } from '@mui/material';
import { PersonAddOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import { useAuth } from '@/hooks/useAuth';

const Register: React.FC = () => {
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <PersonAddOutlined />
                    </Avatar>

                    <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                        Create Account
                    </Typography>

                    <RegistrationForm />

                    <Box
                        sx={{
                            mt: 2,
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        <Link
                            to="/signin"
                            style={{
                                textDecoration: 'none',
                                color: theme.palette.primary.main,
                                fontSize: '0.875rem',
                            }}
                        >
                            Already have an account? Sign in
                        </Link>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Register;
