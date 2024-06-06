import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

export const ProtectedRoute = (path, element) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route path={path} element={
      currentUser && currentUser.role === 'advance'
        ? element
        : <Navigate to="/landing" />
    } />
  );
};

export const ProtectedAdminRoute = (path, element) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route path={path} element={
      currentUser && currentUser.role === 'admin'
        ? element
        : <Navigate to="/landing" />
    } />
  );
}