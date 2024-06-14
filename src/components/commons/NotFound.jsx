import React from 'react';
import { Box, Text, Button, Image, VStack, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate(-1);
  }
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
      <Flex direction={{ base: "column", md: "row" }} align="center" justify="center">
        <VStack spacing={5} textAlign={{ base: "center", md: "left" }} color="white">
          <Text fontSize={{ base: "6xl", md: "8xl" }} fontWeight="bold">404-error</Text>
          <Text fontSize={{ base: "2xl", md: "4xl" }}>Page Not Found</Text>
          <Text fontSize={{ base: "xl", md: "2xl" }}>The Page you are looking for is not Found!</Text>  
            <Button
              colorScheme="yellow" 
              variant="solid" 
              borderRadius="full" 
              boxShadow="dark-lg" 
              color="green.700"

              onClick={handleBackToHome}
            >
              Back to Home
            </Button>
        </VStack>
        <Image src="/assets/404-icon 1.png" alt="404 Icon" boxSize={{ base: "300px", md: "800px" }} ml={{ base: 0, md: 10 }} />

      </Flex>
    </Box>
  );
}

export default NotFound;

