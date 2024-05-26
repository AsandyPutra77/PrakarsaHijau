import { Box, Container } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export const Layout = ({ children, isAuth = false }) => {
  return (
    <Box w="100%" h="100%" py={isAuth ? 0 : 24}>
      <Container maxW="100%" p={0}>
        {children}
      </Container>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool,
};
