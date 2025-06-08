import { ComponentType } from 'react';
import MainLayout from '@/layouts/MainLayout';
import Register from '@/pages/register/Register';
import NewSummaryRequest from '@/pages/new-summary-request/NewSummaryRequest';
import SummaryOverview from '@/pages/summary-overview/SummaryOverview';
import Favorites from '@/pages/favorites/Favorites';
import History from '@/pages/history/History';
import Home from '@/pages/home/Home';
import Login from '@/pages/login/Login';
import NotFound from '@/pages/not-found/NotFound';
import Discover from '@/pages/discover/Discover';
import UserSettings from '@/pages/user-settings/UserSettings';
import Landing from '@/pages/landing/Landing';

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
        path: '/',
        component: Landing,
        exact: true,
        protected: false,
    },
    {
        path: '/signin',
        component: Login,
        exact: true,
        protected: false,
    },
    {
        path: '/signup',
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
        path: '/summary/:summaryId',
        component: SummaryOverview,
        layout: MainLayout,
        protected: true,
    },
    {
        path: '/history',
        component: History,
        layout: MainLayout,
        exact: true,
        protected: true,
    },
    {
        path: '/discover',
        component: Discover,
        layout: MainLayout,
        exact: true,
        protected: true,
    },
    {
        path: '/favorites',
        component: Favorites,
        layout: MainLayout,
        exact: true,
        protected: true,
    },
    {
        path: '/settings',
        component: UserSettings,
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
