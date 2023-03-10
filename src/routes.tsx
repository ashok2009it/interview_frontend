import { useEffect, Suspense, lazy } from 'react';
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import { getMe, MeResponse } from './api/auth';
import Loader from './components/Loader/loader';
import Dashboard from './pages/dashboard';
import Teams from './pages/teams';
import TeamDetail from './pages/teams/detail';
import User from './pages/user';
import UserDetail from './pages/user/detail';
import { NonAuth, RequireAuth, useAuth } from './provider/authProvider';

const SignIn = lazy(() => import('./pages/signin'));

const AppRoutes = () => {
  const auth = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    if (auth.token) {
      void getProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token]);

  const getProfile = async () => {
    const meResponse: MeResponse = await getMe();
    if (meResponse.success) {
      auth.setUserData(meResponse.user);
    }
  };

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/signin' replace />}></Route>

      <Route element={<NonAuth />}>
        <Route
          path='/signin'
          element={
            <Suspense
              fallback={<Loader isShowing={true} allowHide={false}></Loader>}
            >
              <SignIn />
            </Suspense>
          }
        />
      </Route>
      <Route element={<RequireAuth />}>
        <Route
          path='/dashboard'
          element={
            <Suspense
              fallback={<Loader isShowing={true} allowHide={false}></Loader>}
            >
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path='/users'
          element={
            <Suspense
              fallback={<Loader isShowing={true} allowHide={false}></Loader>}
            >
              <User />
            </Suspense>
          }
        />
        <Route
          path='/user/:id'
          element={
            <Suspense
              fallback={<Loader isShowing={true} allowHide={false}></Loader>}
            >
              <UserDetail />
            </Suspense>
          }
        />
        <Route
          path='/teams'
          element={
            <Suspense
              fallback={<Loader isShowing={true} allowHide={false}></Loader>}
            >
              <Teams />
            </Suspense>
          }
        />
        <Route
          path='/team/:id'
          element={
            <Suspense
              fallback={<Loader isShowing={true} allowHide={false}></Loader>}
            >
              <TeamDetail />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
