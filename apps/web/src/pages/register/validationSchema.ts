import * as Yup from 'yup';

export const registrationValidationSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Username must be at least 2 characters')
        .max(50, 'Username cannot exceed 50 characters')
        .required('Username is required'),

    email: Yup.string().email('Please enter a valid email address').required('Email is required'),

    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('Password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
});
