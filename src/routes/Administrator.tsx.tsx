import { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import MyProfile from 'pages/MyProfile';

const Dashboard = Loadable(lazy(() => import('pages/dashboard')));
const AuthLogin = Loadable(lazy(() => import('pages/auth/auth1/login')));
const PageUserList = Loadable(lazy(() => import('pages/admin/users/list')));
const PageListPortfolios = Loadable(lazy(() => import('pages/management/portfolios/list')));
const PageFormPortfolios = Loadable(lazy(() => import('pages/management/portfolios/form')));
const PageListContacts = Loadable(lazy(() => import('pages/management/contacts/list')));
const PageListSkills = Loadable(lazy(() => import('pages/management/skills/list')));
const PageListProjects = Loadable(lazy(() => import('pages/management/projects/list')));

//  ProfileID = 1
const AdministratorRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />
        }
      ]
    },
    {
      path: '/auth',
      element: <CommonLayout />,
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        }
      ]
    },
    {
      path: '/admin',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'users/list',
          element: <PageUserList />
        },
        {
          path: 'my-profile',
          element: <MyProfile />
        }
      ]
    },
    {
      path: '/management',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'portfolios/form/:id?',
          element: <PageFormPortfolios />
        },
        {
          path: 'portfolios/list',
          element: <PageListPortfolios />
        },
        {
          path: 'contacts/list',
          element: <PageListContacts />
        },
        {
          path: 'skills/list',
          element: <PageListSkills />
        },
        {
          path: 'projects/list',
          element: <PageListProjects />
        }
      ]
    }
  ]
};

export default AdministratorRoutes;
