import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const ArticleRecycler = () => {
    const navigate = useNavigate();
    const articles = [
        {
        title: "Article 1",
        description: "This is a description of the article. Replace with your actual description.",
        },
        {
        title: "Article 2",
        description: "This is a description of the article. Replace with your actual description.",
        },
        {
        title: "Article 3",
        description: "This is a description of the article. Replace with your actual description.",
        },
        {
        title: "Article 4",
        description: "This is a description of the article. Replace with your actual description.",
        },
        {
        title: "Article 5",
        description: "This is a description of the article. Replace with your actual description.",
        },
        {
        title: "Article 6",
        description: "This is a description of the article. Replace with your actual description.",
        },
        {
        title: "Article 7",
        description: "This is a description of the article. Replace with your actual description.",
        },
        {
        title: "Article 8",
        description: "This is a description of the article. Replace with your actual description.",
        },
    ];
    
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { delay: 0.5 } },
      };

    const [ref, inView] = useInView({
        triggerOnce: true, // Change to false if you want to trigger again when element is not in view
    });

    return (
        <motion.div ref={ref} className="flex flex-col ml-20 my-12" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants}>
        <h1 className="text-[#0B9586] text-3xl font-semibold mb-4" onClick={() => navigate('/article')}>Trending Articles</h1>
        <div className="flex overflow-x-scroll" style={{ width: '80rem' }}> {/* Adjust this width as needed */}
          {articles.map((article, index) => (
            <motion.div key={index} className="flex-shrink-0 w-64 mx-2 bg-white rounded shadow-md" whileHover={{ scale: 1.05 }}>
              <img src="https://via.placeholder.com/150" alt="Article" className="w-full h-32 object-cover rounded-t" /> {/* Replace with your actual image */}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600">{article.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );  
}