import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const TrendingTips = () => {
  const tips = ['Tip 1', 'Tip 2', 'Tip 3', 'Tip 4', 'Tip 5', 'Tip 6', 'Tip 7', 'Tip 8']; 
  const navigate = useNavigate();

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5 } },
  };

  const [ref, inView] = useInView({
    triggerOnce: true, 
  });

  return (
    <motion.div ref={ref} className="flex flex-col ml-20 my-12" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants}>
      <h1 className="text-[#0B9586] text-3xl font-semibold mb-4" onClick={() => navigate('/tips')}>Trending Tips</h1>
      <div className="flex overflow-x-scroll" style={{ width: '80rem' }}> 
        {tips.map((tip, index) => (
          <motion.div key={index} className="flex-shrink-0 w-64 mx-2 bg-white rounded shadow-md" whileHover={{ scale: 1.05 }}>
            <img src="https://via.placeholder.com/150" alt="Tip" className="w-full h-32 object-cover rounded-t" /> 
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{tip}</h2>
              <p className="text-gray-600">This is a description of the tip. Replace with your actual description.</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};