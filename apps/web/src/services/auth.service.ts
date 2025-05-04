import { AuthApi, CreateUserRequest, LoginRequest, UsersApi } from '@snipscribe/typescript-client';

import { ApiClientFactory } from './api.middleware';

export function authService() {
    const authApiClient = ApiClientFactory.createApiClient(AuthApi);
    const usersApiClient = ApiClientFactory.createApiClient(UsersApi);

    async function localLogin(params: LoginRequest) {
        return await authApiClient.login(params);
    }

    async function localRegister(params: CreateUserRequest) {
        return await usersApiClient.createUser(params);
    }

    async function logout() {
        return await authApiClient.logout();
    }

    return {
        localLogin,
        localRegister,
        logout,
    };
}
