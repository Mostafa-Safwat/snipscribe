import React, { useState } from 'react';
import { Alert, Collapse } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form } from 'formik';
import { useLocation } from 'react-router-dom';
import FormTextField from '@/components/form/FormTextField';
import PasswordField from '@/components/form/PasswordField';
import { loginValidationSchema } from './validationSchema';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/auth.service';
import { LoginProvider } from '@/types/enums';

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const { initUser } = useAuth();
    const auth = authService();

    const searchParams = new URLSearchParams(location.search);
    const redirectUrl = searchParams.get('redirect') || '/home';

    const initialValues: LoginFormValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (
        values: LoginFormValues,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        setError(null);

        try {
            const response = await auth.localLogin({
                loginDto: {
                    email: values.email,
                    password: values.password,
                },
            });

            if (response && response.user) {
                initUser(response.user, LoginProvider.LOCAL, redirectUrl);
            } else {
                throw new Error('Login failed. Please check your credentials and try again.');
            }
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : 'An error occurred during login. Please try again.';

            setError(errorMessage);
            console.error('Login error:', err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={loginValidationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form style={{ width: '100%' }}>
                    <Collapse in={!!error} timeout={500}>
                        <Alert severity="error" sx={{ mb: 2, width: '100%' }} onClose={() => setError(null)}>
                            {error}
                        </Alert>
                    </Collapse>

                    <FormTextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />

                    <PasswordField
                        type="password"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        loading={isSubmitting}
                        loadingIndicator="Signing in..."
                        sx={{ mt: 2, mb: 2, py: 1.5 }}
                    >
                        Sign In
                    </LoadingButton>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
