import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';
import QuantumDecode from '../components/QuantumDecode';
import { useSound } from '../context/SoundContext';

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

function Projects() {
    const loading = false; // Data is now static, so no loading state needed
    const { playClick } = useSound();

    const getButtonText = (link) => {
        if (!link) return "View Details";
        if (link.includes("github.com")) return "GitHub Repo";
        if (link.includes("leetcode.com")) return "View Profile";
        return "Live Demo";
    };

    return (
        <div className="page-content container">
            <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{ marginBottom: '3rem', fontSize: '2.5rem', color: 'var(--fission-orange)' }}
            >
                <QuantumDecode text="Mission Logs" interval={30} revealSpeed={2} />
            </motion.h2>

            <motion.div
                className="projects-container"
                variants={containerVariants}
                initial="visible"
                animate="visible"
            >
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        className={`project-feature ${index % 2 === 1 ? 'reversed' : ''}`}
                        variants={itemVariants}
                    >
                        <div className="feature-image-container">
                            {project.image_url ? (
                                <img src={project.image_url} alt={project.title} className="feature-image" />
                            ) : (
                                <div style={{ width: '100%', height: '100%', background: '#222' }}></div>
                            )}
                            <div className="image-overlay"></div>
                        </div>

                        <div className="feature-content">
                            <div className="feature-number">0{index + 1}</div>
                            <h3 className="feature-title">{project.title}</h3>

                            <div className="feature-tags">
                                {project.tech_stack.split(',').map((tech, i) => (
                                    <span key={i} className="feature-tag">
                                        {tech.trim()}
                                    </span>
                                ))}
                            </div>

                            <p className="feature-description">{project.description}</p>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="feature-link"
                                        onClick={playClick}
                                    >
                                        {getButtonText(project.link)} &rarr;
                                    </a>
                                )}
                                {project.live_link && (
                                    <a
                                        href={project.live_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="feature-link"
                                        onClick={playClick}
                                    >
                                        Live Demo &rarr;
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default Projects;
