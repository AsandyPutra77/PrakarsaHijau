import React, { useState, useEffect, useContext } from "react";
import { Box, Heading, Text, HStack, Image, Tag, TagLabel, TagRightIcon, Avatar, Link as ReactRouterLink, IconButton } from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { IoIosPricetags } from "react-icons/io";
import { Link } from "react-router-dom";
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from "../../firebase/firebase";
import { timeFormatter } from "../../utils/formatter/timeFormatter";
import { FaRegThumbsUp, FaThumbsUp, FaRegThumbsDown, FaThumbsDown } from "react-icons/fa";
import { AuthContext } from "../../utils/context/AuthContext"; // Import AuthContext

export const ItemTips = ({ tip }) => {
    const { currentUser } = useContext(AuthContext); // Use AuthContext to get the current user
    const [user, setUser] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    useEffect(() => {
        if (tip.uid) {
            const unsubUser = onSnapshot(doc(db, 'users', tip.uid), (doc) => {
                setUser(doc.data());
            });

            const tipRef = doc(db, 'tips', tip.id);
            const unsubTip = onSnapshot(tipRef, (doc) => {
                const data = doc.data();
                setLikes(data.likes || 0);
                setDislikes(data.dislikes || 0);
                if (currentUser) {
                    setLiked(data.likedUsers ? data.likedUsers.includes(currentUser.uid) : false);
                    setDisliked(data.dislikedUsers ? data.dislikedUsers.includes(currentUser.uid) : false);
                }
            });

            return () => {
                unsubUser();
                unsubTip();
            };
        }
    }, [tip.uid, tip.id, currentUser]);

    const handleLike = async () => {
        if (!currentUser) return; // Ensure there's a logged-in user

        const tipRef = doc(db, 'tips', tip.id);
        if (liked) {
            setLikes(likes - 1);
            await updateDoc(tipRef, {
                likes: likes - 1,
                likedUsers: arrayRemove(currentUser.uid)
            });
        } else {
            setLikes(likes + 1);
            await updateDoc(tipRef, {
                likes: likes + 1,
                likedUsers: arrayUnion(currentUser.uid)
            });
            if (disliked) {
                setDisliked(false);
                setDislikes(dislikes - 1);
                await updateDoc(tipRef, {
                    dislikes: dislikes - 1,
                    dislikedUsers: arrayRemove(currentUser.uid)
                });
            }
        }
        setLiked(!liked);
    };

    const handleDislike = async () => {
        if (!currentUser) return; // Ensure there's a logged-in user

        const tipRef = doc(db, 'tips', tip.id);
        if (disliked) {
            setDislikes(dislikes - 1);
            await updateDoc(tipRef, {
                dislikes: dislikes - 1,
                dislikedUsers: arrayRemove(currentUser.uid)
            });
        } else {
            setDislikes(dislikes + 1);
            await updateDoc(tipRef, {
                dislikes: dislikes + 1,
                dislikedUsers: arrayUnion(currentUser.uid)
            });
            if (liked) {
                setLiked(false);
                setLikes(likes - 1);
                await updateDoc(tipRef, {
                    likes: likes - 1,
                    likedUsers: arrayRemove(currentUser.uid)
                });
            }
        }
        setDisliked(!disliked);
    };

    return (
        <Box 
            m={4} 
            bg="#gray.50" 
            boxShadow="0px 4px 30px rgba(0, 0, 0, 0.2)" 
            width="auto" 
            height="auto"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            borderRadius="md"
        >
            <HStack spacing={4} padding={4} bg="#6ED840" borderTopLeftRadius="md" borderTopRightRadius="md">
                <Avatar 
                    size="lg"
                    name={user?.displayName} 
                    src={user?.avatar || 'https://bit.ly/broken-link'} 
                />
                <Box>
                    <Text fontSize="xl" fontWeight="bold" color="black">{user?.displayName || 'Anonym'}</Text>
                    <Text color="black">
                        {tip?.date ? timeFormatter(new Date(tip.date.seconds * 1000)) : "Undefined Date"}
                    </Text>
                </Box>
            </HStack>
            <Box 
                position="relative"
                height="250px"
                width="auto"
                sx={{
                    "::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "50%",
                        backgroundImage: "linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))",
                    }
                }}
            >
                <Image 
                    height="100%"
                    width="100%"
                    src={tip.imageUrl} 
                    alt={tip.title} 
                    objectFit="cover"
                />
            </Box>

            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="stretch" 
                padding="20px" 
                gap="24px"
                flex='1'
            >
                <Heading 
                    fontFamily="'Inter'" 
                    fontWeight="600" 
                    fontSize="20px" 
                    lineHeight="30px" 
                    color="black"
                >
                    {tip.title}
                </Heading>

                <HStack spacing={4}>
                    {Array.isArray(tip.tag) && tip.tag.map((tag, index) => (
                        <Tag size='md' key={index} variant='solid' colorScheme='blue'>
                            <TagLabel>#{tag.trim()}</TagLabel>
                            <TagRightIcon as={IoIosPricetags} />
                        </Tag>
                    ))}
                </HStack>

                <Text 
                    fontFamily="'Inter'"
                    flex='1'
                    color="black"
                >
                    {tip.description}
                </Text>

                <HStack justifyContent="space-between">
                    <Link as={ReactRouterLink} to={`/tips/${tip.id}`}>
                        <Text
                            fontFamily="'Inter'"
                            fontSize='16px'
                            color="#08C84F"
                            flex='1'
                        >
                            Lihat Details <ArrowForwardIcon />
                        </Text>
                    </Link>
                    <HStack spacing={4}>
                        <IconButton aria-label="Like" icon={liked ? <FaThumbsUp /> : <FaRegThumbsUp />} onClick={handleLike} />
                        <Text>{likes}</Text>
                        <IconButton aria-label="Dislike" icon={disliked ? <FaThumbsDown /> : <FaRegThumbsDown />} onClick={handleDislike} />
                        <Text>{dislikes}</Text>
                    </HStack>
                </HStack>
            </Box>
        </Box>
    )
}
