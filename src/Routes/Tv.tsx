import { motion } from 'framer-motion';

function Tv() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      Tv
    </motion.div>
  );
}

export default Tv;
