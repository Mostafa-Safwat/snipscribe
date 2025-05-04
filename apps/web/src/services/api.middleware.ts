import { BaseAPI, Configuration, ErrorContext, Middleware, ResponseContext } from '@snipscribe/typescript-client';
import qs from 'qs';

import { CustomException } from '@/types/exceptions';

import { refreshTokenService } from './refresh-token.service';
import { authService } from './auth.service';
import { store } from '@/store';
import { logout } from '@/store/slices/authSlice';

interface RequestInitWithRetries extends RequestInit {
    retries?: number;
}

export const middleware: Middleware = {
    post: async (context: ResponseContext & { init: RequestInitWithRetries }): Promise<void | Response> => {
        if (context.response.status === 401) {
            return handle401(context);
        } else if (context.response.status >= 400 && context.response.status < 409) {
            return handle40x(context);
        } else if (context.response.status === 409) {
            throw new CustomException(await context.response.json());
        } else if (context.response.status >= 500) {
            throw new CustomException({
                error: 'InternalServerError',
                message: 'Internal Server Error',
                statusCode: context.response.status,
            });
        }
        context.init.retries = 0;
        return;
    },
    onError: async (context: ErrorContext): Promise<void | Response> => {
        return context.response;
    },
};
const config: Configuration = new Configuration({
    middleware: [middleware],
    fetchApi(input, init: RequestInitWithRetries) {
        if (init.retries === undefined) {
            init.retries = 0;
        } else {
            init.retries++;
        }
        return fetch(input, init);
    },
    basePath: '',
    queryParamsStringify: params => qs.stringify(params),
});

const handle40x = async (context: any) => {
    let response: any;
    try {
        response = await context.response.json();
    } catch {
        throw new CustomException({
            error: 'InternalServerError',
            message: 'Internal Server Error',
            statusCode: 502,
        });
    }
    throw new CustomException(response);
};

const handle401 = async (context: ResponseContext & { init: RequestInitWithRetries }) => {
    if (context.init.retries && context.init.retries >= 2) {
        if (context.url.includes('auth/logout')) {
            return;
        }
        store.dispatch(logout());

        window.location.href = '/login';

        const { logout: apiLogout } = authService();
        await apiLogout();

        throw new Error('Unauthorized');
    }
    const { getNewRefreshToken } = refreshTokenService();

    await getNewRefreshToken();
    return context.fetch(context.url, context.init);
};

export class ApiClientFactory {
    static createApiClient<T extends BaseAPI>(apiClass: new (..._args: any[]) => T): T {
        if (apiClass.prototype instanceof BaseAPI) {
            return new apiClass(config);
        } else {
            throw new Error('Invalid API class provided');
        }
    }
}
