import React from 'react';
import { Outlet } from 'react-router';
import LoadingPanel from '../LoadingPanel';
import useAuth from '../../hooks/useAuth';


const AuthGaurd = () => {
  const { userData } = useAuth();
  if (!userData || Object.keys(userData).length <= 1) {
    return <LoadingPanel />;
  }
  return <Outlet />;
};

export default AuthGaurd;
