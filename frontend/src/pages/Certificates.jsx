import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { certifications } from '../data/portfolioData';
import QuantumDecode from '../components/QuantumDecode';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

function Certificates() {
    return (
        <div className="page-content container" style={{ paddingTop: '100px' }}>
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', marginBottom: '1rem' }}
            >
                <QuantumDecode text="Declassified Documents" interval={30} revealSpeed={2} />
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', fontFamily: 'Share Tech Mono' }}
            >
                // AUTHORIZED PERSONNEL ONLY //
            </motion.p>

            <motion.div
                className="vault-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {certifications.map((cert, index) => (
                    <motion.div
                        key={index}
                        className="doc-folder"
                        variants={cardVariants}
                        whileHover={{ y: -5 }}
                    >
                        <div className="doc-header">
                            <div className="doc-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                            </div>
                            <span className="doc-status">VERIFIED</span>
                        </div>
                        <div className="doc-body">
                            <h3 className="doc-title">{cert.name}</h3>
                            <p className="doc-issuer">ISSUER: {cert.issuer}</p>

                            {/* Decorative Stamp */}
                            <div className="stamp">APP</div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default Certificates;
