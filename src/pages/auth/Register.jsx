import { motion } from 'framer-motion';
import { RegisterInput } from '../../components/auth/RegisterInput';
import { Layout } from '../../components/commons/Layout';

export const Register = () => {
  return (
    <Layout isAuth>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <RegisterInput isAuth/>
      </motion.div>
    </Layout>
  )
}