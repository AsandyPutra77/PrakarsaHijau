import {
  Box,
  Badge,
  Heading,
  Text,
  Avatar,
  AvatarBadge,
  Button,
  VStack,
  HStack,
  Tag,
  TagRightIcon,
  Stack,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { IoTrophySharp } from "react-icons/io5";
import { FaBriefcase } from "react-icons/fa";
import { MdMarkEmailRead, MdVolunteerActivism} from "react-icons/md";
import { GiAchievement } from "react-icons/gi";
import { FaCrown } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { doc, onSnapshot} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { auth, db} from '../../firebase/firebase';
import { getRemoteConfig, fetchAndActivate, getAll} from 'firebase/remote-config';
import { useNavigate } from 'react-router-dom';
import { useRequest } from '../../utils/hooks/useRequest';


export const ProfileCard = () => {

  const [userDetails, setUserDetails] = useState("");
  const [totalContributor, setTotalContributor] = useState(0);
  const [, handleRoleUpgrade] = useRequest();
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();

  const fetchUserDetails = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setUserDetails(doc.data());
            setStatus(doc.data().status || null);
          } else {
            console.log('No such document!');
          }
        });
  
        // Return the unsubscribe function to clean up
        return unsubscribe;
      }
    });
  };
  
  const fetchRemoteConfig = async () => {
    const remoteConfig2 = getRemoteConfig();
    await fetchAndActivate(remoteConfig2);
    const configValues = getAll(remoteConfig2);
    const totalContributor = configValues['topContributor'].asNumber();
    setTotalContributor(totalContributor);
    console.log(totalContributor);
  };

  useEffect (() => {
    const unsubscribe = fetchUserDetails();
    fetchRemoteConfig();

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Box bg="url('/assets/bg.png')" bgSize={'cover'} bgRepeat={'no-repeat'} mt={0} w="1600p" h="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box gridArea="user" bg="#ffffff" color="#333" borderRadius="lg" m={4} p={5} boxShadow="2xl" mt='auto' mb={8} w="600px">
        <Heading mb={4} fontSize="2xl" textAlign="center">Profile</Heading>
        <VStack spacing={3} align="center" >
          <Avatar size="2xl" name={userDetails.displayName} src={userDetails.avatar || 'https://bit.ly/broken-link'}>
            {userDetails.totalTips >=  totalContributor && <AvatarBadge as={IoTrophySharp} boxSize="1.0em" color="gold" borderWidth='0px'/>}
          </Avatar>
          <HStack mt={4}>
          <Text fontSize="xl" mb={2}><strong>{userDetails.displayName}</strong></Text>
          <IconButton aria-label="Edit Profile" mb={1} variant={'outline'} icon={<CiEdit />} onClick={() => navigate('/edit-profile')} />
          </HStack>
          <HStack>
           {userDetails.totalTips >= totalContributor && 
              <Badge colorScheme='green'>
                <Flex justifyContent="space-between" width="100%">
                  <Text>Top Contributor</Text> &nbsp;
                  <GiAchievement color='black' style={{alignSelf: 'center'}}/>
                </Flex>
              </Badge>
            }
            <Tag size="md">
              <TagRightIcon boxSize="12px" as={FaBriefcase}  mr={2}/>
              {userDetails.title} 
            </Tag>
          </HStack>
          <HStack spacing={2}>
            <MdMarkEmailRead size="20px" style={{alignSelf: "center", marginBottom: 4}}/>
            <Text fontSize="md" mb={2}>{userDetails.email}</Text>
          </HStack>
          <HStack align={'center'}>
            <MdVolunteerActivism style={{alignSelf: "center", marginBottom: 8}}/> 
          <Text fontSize="md" mb={2}><strong>Total Contribution:</strong> {userDetails.totalTips || "0"}</Text>
          </HStack>
          <Box bg="lightgray" p={2} borderRadius="md">
            <Text fontSize="md" mb={2}>{userDetails.aboutMe || 'Deskripsikan dirimu !'}</Text>
          </Box>
          <Stack direction="row" spacing={4} mt={20} align="center">
          {status !== 'success' && userDetails.role !== 'admin' && (
            <Button colorScheme="green" size="md" mt={'auto'} onClick={() => {status === null && userDetails.role !== 'advance' ? handleRoleUpgrade() : null;}} disabled={status !== null || userDetails.role === 'advance'}>
              {userDetails?.role === 'advance' ? 'Role Upgraded' : (status === null ? 'Upgrade Role' : (status === 'pending' ? 'On Process !, please wait...  ' : 'Role Upgraded'))}
              &nbsp; {status === null && userDetails.role !== 'advance' && <FaCrown color='yellow'/>}
            </Button>
            )}
          </Stack>
        </VStack>
      </Box>
    </Box>
  );
}