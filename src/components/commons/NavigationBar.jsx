import { Box, Flex, Image, HStack, Button, Spacer, Text, Avatar} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { auth, db } from "../../firebase/firebase"
import { useState, useEffect} from "react"
import { doc, getDoc } from 'firebase/firestore';

export const NavBar = () => {

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

    const handleLogout = async () => {
        try {
            await auth.signOut();
            window.location.assign('/login');
        } catch (error) {
            console.error('Error signing out', error);
        }
    }

    const userName = userDetails?.displayName;

    return (
        <Box bg="green" w="100%" p={4} color={"white"}>
            <Flex>
                <Text m="10px">PrakarsaHijau</Text>
            <HStack spacing="24px" ml="20%">
                <Box>
                    <Link to='/landing'>
                        Home
                    </Link>
                </Box>
                <Box>
                    Tips
                </Box>
                <Box>
                    <Link to='/article'>
                        Article
                    </Link>
                </Box>
                <Box>
                    Contribute
                </Box>
                <Box>
                    About Us
                </Box>
            </HStack>
            <Spacer/>
            <HStack>
            <Button 
                size="sm" 
                mr="10px"
                onClick={handleLogout}
                >Log Out</Button>
            <Link to='/profile'>
                <Avatar name={userName} src='https://bit.ly/broken-link' />
            </Link>
            </HStack>
            </Flex>

        </Box>
    )
}