import { Box, Flex, HStack, Button, Spacer, Text, Avatar, LinkBox, LinkOverlay} from "@chakra-ui/react"
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
                <LinkBox as="div" p="5px" _hover={{ bg: 'whiteAlpha.200' }}>
                    <LinkOverlay as={Link} to='/landing'>
                        Home
                    </LinkOverlay>
                </LinkBox>
                <LinkBox as="div" p="5px" _hover={{ bg: 'whiteAlpha.200' }}>
                    <LinkOverlay as={Link} to='/tips'>
                        Tips
                    </LinkOverlay>
                </LinkBox>
                <LinkBox as="div" p="5px" _hover={{ bg: 'whiteAlpha.200' }}>
                    <LinkOverlay as={Link} to='/article'>
                        Article
                    </LinkOverlay>
                </LinkBox>
                {userDetails?.role !== 'normal' && (
                <LinkBox as="div" p="5px" _hover={{ bg: 'whiteAlpha.200' }}>
                    <LinkOverlay as={Link} to='/contribute'>
                        Contribute
                    </LinkOverlay>
                </LinkBox>
    )}
                <LinkBox as="div" p="5px" _hover={{ bg: 'whiteAlpha.200' }}>
                    <LinkOverlay as={Link} to='/about'>
                        About Us
                    </LinkOverlay>
                </LinkBox>
            </HStack>
            <Spacer/>
            <HStack>
            <Button 
                size="sm" 
                mr="10px"
                onClick={handleLogout}
                _hover={{ bg: 'red' }}
                >Log Out</Button>
            <Link to='/profile'>
                <Avatar name={userName} src='https://bit.ly/broken-link' />
            </Link>
            </HStack>
            </Flex>
        </Box>
    )
}