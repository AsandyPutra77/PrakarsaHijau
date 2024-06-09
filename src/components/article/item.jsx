import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Image} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons'; 
import { Link } from 'react-router-dom';
import { Loading } from '../helper/Loading';
import { fetchHealthArticles } from '../../utils/network'; 

export const Article = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesData = await fetchHealthArticles();
        setArticles(articlesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box 
      display="grid" 
      gridTemplateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} 
      gap="24px" 
      padding="20px"
    >
      {articles.map((article, index) => (
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
            src={article.image} 
            alt={article.title} 
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
              {article.title}
            </Heading>

            <Text 
              fontFamily="'Inter'"
              flex='1'
            >
              {article.summary}
            </Text>

            <Link to={`/article/${encodeURIComponent(article.title)}`}>
              <Text
                fontFamily="'Inter'"
                fontSize='16px'
                color="#3CAB90"
                flex='1'
              >
                Lihat Detail <ArrowForwardIcon />
              </Text>
            </Link>
          </Box>
        </Box>
      ))}
    </Box>
  );
}