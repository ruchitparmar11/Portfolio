
import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        scale: 0.98,
        filter: "blur(10px)"
    },
    animate: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] // Custom ease for smooth cinematic feel
        }
    },
    exit: {
        opacity: 0,
        scale: 1.02,
        filter: "blur(10px)",
        transition: {
            duration: 0.4,
            ease: "easeIn"
        }
    }
};

const PageTransition = ({ children }) => {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ width: '100%', height: '100%' }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
