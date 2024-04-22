import { useRoutes } from 'react-router-dom';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import AdministratorRoutes from './Administrator.tsx';
import Loadable from 'components/Loadable';
import { lazy } from 'react';
import useAuth from 'hooks/useAuth';
const Dashboard = Loadable(lazy(() => import('pages/dashboard')));

export default function ThemeRoutes() {
  const { user } = useAuth();
  const profileId = user?.profileId || 0;

  let RoutesProfile;

  switch (profileId) {
    case 1: // System Administrator
      RoutesProfile = AdministratorRoutes;
      break;
    default:
      RoutesProfile = MainRoutes;
      break;
  }

  return useRoutes([
    {
      path: '/',
      element: (
        <AuthGuard>
          <>
            <MainLayout />
            <Dashboard />
          </>
        </AuthGuard>
      )
    },
    LoginRoutes,
    RoutesProfile
  ]);
}
