import { Box, Flex, HStack, Button, Text, Avatar, LinkBox, LinkOverlay, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, IconButton} from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { HamburgerIcon } from "@chakra-ui/icons"
import { FaSignOutAlt } from "react-icons/fa"
import { auth, db } from "../../firebase/firebase"
import { useState, useEffect} from "react"
import { doc, onSnapshot} from 'firebase/firestore';
import { Loading } from "../helper/Loading";

export const NavBar = () => {

    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = window.innerWidth <= 768;

    const fetchUserDetails = () => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            const unsubscribe = onSnapshot(userDocRef, (doc) => {
              if (doc.exists()) {
                setUserDetails(doc.data());
              } else {
                console.log('User Sign Out');
              }
              setLoading(false);
            });

            return unsubscribe;
          }
        });
      };

    useEffect (() => {
        const unsubscribe = fetchUserDetails();
        unsubscribe && unsubscribe();
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
            {isMobile ? (
                <Flex align="center" justify="space-between" direction="row">
                    <IconButton
                        aria-label="Menu"
                        icon={<HamburgerIcon />}
                        size="md"
                        variant="ghost"
                        onClick={onOpen}
                    />
                    <Text m="10px" fontSize={{ base: 'md', md: 'lg' }} className="font-pacifico font-bold tracking-wide ">Prakarsa Hijau</Text>
                </Flex>
            ) : (
                <Flex align="center" justify="space-between" direction="row">
                    <Text m="10px" fontSize={{ base: 'md', md: 'lg' }} className="font-pacifico font-bold tracking-wide ">Prakarsa Hijau</Text>
                    <HStack spacing={{ base: '12px', md: '24px' }} ml={{ base: "5%", md: "5%", lg: "5%" }}>
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
                        {userDetails?.role !== 'normal' && userDetails?.role !== 'advance' && (
                            <LinkBox as="div" p="5px" _hover={{ bg: 'whiteAlpha.200' }}>
                                <LinkOverlay as={NavLink} _activeLink={{fontWeight: "bold"}} to='/request-role'>
                                    Request
                                </LinkOverlay>
                            </LinkBox>
                        )}
                    </HStack>
                    <Flex align="center">
                        <HStack spacing="24px">
                        <IconButton icon={<FaSignOutAlt />} onClick={handleLogout}></IconButton>
                        <NavLink to='/profile'>
                            <Avatar name={userName || 'User Guest'}  src={ userDetails.avatar || 'https://bit.ly/broken-link' }/>
                        </NavLink>
                        </HStack>
                    </Flex>
                </Flex>
            )}

            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>
                            <Flex align="center">
                                <Avatar name={userName || 'User Guest'} src={ userDetails.avatar || 'https://bit.ly/broken-link' } />
                                <Text ml={3}>{userDetails.displayName}</Text>
                            </Flex>
                        </DrawerHeader>
                        <DrawerBody>
                            <HStack spacing={{ base: '12px', md: '24px' }} flexDir="column">
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
                                <LinkBox as="div" p="5px" _hover={{ bg: 'whiteAlpha.200' }}>
                                    <LinkOverlay as={NavLink} _activeLink={{fontWeight: "bold"}} to='/profile'>
                                        Profile
                                    </LinkOverlay>
                                </LinkBox>
                                {userDetails?.role !== 'normal' && userDetails?.role !== 'advance' && (
                                    <LinkBox as="div" p="5px" _hover={{ bg: 'whiteAlpha.200' }}>
                                        <LinkOverlay as={NavLink} _activeLink={{fontWeight: "bold"}} to='/request-role'>
                                            Request
                                        </LinkOverlay>
                                    </LinkBox>
                                )}
                            </HStack>
                        </DrawerBody>
                        <Button mt={4} onClick={handleLogout}>
                            Log Out
                        </Button>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </Box>

    )
}