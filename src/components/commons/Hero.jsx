import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  const Navigate = useNavigate();
  
  const fadeIn = {
      initial: { opacity: 0 , y: 60},
      animate: { opacity: 1 , y: 0},
  }

  const fadeInRight = {
    initial: { opacity: 0 , x: -60},
    animate: { opacity: 1 , x: 0},
  }
  
    return (
     <section className="flex flex-col md:flex-row w-full h-screen bg-cover bg-[url('/assets/bg.png')]">
        <div className="flex mx-4 md:mx-40 my-20 ml-20">
          <motion.div
            className='flex justify-center items-center my-14'
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ duration: 2 }}
          >
            <img src="/assets/Group 1.png" alt="Group1" />
          </motion.div>
        </div>
        <div className=" mx-4 md:mr-40 mt-4 md:mt-80 ">
          <div className="flex flex-col">
            <motion.h2
              className="flex text-2xl md:text-5xl text-[#11DCC6] font-semibold whitespace-nowrap mb-2"
              variants={fadeInRight}
              initial="initial"
              animate="animate"
              transition={{ duration: 2 }}>
            Green Economy
            </motion.h2>
            <h5 className="flex text-xl md:text-2xl text-[#FFFFFF] font-semibold whitespace-nowrap">Masa Depan Sehat Untuk <br />Bumi dan Manusia</h5>
          </div>
          <div className="flex flex-row mt-4">
            <motion.button
              className="bg-[#00A742] border-[#00A742] text-white font-semibold px-4 md:px-10 py-2 border rounded-3xl mr-4 hover:bg-[#136C59] hover:border-[#136C59]"
              onClick={() => Navigate('/tips')}
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ duration: 2 }}
            >
              Tips
            </motion.button>
            <motion.button
              className="bg-[#136C59] border-[#136C59] text-white font-semibold px-4 md:px-10 py-2 border rounded-3xl mr-4 hover:bg-[#00A742] hover:border-[#00A742]"
              onClick={() => Navigate('/calculate')}
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ duration: 2 }}
            >
              Emission Checker
            </motion.button>
          </div>
        </div>
     </section>
  );
}