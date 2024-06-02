import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image, Tag, TagLabel, TagRightIcon, Flex, Button } from '@chakra-ui/react';
import { IoIosPricetags } from "react-icons/io";
import { ArrowBackIcon } from '@chakra-ui/icons';
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../helper/Loading';

export const DetailTips = () => {
  const { id } = useParams();
  const [ tip, setTip ] = useState(null);
  const navigate = useNavigate();

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
    return <Loading />;
  }

  return (
    <Box 
        bg="#08C84F" 
        boxShadow="0px 4px 30px rgba(0, 0, 0, 0.05)" 
        borderRadius="lg"
        overflow="hidden"
        maxH="80%"
        maxWidth="800px"
        mt={10}
        mx="auto"
    >
        <Button 
            leftIcon={<ArrowBackIcon />} 
            color="#E2E51A" 
            variant="outline" 
            mt={4}
            ms={4}
            mb={4} 
            onClick={() => navigate('/tips')}
          >
            Back to Tips
        </Button>
        <Image 
            height="400px"
            width="100%"
            src={tip.imageUrl} 
            alt={tip.title} 
            objectFit="cover"
        />

        <Flex 
            direction="column" 
            p="5"
        >
            <Heading 
                fontFamily="'Inter'" 
                fontWeight="600" 
                fontSize="2xl" 
                mb="2"
            >
                {tip.title}
            </Heading>

            <Tag size='md' variant='solid' bg="#6ED840" color="#FFFFFF" maxWidth="fit-content" whiteSpace="nowrap" mb="4">
                <TagLabel>#{tip.tag}</TagLabel>
                <TagRightIcon as={IoIosPricetags} />
            </Tag>

            <Text 
                fontFamily="'Inter'"
                fontSize="md"
            >
                {tip.description}
            </Text>
        </Flex>
    </Box>
  );
}