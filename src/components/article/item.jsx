import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Spinner, Image, Flex } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons'; 
import { Link } from 'react-router-dom';
import { Loading } from '../helper/Loading';
import axios from 'axios';

export const Article = () => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=a77ce0b908e84700951fe15d6a0c0e75');
        setArticle(response.data.articles);
      } catch (error) {
        console.error('Error fetching article', error);
      }
      setLoading(false);
    }

    fetchArticle();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box 
        display="grid" 
        gridTemplateColumns="repeat(3, 1fr)" 
        gap="24px" 
        padding="20px"
        >
        {article.map((item, index) => (
            <Box 
            key={index} 
            m={4} 
            background="#FFFFFF" 
            boxShadow="0px 4px 30px rgba(0, 0, 0, 0.05)" 
            width="auto" 
            height="auto"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            >
            <Image 
                height="200px"
                width="420px"
                src={item.urlToImage} 
                alt={item.title} 
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
                {item.title}
                </Heading>

                <Text 
                fontFamily="'Inter'"
                flex='1'
                >
                {item.description}
                </Text>

                <Link to={`/article/${encodeURIComponent(item.title)}`}>
                <Text
                    fontFamily="'Inter'"
                    fontSize='16px'
                    color="#3CAB90"
                    flex='1'
                >
                    Lihat Details <ArrowForwardIcon />
                </Text>
                </Link>
            </Box>
            </Box>
        ))}
        </Box>
  );
}
