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
  useToast
} from '@chakra-ui/react';

import {Link as ReactRouterLink } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

export const LoginInput = () => {
const [ email, setEmail ] = useState('');
const [ password, setPassword ] = useState('');

const toast = useToast();

const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
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
    })

  } catch (error) {
    console.log(error.message)
    toast({
      title: 'Login failed.',
      description: "Email or password is incorrect.",
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  }
}
  
return (
  <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          Don&apos;t have an account ? <Link as={ReactRouterLink} to="/register" color={'blue.400'}>Register</Link>✌️
        </Text>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email"
               className='form-control'
               placeholder='Masukkan Email Anda...'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password"
               className='form-control'
               placeholder='Masukkan Password Anda...'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               />
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Button colorScheme="red" w={'full'} onClick={() => {/* Add your Google sign-in logic here */}}>
                Sign in with Google 🌍
              </Button>
            </Stack>
            <Button
              type='submit'
              bg={'blue.400'}
              color={'white'}
              //onClick={ () => navigate('/landing')}
              _hover={{
                bg: 'blue.500',
              }}>
              Sign in
            </Button>
          </Stack>
        </Stack>
        </form>
      </Box>
    </Stack>
  </Flex>
);
}