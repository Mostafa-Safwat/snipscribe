import { FormProps } from '@/components/form/types';
import { userService } from '@/services/user.service';
import { UpdateUserDto } from '@snipscribe/typescript-client';
import * as yup from 'yup';
import { store } from '@/store';
import { toast } from 'react-toastify';

export const userSettingsUpdateFields: FormProps = {
    initialValues: {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        sharing: false,
        notifications: true,
    },
    validation: yup.object().shape({
        email: yup.string().required('Name is required'),
        username: yup.string().required('Description is required'),
        password: yup
            .string()
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            ),
        confirmPassword: yup.string().when('password', {
            is: (val: string) => !!val,
            then: schema =>
                schema.required('Confirm Password is required').oneOf([yup.ref('password')], 'Passwords must match'),
            otherwise: schema => schema.notRequired(),
        }),
    }),
    onSubmit: async values => {
        const userId = store.getState().auth.user?.id;

        if (!userId) return;

        const updateData: UpdateUserDto = {};

        if (values.email) updateData.email = values.email;
        if (values.username) updateData.username = values.username;
        if (values.password && values.password === values.confirmPassword) updateData.password = values.password;
        if (values.sharing !== undefined) updateData.sharing = values.sharing;
        if (values.notifications !== undefined) updateData.notifications = values.notifications;

        const { updateUser } = userService();

        const updatedUser = await updateUser({ userId, updateUserDto: updateData });

        toast.success('User settings updated successfully');

        return updatedUser;
    },
    fields: [
        {
            name: 'email',
            label: 'Email',
            type: 'text',
        },
        {
            name: 'username',
            label: 'Username',
            type: 'text',
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
        },
        {
            name: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
        },
        {
            name: 'sharing',
            label: 'Sharing',
            type: 'toggle',
            sx: { width: { xs: '100%', sm: '15%' }, mt: 2 },
        },
        {
            name: 'notifications',
            label: 'Notifications',
            type: 'toggle',
            sx: { width: { xs: '100%', sm: '15%' } },
        },
    ],
};
