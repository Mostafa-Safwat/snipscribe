// AppRoutes.tsx
import React, { Suspense, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation, matchPath } from 'react-router-dom';
import routes from './routeConfig';
import { useAuth } from '@/hooks/useAuth';
import { AnimatePresence } from 'framer-motion';
import LoadingFallback from '@/components/common/LoadingFallback';
import { useDispatch } from 'react-redux';
import { setRedirectPath } from '@/store/slices/redirectPathSlice';

const AppRoutes: React.FC = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const protectedRoute = routes.find(route => {
            if (!route.protected) return false;
            return matchPath({ path: route.path, end: true }, location.pathname);
        });

        if (protectedRoute) {
            dispatch(setRedirectPath(location.pathname + location.search));
        }
    }, [location]);

    return (
        <Suspense fallback={<LoadingFallback />}>
            <AnimatePresence mode="wait">
                <Routes>
                    {routes.map(route => {
                        const Component = route.component;

                        if (route.protected && !user) {
                            return (
                                <Route key={route.path} path={route.path} element={<Navigate to="/signin" replace />} />
                            );
                        }

                        if (route.layout) {
                            const Layout = route.layout;
                            return (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Component />
                                        </Layout>
                                    }
                                />
                            );
                        }

                        return <Route key={route.path} path={route.path} element={<Component />} />;
                    })}
                </Routes>
            </AnimatePresence>
        </Suspense>
    );
};

export default AppRoutes;
