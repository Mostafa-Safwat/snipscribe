import React, { useState } from 'react';
import { Alert, Collapse } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form } from 'formik';
import FormTextField from '@/components/form/FormTextField';
import PasswordField from '@/components/form/PasswordField';
import { registrationValidationSchema } from './validationSchema';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/auth.service';
import { LoginProvider } from '@/types/enums';
import { CreateUserRequest } from '@snipscribe/typescript-client';

interface RegistrationFormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegistrationForm: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const { initUser } = useAuth();
    const auth = authService();

    const initialValues: RegistrationFormValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const handleSubmit = async (
        values: RegistrationFormValues,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        setError(null);

        try {
            const registerRequest: CreateUserRequest = {
                createUserDto: {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                },
            };

            // Call the registration API
            await auth.localRegister(registerRequest);

            // After successful registration, automatically log in the user
            const loginResponse = await auth.localLogin({
                loginDto: {
                    email: values.email,
                    password: values.password,
                },
            });

            if (loginResponse && loginResponse.user) {
                // Initialize user session
                initUser(loginResponse.user, LoginProvider.LOCAL);
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(err instanceof Error ? err.message : 'An error occurred during registration. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={registrationValidationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form style={{ width: '100%' }}>
                    <Collapse in={!!error} timeout={500}>
                        <Alert severity="error" sx={{ mb: 2, width: '100%' }} onClose={() => setError(null)}>
                            {error}
                        </Alert>
                    </Collapse>

                    <FormTextField
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />

                    <FormTextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />

                    <PasswordField
                        type="password"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        id="password"
                        autoComplete="new-password"
                    />

                    <PasswordField
                        type="password"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        id="confirmPassword"
                        autoComplete="new-password"
                    />

                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        loading={isSubmitting}
                        loadingIndicator="Creating account..."
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                        Sign Up
                    </LoadingButton>
                </Form>
            )}
        </Formik>
    );
};

export default RegistrationForm;
