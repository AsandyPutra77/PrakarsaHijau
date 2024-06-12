import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fetchHealthArticles } from '../../utils/network';

export const ArticleRecycler = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    
    useEffect(() => {
        async function fetchArticles() {
            const articlesData = await fetchHealthArticles();
            setArticles(articlesData);
        }
        fetchArticles();
    }, []);

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { delay: 0.5 } },
    };

    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    const navigateToArticle = (title) => {
        navigate(`/article/${encodeURIComponent(title)}`);
    };

    return (
        <motion.div ref={ref} className="flex flex-col ml-4 md:ml-20 my-12" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants}>
            <h1 className="text-[#0B9586] text-2xl md:text-3xl font-semibold mb-4" onClick={() => navigate('/article')}>Health Articles</h1>
            <div className="flex overflow-x-scroll">
                {Array.isArray(articles) && articles.map((article, index) => (
                    <motion.div key={index} className="flex-shrink-0 w-48 md:w-64 mx-2 bg-white rounded shadow-md" whileHover={{ scale: 1.05 }} onClick={() => navigateToArticle(article.title)}>
                        <img src={article.image} alt="Article" className="w-full h-24 md:h-32 object-cover rounded-t" />
                        <div className="p-2 md:p-4">
                            <h2 className="text-lg md:text-xl font-semibold mb-2">{article.title}</h2>
                            {article.summary && (
                                <p className="text-gray-600">{article.summary.substring(0, 50)}...</p> 
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );  
}