import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image, Tag, TagLabel, TagRightIcon } from '@chakra-ui/react';
import { IoIosPricetags } from "react-icons/io";
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const DetailTips = () => {
  const { id } = useParams();
  const [tip, setTip] = useState(null);

  useEffect(() => {
    const fetchTip = async () => {
      try {
        const docRef = doc(db, 'tips', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTip(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error('Error fetching tip', error);
      }
    }

    fetchTip();
  }, [id]);

  if (!tip) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box 
        m={4} 
        bg="#FFFFFF" 
        boxShadow="0px 4px 30px rgba(0, 0, 0, 0.05)" 
        width="auto" 
        height="auto"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
    >
        <Image 
            height="500px"
            width="100%"
            src={tip.imageUrl} 
            alt={tip.title} 
            objectFit="cover"
        />

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
                color="#101828"
            >
                {tip.title}
            </Heading>

            <Tag size='md' variant='outline' colorScheme='blue' maxWidth="fit-content" whiteSpace="nowrap">
                <TagLabel>#{tip.tag}</TagLabel>
                <TagRightIcon as={IoIosPricetags} />
            </Tag>

            <Text 
                fontFamily="'Inter'"
                flex='1'
            >
                {tip.description}
            </Text>
        </Box>
    </Box>
  );
}