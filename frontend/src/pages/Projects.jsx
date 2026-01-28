import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { projects } from '../data/portfolioData';

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
                Mission Logs
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

                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="feature-link"
                                >
                                    {getButtonText(project.link)} &rarr;
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default Projects;
