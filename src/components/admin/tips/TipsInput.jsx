import React from "react";
import { Input, Button, Text, Flex, Box, Tooltip, IconButton, Textarea, useToast } from "@chakra-ui/react";
import { InfoOutlineIcon, ArrowBackIcon, AddIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { auth, db, storage } from "../../../firebase/firebase";
import { addDoc, collection, serverTimestamp, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { Loading } from "../../helper/Loading";

export const TipsInput = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tips, setTips] = useState([]);
    const [tag, setTag] = useState([]);
    const [image, setImage] = useState(null); 
    const [totalTips, setTotalTips] = useState(0);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleBack = () => {
        navigate(-1);
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!auth.currentUser) {
            toast({
                title: "Failed.",
                description: "User not authenticated.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        setLoading(true);
    
        const uid = auth.currentUser.uid;
    
        let imageUrl = 'https://img.freepik.com/free-photo/3d-render-globe-trees-grassy-landscape_1048-5700.jpg?t=st=1717362282~exp=1717365882~hmac=f579cea230b74992a4a60f22a152d6769541a734c6283abfda4ebf0d382e8605&w=1380'; // URL of your default image

        if (image) {
            const storageRef = ref(storage, `images/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);
    
            await new Promise((resolve, reject) => {
                uploadTask.on('state_changed', 
                    (snapshot) => {
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    }, 
                    (error) => {
                        console.log(error);
                        reject(error);
                    }, 
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            imageUrl = downloadURL;
                            resolve();
                        });
                    }
                );
            });
        }
    
        const tip = {
            title: title,
            description: description,
            tag: tag,
            imageUrl: imageUrl,
            uid: uid,
            date: serverTimestamp(),
            likes: 0,
            dislikes: 0,
            totalComments: 0,
        };
    
        setTips([...tips, { title, description, tag, imageUrl: imageUrl, uid, date: serverTimestamp()}]);
        setTitle("");
        setDescription("");
        setTag([]);
        setImage(null);
    
        const addDocument = async () => {
            try {
                const docRef = await addDoc(collection(db, 'tips'), tip);
                console.log("Document written with ID: ", docRef.id);

                // Fetch current user's totalTips
                const userDoc = doc(db, 'users', uid);
                const userDocSnap = await getDoc(userDoc);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    const newTotalTips = (userData.totalTips || 0) + 1;
                    setTotalTips(newTotalTips);

                    await updateDoc(userDoc, {
                        totalTips: newTotalTips,
                    });
                }

                toast({
                    title: "Success.",
                    description: "Tip added successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                navigate('/tips');
            } catch (e) {
                console.error("Error adding document: ", e);
                toast({
                    title: "Failed.",
                    description: "Tip failed to add.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };

        addDocument();
    };

    useEffect(() => {
        console.log(tips);
    }, [tips]);

    if (loading) {
        return <Loading />;
    }

    return (
        <Flex direction="column" align="center" justify="center" h="100vh">
            <Box w="50%">
                <form onSubmit={handleSubmit}>
                    <Flex justifyContent="space-between" alignItems="center" mb={4}>
                        <Text fontSize="2xl" fontWeight="bold" color="green.500">
                            Add Tips
                        </Text>
                        <Tooltip label="Please provide responsible and helpful tips." fontSize="md">
                            <IconButton aria-label="Info" icon={<InfoOutlineIcon />} />
                        </Tooltip>
                    </Flex>
                    <Input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        mb={4}
                    />
                    <Input
                        type="text"
                        placeholder="#Tag"
                        value={tag.join(',')}
                        onChange={(e) => setTag(e.target.value.split(','))}
                        mb={4}
                    />
                    <Textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        mb={4}
                    />
                    <Input
                        type="file"
                        onChange={handleImageChange}
                        mb={3} p={5} h='auto'
                    />
                    <Button leftIcon={<ArrowBackIcon />} colorScheme="green" onClick={handleBack} mr={4}>
                        Back
                    </Button>
                    <Button rightIcon={<AddIcon />} colorScheme="green" type="submit">
                        Add Tips
                    </Button>
                </form>
            </Box>
        </Flex>
    );
}
