import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Box, Flex, Image, Text, Heading, IconButton, Avatar, HStack } from '@chakra-ui/react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, query, orderBy, doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import { FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown } from 'react-icons/fa';

export const TrendingTips = () => {
    const [tips, setTips] = useState([]);
    const navigate = useNavigate();

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { delay: 0.5 } },
    };

    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    useEffect(() => {
        const fetchTrendingTips = async () => {
            const tipsCollection = collection(db, 'tips');
            const tipsQuery = query(tipsCollection, orderBy('likes', 'desc'), orderBy('totalComments', 'desc'));
            const tipsSnapshot = await getDocs(tipsQuery);
            const tipsList = tipsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTips(tipsList);
        };

        fetchTrendingTips();
    }, []);

    const handleLike = async (tip) => {
        const tipRef = doc(db, 'tips', tip.id);
        if (tip.liked) {
            await updateDoc(tipRef, {
                likes: tip.likes - 1,
                likedUsers: arrayRemove(tip.uid)
            });
            tip.likes -= 1;
        } else {
            await updateDoc(tipRef, {
                likes: tip.likes + 1,
                likedUsers: arrayUnion(tip.uid)
            });
            tip.likes += 1;
            if (tip.disliked) {
                await updateDoc(tipRef, {
                    dislikes: tip.dislikes - 1,
                    dislikedUsers: arrayRemove(tip.uid)
                });
                tip.dislikes -= 1;
                tip.disliked = false;
            }
        }
        tip.liked = !tip.liked;
        setTips([...tips]);
    };

    const handleDislike = async (tip) => {
        const tipRef = doc(db, 'tips', tip.id);
        if (tip.disliked) {
            await updateDoc(tipRef, {
                dislikes: tip.dislikes - 1,
                dislikedUsers: arrayRemove(tip.uid)
            });
            tip.dislikes -= 1;
        } else {
            await updateDoc(tipRef, {
                dislikes: tip.dislikes + 1,
                dislikedUsers: arrayUnion(tip.uid)
            });
            tip.dislikes += 1;
            if (tip.liked) {
                await updateDoc(tipRef, {
                    likes: tip.likes - 1,
                    likedUsers: arrayRemove(tip.uid)
                });
                tip.likes -= 1;
                tip.liked = false;
            }
        }
        tip.disliked = !tip.disliked;
        setTips([...tips]);
    };

    return (
        <motion.div ref={ref} className="flex flex-col ml-4 md:ml-20 my-12" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants}>
            <Heading as="h1" size="xl" mb={4} color="#0B9586" onClick={() => navigate('/tips')}>Trending Tips</Heading>
            <Flex overflowX="scroll" width="100%" maxWidth="80rem">
                {tips.map((tip, index) => (
                    <motion.div
                        key={index}
                        className="flex-shrink-0 w-48 md:w-64 mx-2 bg-white rounded shadow-md flex flex-col justify-between cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => navigate(`/tips/${tip.id}`)}
                    >
                        <Image src={tip.imageUrl || "https://via.placeholder.com/150"} alt="Tip" className="w-full h-24 md:h-32 object-cover rounded-t" />
                        <Box p={4} flexGrow={1}>
                            <Heading as="h2" size="md" mb={2}>{tip.title}</Heading>
                            <Text color="gray.600" flexGrow={1}>{tip.description.length > 100 ? `${tip.description.substring(0, 100)}...` : tip.description}</Text>
                        </Box>
                        <Box p={4}>
                            <Flex justify="space-between" align="center">
                                <Flex>
                                    <HStack spacing={4}>
                                        <IconButton aria-label="Like" icon={tip.liked ? <FaThumbsUp /> : <FaRegThumbsUp />} onClick={(e) => { e.stopPropagation(); handleLike(tip); }} />
                                        <Text>{tip.likes}</Text>
                                        <IconButton aria-label="Dislike" icon={tip.disliked ? <FaThumbsDown /> : <FaRegThumbsDown />} onClick={(e) => { e.stopPropagation(); handleDislike(tip); }} />
                                        <Text>{tip.dislikes}</Text>
                                    </HStack>
                                </Flex>
                            </Flex>
                        </Box>
                    </motion.div>
                ))}
            </Flex>
        </motion.div>
    );
};
