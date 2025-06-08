import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import routes from './routeConfig';
import { useAuth } from '@/hooks/useAuth';
import { AnimatePresence } from 'framer-motion';
import LoadingFallback from '@/components/common/LoadingFallback';

const AppRoutes: React.FC = () => {
    const { user } = useAuth();

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
