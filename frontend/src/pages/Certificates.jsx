import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { certifications } from '../data/portfolioData';

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const listVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 1, x: 0 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6 }
    }
};

function Certificates() {
    const loading = false;


    return (
        <div className="page-content container" style={{ paddingTop: '100px' }}>
            <motion.h2
                initial={{ opacity: 1, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '3rem' }}
            >
                Specialized Training (Certifications)
            </motion.h2>
            <motion.div
                className="grid"
                variants={listVariants}
                initial="hidden"
                animate="visible"
            >
                {loading ? <div className="loader"></div> : certifications.map((cert, index) => (
                    <motion.div
                        key={index}
                        className="glass-panel cert-item"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                        style={{}}
                    >
                        <div>
                            <h4 style={{ color: 'var(--text-primary)' }}>{cert.name}</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--wormhole-blue)', marginTop: '0.5rem' }}>{cert.issuer}</p>
                        </div>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + (index * 0.1), type: "spring" }}
                            style={{ color: 'var(--accretion-gold)', border: '1px solid var(--accretion-gold)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}
                        >
                            Verified
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default Certificates;
