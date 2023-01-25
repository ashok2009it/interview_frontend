/* eslint-disable -- TODO: fix eslint errors */

import { createContext, useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { getMe, MeResponse, User } from '../api/auth';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AuthContextType {
  isAuthenticated: () => boolean;
  user: User;
  token: string;
  signin: (token: string, callback: VoidFunction) => Promise<void>;
  setUserData: (user: User) => void;
  signout: VoidFunction;
  getProfile: (callback: VoidFunction) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage('INTERVIEW_USER', null);
  const [token, setToken] = useLocalStorage('INTERVIEW_TOKEN', null);

  const getProfile = async (callback: VoidFunction) => {
    const meResponse: MeResponse = await getMe();
    if (meResponse.success) {
      callback();
      if (!user) {
        throw Error('something went wrong');
      }
    } else {
      throw Error('something went wrong');
    }
  };

  const signin = async (token: string, callback: VoidFunction) => {
    setToken(token);
    await getProfile(callback);
  };

  const signout = () => {
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = () => {
    return token ? true : false;
  };

  const value = {
    user: JSON.parse(user),
    isAuthenticated,
    token,
    signin,
    signout,
    getProfile,
  };
  // @ts-ignore
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const RequireAuth = () => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.isAuthenticated() && !auth.user) {
    return <Navigate to='/signin' state={{ from: location }} />;
  }

  return <Outlet />;
};

export const NonAuth = () => {
  const auth = useAuth();
  const location = useLocation();
  if (auth.isAuthenticated() && auth.user) {
    return <Navigate to='/dashboard' state={{ from: location }} />;
  }
  return <Outlet />;
};
