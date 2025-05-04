import { AuthApi, LoginRequest } from '@snipscribe/typescript-client';

import { ApiClientFactory } from './api.middleware';

export function authService() {
    const authApiClient = ApiClientFactory.createApiClient(AuthApi);

    async function localLogin(params: LoginRequest) {
        return await authApiClient.login(params);
    }

    return {
        localLogin,
    };
}
