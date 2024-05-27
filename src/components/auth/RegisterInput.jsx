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
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db} from '../../firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const RegisterInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [ fName, setFName ] = useState('')
  const [ lName, setLName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const navigate = useNavigate();

  const toast = useToast()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          uid: user.uid,
          displayName: fName + ' ' + lName
        }) 
        
      }
      console.log("User Registered Successfully !")
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,
        onCloseComplete: () => navigate('/login')
 
      })
      
    } catch (error) {
      console.log(error.message)
      toast({
        title: 'Account failed to create.',
        description: "Email already in use or password is too weak.",
        status: 'error',
        duration: 9000,
        isClosable: true,})
    }
  }

  return (
    <Flex
      align={'center'}
      justify={'center'}
      mt='90px'
      bg={useColorModeValue('gray.50', 'gray.800')}
      style={{overflow: 'hidden'}}>
      <Stack spacing={8} maxW={'lg'} style={{minHeight: '100vh'}}>
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
          p={8}>
          <form onSubmit={handleRegister}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" 
                    className='form-control'
                    placeholder='Nama depan'
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" 
                  className='form-control'
                  placeholder='Nama belakang'
                  value={lName}
                  onChange={(e) => setLName(e.target.value)}/>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" 
                className='form-control'
                placeholder='Masukkan Email Anda...'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} 
                  className='form-control'
                  placeholder='Masukkan Password Anda...'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Button
                type='submit'
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
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
  );
}