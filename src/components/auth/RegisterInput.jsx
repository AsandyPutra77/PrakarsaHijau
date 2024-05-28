import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link as ChakraLink,
  useToast,
  Grid,
  GridItem,
  Image,
  Icon
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

export const RegisterInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          uid: user.uid,
          displayName: fName + ' ' + lName,
          role: 'normal'
        });
      }
      console.log("User Registered Successfully !");
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,
        onCloseComplete: () => navigate('/login')
      });
    } catch (error) {
      console.log(error.message);
      toast({
        title: 'Account failed to create.',
        description: "Email already in use or password is too weak.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
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
              <Heading fontSize={'4xl'} textAlign={'center'}>
                Sign up
              </Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                Selamat Datang di <Box as="span" align="center" color={"green"}>Prakarsa Hijau</Box>
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >
              <form onSubmit={handleRegister}>
                <Stack spacing={4}>
                  <HStack>
                    <Box>
                      <FormControl id="firstName" isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Flex align="center">
                          <Icon as={FaUser} color="gray.400" />
                          <Input
                            type="text"
                            className='form-control'
                            placeholder='Nama depan'
                            value={fName}
                            onChange={(e) => setFName(e.target.value)}
                          />
                        </Flex>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="lastName">
                        <FormLabel>Last Name</FormLabel>
                        <Flex align="center">
                          <Icon as={FaUser} color="gray.400" />
                          <Input
                            type="text"
                            className='form-control'
                            placeholder='Nama belakang'
                            value={lName}
                            onChange={(e) => setLName(e.target.value)}
                          />
                        </Flex>
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl id="email" isRequired>
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
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Flex align="center" width="100%">
                        <Icon as={FaLock} color="gray.400" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          className='form-control'
                          placeholder='Masukkan Password Anda...'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          flex="1"
                        />
                        <InputRightElement h={'full'}>
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
                  <Stack spacing={10}>
                    <Button
                      type='submit'
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack>
                    <Box textAlign={'center'}>
                      Already a user? <ChakraLink as={ReactRouterLink} color={'blue.400'} to="/login">Login</ChakraLink>
                    </Box>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>
      </GridItem>
    </Grid>
  );
};
