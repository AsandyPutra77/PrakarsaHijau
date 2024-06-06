import { Box, Flex, HStack, Button, Spacer, Text, Avatar, LinkBox, LinkOverlay} from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { auth, db } from "../../firebase/firebase"
import { useState, useEffect} from "react"
import { doc, getDoc } from 'firebase/firestore';
import { Loading } from "../helper/Loading";

export const NavBar = () => {

    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

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
      setLoading(false);
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

    if (loading) {
        return < Loading />;
    }

    return (
        <Box bg="#146E5F" w="100%" p={4} color={"white"} position="fixed" zIndex="1000">
            <Flex>
                <Text m="10px">PrakarsaHijau</Text>
            <HStack spacing="24px" ml="20%">
                <LinkBox as="div" p="5px" _hover={{ bg: 'whiteAlpha.200' }}>
                    <LinkOverlay as={NavLink} _activeLink={{fontWeight: "bold"}} to='/landing'>
                        Home
                    </LinkOverlay>
                </LinkBox>
                <LinkBox as="div" p="5px" _hover={{ bg: 'whiteAlpha.200' }}>
                    <LinkOverlay as={NavLink} _activeLink={{fontWeight: "bold"}} to='/tips'>
                        Tips
                    </LinkOverlay>
                </LinkBox>
                <LinkBox as="div" p="5px" _hover={{ bg: 'whiteAlpha.200' }}>
                    <LinkOverlay as={NavLink} _activeLink={{fontWeight: "bold"}} to='/article'>
                        Article
                    </LinkOverlay>
                </LinkBox>
                {userDetails?.role !== 'normal' && (
                <LinkBox as="div" p="5px" _hover={{ bg: 'whiteAlpha.200' }}>
                    <LinkOverlay as={NavLink} _activeLink={{fontWeight: "bold"}} to='/contribute'>
                        Contribute
                    </LinkOverlay>
                </LinkBox>
    )}
                <LinkBox as="div" p="5px" _hover={{ bg: 'whiteAlpha.200' }}>
                    <LinkOverlay as={NavLink} _activeLink={{fontWeight: "bold"}} to='/about'>
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
            <NavLink to='/profile'>
                <Avatar name={userName} src={ userDetails.avatar || 'https://bit.ly/broken-link' }/>
            </NavLink>
            </HStack>
            </Flex>
        </Box>
    )
}