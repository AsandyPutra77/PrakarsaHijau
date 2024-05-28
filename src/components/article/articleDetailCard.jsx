import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Spinner, Image, Flex} from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Loading } from '../helper/Loading';
export const ArticleDetailCard = () => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchArticle = async () => {
          setLoading(true);
          try {
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=a77ce0b908e84700951fe15d6a0c0e75`);
            const articles = response.data.articles;
            const article = articles.find(article => article.title === decodeURIComponent(id));
            setArticle(article);
          } catch (error) {
            console.error('Error fetching article', error);
          }
          setLoading(false);
        }
      
        fetchArticle();
      }, [id]);

    if (loading) {
        return <Loading />;
      }

    if (!article) {
        return <Text>Article not found</Text>;
    }

    return (
    <Box 
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
          height="500px"
          width="100%"
          src={article.urlToImage} 
          alt={article.title} 
          objectFit="cover"
          objectPosition="center"
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
            {article.title}
          </Heading>
  
          <Text 
            fontFamily="'Inter'"
            flex='1'
          >
            {article.description}
          </Text>
        </Box>
      </Box>
    )
}