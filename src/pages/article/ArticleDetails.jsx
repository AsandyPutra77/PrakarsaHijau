import React from 'react';
import { NavBar } from '../../components/commons/NavigationBar';
import { ArticleDetailCard } from '../../components/article/articleDetailCard';
import { Box } from '@chakra-ui/react';

export const ArticleDetail = () => {
    
    return (
        <div>
            <NavBar />
            <Box pt="70px">
                <ArticleDetailCard/>
            </Box>
        </div>
    )
}