import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Paper, useTheme } from '@mui/material';
import { userSettingsUpdateFields } from './types';
import Form from '@/components/form/Form';
import { userService } from '@/services/user.service';
import { store } from '@/store';

const UserSettings: React.FC = () => {
    const theme = useTheme();

    const [loading, setLoading] = useState<boolean>(false);
    const [userSettings, setUserSettings] = useState<{
        email: string;
        username: string;
        password: string;
        confirmPassword: string;
        sharing: boolean;
        notifications: boolean;
    }>({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        sharing: false,
        notifications: true,
    });

    const getUserSettings = async () => {
        const userId = store.getState().auth.user?.id;

        if (!userId) return;

        const { getUser, getUserSettings } = userService();

        setLoading(true);
        const user = await getUser({ userId });
        const settings = await getUserSettings();

        setUserSettings({
            email: user.email,
            username: user.username,
            password: '',
            confirmPassword: '',
            sharing: settings.sharing,
            notifications: settings.notifications,
        });

        setLoading(false);
    };

    useEffect(() => {
        getUserSettings();
    }, []);

    return (
        <Box>
            <h1>User Settings</h1>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        borderRadius: 2,
                        overflow: 'hidden',
                        maxWidth: '100%',
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Form
                        fields={userSettingsUpdateFields.fields}
                        validation={userSettingsUpdateFields.validation}
                        onSubmit={userSettingsUpdateFields.onSubmit}
                        initialValues={userSettings}
                    />
                </Paper>
            )}
        </Box>
    );
};

export default UserSettings;
