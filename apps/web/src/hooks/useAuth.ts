import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import {
    logout,
    refreshTokenIsExpired,
    initUser,
    refreshUserInfo as refreshUserInfoThunk,
} from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import { UserDto } from '@snipscribe/typescript-client';
import { LoginProvider } from '@/types/enums';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
    id: '1',
    name: 'Demo User',
    email: 'user@example.com',
    role: 'admin',
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/logout');
    };

    const handleTokenExpired = () => {
        dispatch(refreshTokenIsExpired());
        if (window.location.pathname !== '/login') {
            navigate({
                pathname: '/login',
                search: `?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`,
            });
        }
    };

    const handleInitUser = (user: UserDto, loginProvider: LoginProvider, redirectUrl?: string) => {
        dispatch(initUser({ user, loginProvider, redirectUrl }));

        if (redirectUrl) {
            navigate(redirectUrl);
            return;
        }

        navigate(`/home`);
        toast.success('Welcome back!');
    };

    const refreshUserInfo = async () => {
        return dispatch(refreshUserInfoThunk()).unwrap();
    };

    return {
        ...auth,
        logout: handleLogout,
        refreshTokenIsExpired: handleTokenExpired,
        initUser: handleInitUser,
        refreshUserInfo,
    };
};

export const useDemoAuth = () => {
    return {
        user: DEMO_USER,
        loading: false,
        login: async () => {
            /* Do nothing */
        },
        logout: () => {
            /* Do nothing */
        },
    };
};
