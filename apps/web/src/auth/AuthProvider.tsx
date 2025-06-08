import React, { useState, ReactNode } from 'react';
import { AuthContext } from '@/hooks/useAuth';
import { User } from './types';

// Hardcoded demo user
const DEMO_USER: User = {
    id: '1',
    name: 'Demo User',
    email: 'user@example.com',
    role: 'admin',
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(DEMO_USER);
    const [loading, setLoading] = useState(false);

    const login = async (_email: string, _password: string, rememberMe = false): Promise<void> => {
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            setUser(DEMO_USER);

            if (rememberMe) {
                localStorage.setItem('auth-token', 'demo-token');
            } else {
                sessionStorage.setItem('auth-token', 'demo-token');
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('auth-token');
        sessionStorage.removeItem('auth-token');
        setUser(null);
    };

    const contextValue = {
        user,
        loading,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
