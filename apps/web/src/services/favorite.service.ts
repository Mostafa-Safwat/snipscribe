import {
    AddSummaryToFavoritesRequest,
    FavoritesApi,
    RemoveSummaryFromFavoritesRequest,
} from '@snipscribe/typescript-client';

import { ApiClientFactory } from './api.middleware';

export function favoriteService() {
    const favoritesApiClient = ApiClientFactory.createApiClient(FavoritesApi);

    async function getFavorites() {
        return await favoritesApiClient.getFavorites();
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
