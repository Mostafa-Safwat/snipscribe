import { GetUserRequest, UpdateUserRequest, UsersApi } from '@snipscribe/typescript-client';

import { ApiClientFactory } from './api.middleware';

export function userService() {
    const usersApiClient = ApiClientFactory.createApiClient(UsersApi);

    async function getUser(params: GetUserRequest) {
        return await usersApiClient.getUser(params);
    }

    async function getUserSettings() {
        return await usersApiClient.getUserSettings();
    }

    async function updateUser(params: UpdateUserRequest) {
        return await usersApiClient.updateUser(params);
    }

    return {
        getUser,
        getUserSettings,
        updateUser,
    };
}
