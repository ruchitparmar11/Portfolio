import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const API_URL = "http://localhost:8000";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    visible: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: "circOut"
        }
    }
};

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${API_URL}/projects`);
                const data = await res.json();
                setProjects(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="page-content container" style={{ paddingTop: '100px' }}>
            <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{ marginBottom: '3rem' }}
            >
                Mission Logs (Projects)
            </motion.h2>
            <motion.div
                className="grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {loading ? <div className="loader"></div> : projects.map((project) => (
                    <motion.div
                        key={project.id}
                        className="glass-panel project-card"
                        variants={itemVariants}
                        whileHover={{
                            y: -10,
                            scale: 1.02,
                            boxShadow: "0 0 25px rgba(255, 170, 51, 0.4)",
                        }}
                        style={{ border: "1px solid var(--glass-panel-border)",  marginBottom: '1.5rem'}}
                    >
                        <h3>{project.title}</h3>
                        <p className="tech-stack">{project.tech_stack}</p>
                        <p>{project.description}</p>
                        {project.image_url && <img src={project.image_url} alt={project.title} style={{ width: '100%', borderRadius: '8px', marginTop: '1rem', maxHeight: '200px', objectFit: 'cover' }} />}
                        {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="link-text"> View Project</a>}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default Projects;
