import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    Avatar,
    AvatarBadge,
    Button,
    VStack,
    useToast
  } from '@chakra-ui/react';
  import { GoTrophy } from "react-icons/go";
  import { useState , useEffect} from 'react';
  import { auth, db } from '../../firebase/firebase';
  import { doc, getDoc } from 'firebase/firestore';
  
  export const ProfileCard = () => {


  const toast = useToast();
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserDetails = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('User is signed out');
      }
    });
  }

  useEffect (() => {
    fetchUserDetails()
}, [])


    if (userDetails === null) {
        return <Text>Loading...</Text>;
      }
      return (
        <Container bg="#f5f5f5" maxW="full" mt={0} h="100vh" centerContent overflow="hidden">
    <Flex direction="column" align="center" justify="center">
      <Box
        bg="#ffffff"
        color="#333"
        borderRadius="lg"
        m={4}
        p={5}
        w="80%"
        boxShadow="2xl">
        <Heading mb={4} fontSize="2xl" textAlign="center">User Profile</Heading>
        <VStack spacing={3} align="start">
        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov'>
        <AvatarBadge as={GoTrophy} boxSize="1.25em"/>
        </Avatar>
          <Text fontSize="xl" mb={2}><strong>Name:</strong> {userDetails.displayName}</Text>
          <Text fontSize="xl" mb={2}><strong>Email:</strong> {userDetails.email}</Text>
        </VStack>
        <Button colorScheme="teal" size="md" mt={4} w="full">
          Edit Profile
        </Button>
      </Box>
    </Flex>
  </Container>
      );
  }