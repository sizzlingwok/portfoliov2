import React from "react";
import { motion } from "framer-motion";

const HomeFadeUp = () => {
  return (
    <motion.div
      className="home-fadeup"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0, 0, 0.5, 1], delay: 2 }}
    ></motion.div>
  );
};

export default HomeFadeUp;
