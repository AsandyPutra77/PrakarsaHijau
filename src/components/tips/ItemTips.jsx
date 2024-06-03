import React, { useState, useEffect } from "react";
import { Box, Heading, Text, HStack, Image, Tag, TagLabel, TagRightIcon, Avatar, Link as ReactRouterLink} from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { IoIosPricetags } from "react-icons/io";
import { Link } from "react-router-dom";
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from "../../firebase/firebase";
import { timeFormatter } from "../../utils/formatter/timeFormatter";

export const ItemTips = ({ tip }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (tip.uid) {
            const unsub = onSnapshot(doc(db, 'users', tip.uid), (doc) => {
                setUser(doc.data());
            });
            return () => unsub();
        }
    }, [tip.uid]);
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
<<<<<<< HEAD
            <Image 
                height="200px"
                width="100%"
                src={tip.imageUrl} 
                alt={tip.title} 
                objectFit="cover"
            />
=======
            <HStack spacing={4} padding={4} bg="#6ED840" borderTopLeftRadius="md" borderTopRightRadius="md">
                <Avatar 
                    size="lg"
                    name={user?.displayName} 
                    src={user?.photoURL || 'https://bit.ly/broken-link'} 
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
>>>>>>> 77e6477221e5ccee355b97fbc7e958fbc4f1b577

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
                    {['md'].map((size) => (
                        <Tag size={size} key={size} variant='solid' colorScheme='blue'>
                        <TagLabel>#{tip.tag}</TagLabel>
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
            </Box>
        </Box>
    )
}