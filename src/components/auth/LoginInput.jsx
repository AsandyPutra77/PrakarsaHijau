import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Grid,
  GridItem,
  Image,
  Icon
} from '@chakra-ui/react';

import { Link as ReactRouterLink } from 'react-router-dom';

import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Import envelope and lock icons

export const LoginInput = () => {

const [ email, setEmail ] = useState('');
const [ password, setPassword ] = useState('');
const [ isLoading, setLoading] = useState(false);


  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User Logged In Successfully !");
      toast({
        title: 'Login successful.',
        description: "You've successfully logged in.",
        status: 'success',
        duration: 4000,
        isClosable: true,
        onCloseComplete: () => navigate('/landing')
      });
    } catch (error) {
      console.log(error.message);
      toast({
        title: 'Login failed.',
        description: "Email or password is incorrect.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      minH={'100vh'}
      templateColumns={{ base: '1fr', md: '1fr 1fr' }}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <GridItem>
        <Flex align={'center'} justify={'center'} h="100%">
          <Box
            bg="#C6F6D5"
            width="100%"
            height="100%"
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src="/assets/Group 1.png"
              alt="Group 1"
              objectFit="center"
              w="60%"
              h="50%"
            />
          </Box>
        </Flex>
      </GridItem>
      <GridItem>
        <Flex align={'center'} justify={'center'} h="100%">
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign in to your account</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                Don&apos;t have an account? <Link as={ReactRouterLink} to="/register" color={'blue.400'}>Register</Link>
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Flex align="center">
                      <Icon as={FaEnvelope} color="gray.400" />
                      <Input
                        type="email"
                        className='form-control'
                        placeholder='Masukkan Email Anda...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Flex>
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Flex align="center">
                      <Icon as={FaLock} color="gray.400" />
                      <Input
                        type="password"
                        className='form-control'
                        placeholder='Masukkan Password Anda...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Flex>
                  </FormControl>
                  <Button
                    type='submit'
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    isLoading = {isLoading}
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>
      </GridItem>
    </Grid>
  );
}
