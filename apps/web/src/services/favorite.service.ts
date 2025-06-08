import {
    AddSummaryToFavoritesRequest,
    FavoritesApi,
    GetFavoritesRequest,
    RemoveSummaryFromFavoritesRequest,
} from '@snipscribe/typescript-client';

import { ApiClientFactory } from './api.middleware';

export function favoriteService() {
    const favoritesApiClient = ApiClientFactory.createApiClient(FavoritesApi);

    async function getFavorites(params: GetFavoritesRequest) {
        return await favoritesApiClient.getFavorites(params);
    }

    async function addSummaryToFavorites(params: AddSummaryToFavoritesRequest) {
        return await favoritesApiClient.addSummaryToFavorites(params);
    }

    async function removeSummaryFromFavorites(params: RemoveSummaryFromFavoritesRequest) {
        return await favoritesApiClient.removeSummaryFromFavorites(params);
    }

    return {
        getFavorites,
        addSummaryToFavorites,
        removeSummaryFromFavorites,
    };
}
