import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotFoundComponent from '../../components/commons/NotFound'; // Import the NotFound component

const NotFound = ({ redirectPage }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate(redirectPage), 5000); // Redirect after 5 seconds
    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [navigate, redirectPage]);

  return <NotFoundComponent />; // Use the imported NotFound component
};

NotFound.propTypes = {
  redirectPage: PropTypes.string.isRequired,
};

export default NotFound;
