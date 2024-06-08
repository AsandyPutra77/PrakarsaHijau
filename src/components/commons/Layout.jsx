import { Box, Container } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export const Layout = ({ children, isAuth = false }) => {
  return (
    <Box w="100%" h="100%" py={isAuth ? 0 : 24} className="flex flex-col items-center">
      <Container maxW="100%" p={0} className="overflow-x-scroll">
        {children}
      </Container>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool,
};