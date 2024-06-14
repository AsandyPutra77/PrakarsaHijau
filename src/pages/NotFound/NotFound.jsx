import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import NotFoundComponent from '../../components/commons/NotFound'; 

const NotFound = ({ redirectPage }) => {
  const navigate = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => navigate(redirectPage), 5000);
    return () => clearTimeout(timer);
  }, [navigate, redirectPage]);

  return <NotFoundComponent />;

};

NotFound.propTypes = {
  redirectPage: PropTypes.string.isRequired,
};

export default NotFound;
