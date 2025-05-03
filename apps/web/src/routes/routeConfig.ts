import { lazy, ComponentType } from "react";
import MainLayout from "@/layouts/MainLayout";
import Register from "@/pages/register/Register";

const Login = lazy(() => import("@/pages/login/Login"));
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const NotFound = lazy(() => import("@/pages/not-found/NotFound"));

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
    path: "/login",
    component: Login,
    exact: true,
    protected: false,
  },
  {
    path: "/register",
    component: Register,
    exact: true,
    protected: false,
  },
  {
    path: "/home",
    component: Dashboard,
    layout: MainLayout,
    exact: true,
    protected: true,
  },
  {
    path: "*",
    component: NotFound,
    protected: false,
  },
];

export default routes;
