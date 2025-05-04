import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserDto } from '@snipscribe/typescript-client';

import { LoginProvider } from '@/types/enums';
import { IError } from '@/types/exceptions';

interface AuthState {
    user: UserDto | null;
    loginProvider: LoginProvider;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loginProvider: LoginProvider.NONE,
    loading: false,
    error: null,
};

export const refreshUserInfo = createAsyncThunk('auth/refreshUserInfo', async (_, { rejectWithValue }) => {
    try {
        // return await authService.getMe();
    } catch (err) {
        const error = err as IError;
        return rejectWithValue(error.message || 'Failed to refresh user info');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserDto>) => {
            state.user = action.payload;
        },
        setLoginProvider: (state, action: PayloadAction<LoginProvider>) => {
            state.loginProvider = action.payload;
        },
        clearUser: state => {
            state.user = null;
            state.loginProvider = LoginProvider.NONE;
        },
        logout: state => {
            state.user = null;
            state.loginProvider = LoginProvider.NONE;
        },
        refreshTokenIsExpired: state => {
            state.user = null;
            state.loginProvider = LoginProvider.NONE;
        },
        accessDenied: state => {
            state.user = null;
            state.loginProvider = LoginProvider.NONE;
        },
        initUser: (
            state,
            action: PayloadAction<{
                user: UserDto;
                loginProvider: LoginProvider;
                redirectUrl?: string;
            }>
        ) => {
            const { user, loginProvider } = action.payload;
            state.user = user;
            state.loginProvider = loginProvider;
        },
    },
});

export const { setUser, setLoginProvider, clearUser, logout, refreshTokenIsExpired, accessDenied, initUser } =
    authSlice.actions;

export default authSlice.reducer;
