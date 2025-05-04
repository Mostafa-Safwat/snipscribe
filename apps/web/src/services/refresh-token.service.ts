import { api } from '@/config';
import { store } from '@/store';
import { refreshTokenIsExpired } from '@/store/slices/authSlice';

export function refreshTokenService() {
    async function getNewRefreshToken() {
        try {
            const response = await fetch(`${api}/auth/refresh`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.status === 401) {
                // Directly dispatch to the store without needing a hook
                store.dispatch(refreshTokenIsExpired());
                throw new Error('Unauthorized');
            }

            if (response.status < 200 || response.status >= 300) {
                return null;
            }

            const tokens = await response.json();
            return tokens.accessToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            // Directly dispatch to the store
            store.dispatch(refreshTokenIsExpired());
            return null;
        }
    }

    return {
        getNewRefreshToken,
    };
}
