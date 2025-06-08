import { Middleware } from '@reduxjs/toolkit';
import { setRedirectPath } from '../slices/redirectPathSlice';
import routes from '../../routes/routeConfig';

function isProtectedRoute(path: string): boolean {
    return routes.some(route => {
        if (!route.protected) return false;
        if (route.path.includes(':')) {
            const base = route.path.split('/:')[0];
            return path.startsWith(base);
        }
        return route.path === path;
    });
}

export const routeMiddleware: Middleware = store => next => action => {
    if (
        typeof action === 'object' &&
        action !== null &&
        'type' in action &&
        (action as any).type === '@@router/LOCATION_CHANGE'
    ) {
        const path = (action as any).payload.location.pathname;
        if (isProtectedRoute(path)) {
            store.dispatch(setRedirectPath(path));
        }
    }
    return next(action);
};
