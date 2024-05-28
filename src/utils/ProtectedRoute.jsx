import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useToast } from '@chakra-ui/react';

export const ProtectedRoute = (path, element) => {
  const { currentUser } = useContext(AuthContext);
  const toast = useToast();

  if (currentUser && currentUser.role !== 'advance') {
    toast({
      title: "Access Denied",
      description: "You do not have access to this page.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <Route path={path} element={
      currentUser && currentUser.role === 'advance'
        ? element
        : <Navigate to="/landing" />
    } />
  );
};