import {
    CreateSummaryRequest,
    GetPublicSummariesRequest,
    GetSummaryRequest,
    GetUserSummariesRequest,
    SummariesApi,
    UpdateSummaryRequest,
} from '@snipscribe/typescript-client';

import { ApiClientFactory } from './api.middleware';

export function summaryService() {
    const summariesApiClient = ApiClientFactory.createApiClient(SummariesApi);

    async function createSummaryRequest(params: CreateSummaryRequest) {
        return await summariesApiClient.createSummary(params);
    }

    async function updateSummarySharedStatus(params: UpdateSummaryRequest) {
        return await summariesApiClient.updateSummary(params);
    }

    async function getSummary(params: GetSummaryRequest) {
        return await summariesApiClient.getSummary(params);
    }

    async function getPublicSummaries(params: GetPublicSummariesRequest) {
        return await summariesApiClient.getPublicSummaries(params);
    }

    async function getOwnSummaries(params: GetUserSummariesRequest) {
        return await summariesApiClient.getUserSummaries(params);
    }

    return {
        createSummaryRequest,
        updateSummarySharedStatus,
        getSummary,
        getPublicSummaries,
        getOwnSummaries,
    };
}
