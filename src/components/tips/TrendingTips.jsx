import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { db } from '../../firebase/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { FaThumbsUp, FaThumbsDown, FaCommentDots } from 'react-icons/fa';

export const TrendingTips = () => {
  const [tips, setTips] = useState([]);
  const navigate = useNavigate();

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5 } },
  };

  const [ref, inView] = useInView({
    triggerOnce: true, 
  });

  useEffect(() => {
    const fetchTrendingTips = async () => {
      const tipsCollection = collection(db, 'tips');
      const tipsQuery = query(tipsCollection, orderBy('likes', 'desc'), orderBy('totalComments', 'desc'));
      const tipsSnapshot = await getDocs(tipsQuery);
      const tipsList = tipsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTips(tipsList);
    };

    fetchTrendingTips();
  }, []);

  return (
    <motion.div ref={ref} className="flex flex-col ml-4 md:ml-20 my-12" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants}>
      <h1 className="text-[#0B9586] text-2xl md:text-3xl font-semibold mb-4" onClick={() => navigate('/tips')}>Trending Tips</h1>
      <div className="flex overflow-x-scroll" style={{ width: '100%', maxWidth: '80rem' }}> 
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-48 md:w-64 mx-2 bg-white rounded shadow-md flex flex-col justify-between cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/tips/${tip.id}`)}
          >
            <img src={tip.imageUrl || "https://via.placeholder.com/150"} alt="Tip" className="w-full h-24 md:h-32 object-cover rounded-t" /> 
            <div className="p-2 md:p-4 flex-grow">
              <h2 className="text-lg md:text-xl font-semibold mb-2">{tip.title}</h2>
              <p className="text-gray-600 flex-grow">
                {tip.description.length > 100 ? `${tip.description.substring(0, 100)}...` : tip.description}
              </p>
            </div>
            <div className="p-2 md:p-4">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <FaThumbsUp size={24} />
                  <span className="ml-2">{tip.likes}</span>
                </div>
                <div className="flex items-center">
                  <FaThumbsDown size={24} />
                  <span className="ml-2">{tip.dislikes}</span>
                </div>
                <div className="flex items-center">
                  <FaCommentDots size={24} />
                  <span className="ml-2">{tip.totalComments}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};