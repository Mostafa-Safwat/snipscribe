import { lazy, ComponentType } from 'react';
import MainLayout from '@/layouts/MainLayout';
import Register from '@/pages/register/Register';
import NewSummaryRequest from '@/pages/new-summary-request/NewSummaryRequest';

const Login = lazy(() => import('@/pages/login/Login'));
const Home = lazy(() => import('@/pages/home/Home'));
const NotFound = lazy(() => import('@/pages/not-found/NotFound'));

export interface RouteConfig {
    path: string;
    component: ComponentType;
    layout?: React.ComponentType<{ children: React.ReactNode }>;
    exact?: boolean;
    protected?: boolean;
    children?: RouteConfig[];
}

const routes: RouteConfig[] = [
    {
        path: '/login',
        component: Login,
        exact: true,
        protected: false,
    },
    {
        path: '/register',
        component: Register,
        exact: true,
        protected: false,
    },
    {
        path: '/home',
        component: Home,
        layout: MainLayout,
        exact: true,
        protected: true,
    },
    {
        path: '/new-summary-request',
        component: NewSummaryRequest,
        layout: MainLayout,
        exact: true,
        protected: true,
    },
    {
        path: '*',
        component: NotFound,
        protected: false,
    },
];

export default routes;
