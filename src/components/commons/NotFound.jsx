import React from 'react';
import { Box, Text, Button, Image, VStack, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box 
      height="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      backgroundImage="/assets/bg notfound.jpg" 
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Flex direction="row" align="center" justify="center">
        <VStack spacing={5} textAlign="left" color="white">
          <Text fontSize="8xl" fontWeight="bold">404-error</Text>
          <Text fontSize="4xl">Page Not Found</Text>
          <Text fontSize="2xl">The Page you are looking for is not Found!</Text>
          <Link to="/">
            <Button
              colorScheme="yellow" 
              variant="solid" 
              borderRadius="full" 
              boxShadow="dark-lg" 
              color="green.700"
            >
              Back to Home
            </Button>
          </Link>
        </VStack>
        <Image src="/assets/404-icon 1.png" alt="404 Icon" boxSize="800px" ml={10} />
      </Flex>
    </Box>
  );
}

export default NotFound;
