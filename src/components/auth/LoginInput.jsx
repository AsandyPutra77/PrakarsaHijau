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
  Icon,
  InputRightElement,
  InputGroup
} from '@chakra-ui/react';

import { Link as ReactRouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { FaEnvelope, FaLock } from 'react-icons/fa'; 
import { motion } from 'framer-motion';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export const LoginInput = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      setTimeout(() => setLoading(false), 4000); // Set loading to false after 4 seconds
    } catch (error) {
      console.log(error.message);
      toast({
        title: 'Login failed.',
        description: "Email or password is incorrect.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => setLoading(false), 9000); // Set loading to false after 9 seconds
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
            backgroundImage="url('../assets/authBg.png')"
            objectFit={'cover'}
            width="100%"
            height="100%"
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Image
                src="/assets/Group 1.png"
                alt="Group 1"
                objectFit="center"
                w="100%"
                h="100%"
              />
            </motion.div>
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
                      <Icon as={FaEnvelope} color="gray.400" mr={4}/>
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
                    <InputGroup>
                    <Flex align="center" width={'100%'}>
                      <Icon as={FaLock} color="gray.400" mr={4}/>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        className='form-control'
                        placeholder='Masukkan Password Anda...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        flex={1}
                      />
<                         InputRightElement h={'full'}>
                          <Button
                            variant={'ghost'}
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                    </Flex>
                    </InputGroup>
                  </FormControl>
                  <Button
                    type='submit'
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    isLoading={isLoading}
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
