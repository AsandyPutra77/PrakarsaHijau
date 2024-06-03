import {
  Grid,
  Box,
  Badge,
  Heading,
  Text,
  Avatar,
  AvatarBadge,
  Button,
  VStack,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Tag,
  TagRightIcon,
  Stack
} from '@chakra-ui/react';
import { IoTrophySharp } from "react-icons/io5";
import { useState , useEffect} from 'react';
import { auth, db, storage } from '../../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Loading } from '../helper/Loading';
import { useFormProfile } from '../../utils/hooks/useFormProfile';
import { FaBriefcase } from "react-icons/fa";

export const ProfileCard = () => {

const [userDetails, setUserDetails] = useState(null);
const [avatarFile, setAvatarFile] = useState(null);
const [uploadingAvatar, setUploadingAvatar] = useState(false);

const [formValues, handleInputChange, resetForm] = useFormProfile({
  displayName: '',
  title: '',
  aboutMe: '',
});

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

const onAvatarChange = (e) => {
  setAvatarFile(e.target.files[0]);
};

const uploadAvatar = () => {
  if (avatarFile) {
    setUploadingAvatar(true);
    const storageRef = ref(storage, `avatars/${avatarFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, avatarFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error);
          setUploadingAvatar(false);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( (downloadURL) => {
            setUploadingAvatar(false);
            resolve(downloadURL);
          });
        }
      );
    });
  }
};

const onSave = async () => {
  try {
    let avatarUrl = null;
    if (avatarFile) {
      avatarUrl = await uploadAvatar();
    }
    const userDoc = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userDoc, {
      displayName: formValues.displayName,
      title: formValues.title,
      aboutMe: formValues.aboutMe,
      ...(avatarUrl && { avatar: avatarUrl }),
    });
    resetForm();
    fetchUserDetails();
  } catch (error) {
    console.error("Failed to save profile:", error);
  }
};

useEffect (() => {
  fetchUserDetails()
}, [])

  if (userDetails === null) {
    return <Loading />
  }

  if (uploadingAvatar) {
    return <Loading text='We updating your profile...'/>
  }

    return (
      <Box bg="url('/assets/bg.png')" bgSize={'cover'} bgRepeat={'no-repeat'} mt={0} w="100%" h="100vh" display="flex" justifyContent="center" alignItems="center">
        <Grid templateColumns="repeat(2, 1fr)" gap={6} templateAreas="'user edit'">
        <Box gridArea="user" bg="#ffffff" color="#333" borderRadius="lg" m={4} p={5} boxShadow="2xl" maxW="500px">
        <Heading mb={4} fontSize="2xl" textAlign="center">Profile</Heading>
        <VStack spacing={3} align="center" >
          <Avatar size="2xl" name={userDetails.displayName} src={userDetails.avatar || 'https://bit.ly/dan-abramov'}>
            <AvatarBadge as={IoTrophySharp} boxSize="1.0em" color="gold" borderWidth='0px'/>
          </Avatar>
          <Text fontSize="xl" mb={2}><strong>{userDetails.displayName}</strong></Text>
          <Badge colorScheme='green'>Top Contributor</Badge>
          <Text fontSize="md" mb={2}>{userDetails.email}</Text>
          <Tag size="md" mb={2}>
          <TagRightIcon boxSize="12px" as={FaBriefcase}  mr={2}/>
            {userDetails.title}
          </Tag>
          <Text fontSize="md" mb={2}><strong>Total Contribution:</strong> {userDetails.contribution || "209"}</Text>
          <Text fontSize="md" mb={2}>{userDetails.aboutMe || 'Software Developer handal yang suka bermain kartu remi tapi mengapa dia sangat besar sedangkan aku tidak'}</Text> 
          <Stack direction="row" spacing={4} align="center">
            <Button colorScheme="teal" size="md" mt={'auto'}>
              Upgrade Role
            </Button>
          </Stack>
        </VStack>
      </Box>
          <Divider orientation="vertical" borderColor='black'/>
          <Box gridArea="edit" bg="#ffffff" color="#333" borderRadius="lg" m={4} p={5} boxShadow="2xl" maxW="500px">
          <Heading mb={4} fontSize="2xl" textAlign="center">Edit Profile</Heading>
          <FormControl id="displayName" >
            <FormLabel>Username</FormLabel>
            <Input type="text" name="displayName" value={formValues.displayName} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="title" >
            <FormLabel mt={2}>Job</FormLabel>
            <Input type="text" name="title" value={formValues.title} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="avatar" >
            <FormLabel mt={2}>Avatar Profile</FormLabel>
            <Input type="file" onChange={onAvatarChange} mb={3} p={5} h='auto'/>
          </FormControl>
          <FormControl id="about-me">
            <FormLabel mt={2}>About me</FormLabel>
            <Textarea name="aboutMe" value={formValues.aboutMe} onChange={handleInputChange} />
          </FormControl>
          <Stack direction="row" spacing={4} mt={6} align="center">
            <Button colorScheme="teal" size="md" onClick={onSave}>
              Save
            </Button>
            <Button colorScheme="red" size="md" onClick={resetForm}>
              Cancel
            </Button>
          </Stack>
        </Box>
        </Grid>
      </Box>
    );
}