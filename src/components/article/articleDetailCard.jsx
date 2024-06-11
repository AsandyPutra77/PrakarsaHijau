import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Image } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Loading } from '../helper/Loading';
import { fetchHealthArticles } from '../../utils/network'; 

export const ArticleDetailCard = () => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {
                const articles = await fetchHealthArticles(); 
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
                width="auto"
                src={article.image} 
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
                    {article.summary}
                </Text>
            </Box>
        </Box>
    )
}
