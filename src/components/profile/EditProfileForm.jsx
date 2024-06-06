import React, { useState } from 'react';
import {
  Flex,
  Box,
  Text,
  Tooltip,
  IconButton,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { InfoOutlineIcon, ArrowBackIcon, AddIcon} from "@chakra-ui/icons";
import { auth, db, storage } from '../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Loading } from '../helper/Loading';
import { useFormProfile } from '../../utils/hooks/useFormProfile';
import { useNavigate } from 'react-router-dom';

export const EditProfileForm = () => {
    const [avatarFile, setAvatarFile] = useState(null);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    
    const navigate = useNavigate();
    
    const [formValues, handleInputChange, resetForm] = useFormProfile({
      displayName: '',
      title: '',
      aboutMe: '',
    });
    
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

    const handleBack = () => {
      navigate(-1);
    }
    
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
        navigate('/profile'); 
      } catch (error) {
        console.error("Failed to save profile:", error);
      }
    };
    
    if (uploadingAvatar) {
      return <Loading text='We updating your profile...'/>
    }
    
    return (
      <Flex direction="column" align="center" justify="center" h="100vh">
          <Box w="50%">
              <form onSubmit={onSave}>
                  <Flex justifyContent="space-between" alignItems="center" mb={4}>
                      <Text fontSize="2xl" fontWeight="bold" color="green.500">
                          Edit Profile
                      </Text>
                      <Tooltip label="Please provide accurate and helpful information." fontSize="md">
                          <IconButton aria-label="Info" icon={<InfoOutlineIcon />} />
                      </Tooltip>
                  </Flex>
                  <Input
                      type="text"
                      placeholder="Username"
                      name="displayName"
                      value={formValues.displayName}
                      onChange={handleInputChange}
                      mb={4}
                  />
                  <Input
                      type="text"
                      placeholder="Job"
                      name="title"
                      value={formValues.title}
                      onChange={handleInputChange}
                      mb={4}
                  />
                  <Textarea
                      placeholder="About Me"
                      name="aboutMe"
                      value={formValues.aboutMe}
                      onChange={handleInputChange}
                      mb={4}
                  />
                  <Text>Change your avatar profile ?</Text>
                  <Input
                      type="file"
                      onChange={onAvatarChange}
                      mb={3} p={5} h='auto'
                  />
                  <Button leftIcon={<ArrowBackIcon />} colorScheme="green" onClick={resetForm && handleBack} mr={4}>
                      Cancel
                  </Button>
                  <Button rightIcon={<AddIcon />} colorScheme="green" type="submit">
                      Save
                  </Button>
              </form>
          </Box>
      </Flex>
  );
}