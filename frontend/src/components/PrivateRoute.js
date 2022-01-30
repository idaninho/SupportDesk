import React from 'react';
import { Navigate } from 'react-router';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus;
  if (checkingStatus) {
    return <Spinner />;
  }
  return loggedIn ? <Navigate to="/new-ticket" /> : <Navigate to="/login" />;
};

export default PrivateRoute;
