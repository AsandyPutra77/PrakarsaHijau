import React from "react";
import { Input, Button, Text, Flex, Box, Tooltip, IconButton, Textarea, useToast} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { db, storage } from "../../../firebase/firebase";
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from "react-router-dom";

export const TipsInput = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tips, setTips] = useState([]);
    const [tag, setTag] = useState("");
    const [image, setImage] = useState(null); 
    const toast = useToast();
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // add this line to prevent form from refreshing the page

        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // progress function ...
            }, 
            (error) => {
                console.log(error);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);

                    const tip = {
                        title: title,
                        description: description,
                        tag: tag,
                        imageUrl: downloadURL
                    };

                    setTips([...tips, { title, description, tag, imageUrl: downloadURL }]);
                    setTitle("");
                    setDescription("");
                    setTag("");
                    setImage(null);

                    const addDocument = async () => {
                        try {
                            const docRef = await addDoc(collection(db, 'tips'), tip);
                            console.log("Document written with ID: ", docRef.id);
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
                        }
                    };
                
                    addDocument();
                });
            }
        );
    };

    useEffect(() => {
        console.log(tips);
    }, [tips]);

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
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
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
                    <Button colorScheme="green" type="submit">
                        Add Tips
                    </Button>
                </form>
            </Box>
        </Flex>
    );
}