import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { education } from '../data/portfolioData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

function Education() {
    return (
        <div className="page-content container" style={{ paddingTop: '100px' }}>
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                Flight Path (Education)
            </motion.h2>

            <motion.div
                className="timeline-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {education.map((edu, index) => (
                    <motion.div
                        key={index}
                        className="timeline-item"
                        variants={itemVariants}
                    >
                        {/* Glowing Node on the line */}
                        <div className={`timeline-node ${index === 0 ? 'active-node' : ''}`}></div>

                        {/* Horizontal Connector */}
                        <div className="timeline-connector"></div>

                        {/* Content Card */}
                        <motion.div
                            className="glass-panel timeline-content"
                            whileHover={{ scale: 1.02, translateX: 10, borderColor: 'var(--fission-orange)' }}
                        >
                            <span className="timeline-year">{edu.year}</span>
                            <h3 className="timeline-degree">{edu.degree}</h3>
                            <div className="timeline-institution">{edu.institution}</div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '1rem' }}>
                                <span style={{ width: '8px', height: '8px', background: 'var(--uranium-glow)', borderRadius: '50%', display: 'inline-block' }}></span>
                                <span className="timeline-score">{edu.score}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default Education;
