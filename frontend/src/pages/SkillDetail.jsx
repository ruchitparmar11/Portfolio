import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const SkillDetail = () => {
    const { id } = useParams();
    const [skill, setSkill] = useState(null);
    const [relatedProjects, setRelatedProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all skills to find the one matching the ID
                const skillsRes = await fetch(`${API_URL}/skills`);
                const skillsData = await skillsRes.json();
                const foundSkill = skillsData.find(s => s.id === parseInt(id));
                setSkill(foundSkill);

                // Fetch projects to find related work
                const projectsRes = await fetch(`${API_URL}/projects`);
                const projectsData = await projectsRes.json();

                if (foundSkill) {
                    // Split skill name by '/' to handle composite skills like "MongoDB / MySQL"
                    const skillTerms = foundSkill.name.split('/').map(term => term.trim().toLowerCase());

                    const related = projectsData.filter(project => {
                        const stack = project.tech_stack.toLowerCase();
                        // check if any of the skill terms appear in the project stack
                        const matchesTerm = skillTerms.some(term => stack.includes(term));

                        return matchesTerm ||
                            (skillTerms.some(t => t.includes("react")) && stack.includes("react")) ||
                            (skillTerms.some(t => t.includes("python")) && stack.includes("python"));
                    });
                    setRelatedProjects(related);
                }

            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div className="loader"></div>;

    if (!skill) {
        return (
            <div className="container" style={{ textAlign: 'center', paddingTop: '100px' }}>
                <h2>Skill Not Found</h2>
                <Link to="/" className="link-text">Return to Base</Link>
            </div>
        );
    }

    return (
        <div className="page-content container" style={{ paddingTop: '100px' }}>
            <Link to="/" className="link-text" style={{ marginBottom: '2rem', display: 'inline-block' }}>&larr; Back to Dashboard</Link>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-panel"
                style={{ marginBottom: '3rem', border: '1px solid var(--fission-orange)' }}
            >
                <h1 style={{ fontSize: '3rem', color: 'var(--fission-orange)', fontFamily: 'Share Tech Mono' }}>
                    {skill.name}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                    <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Proficiency Level:</span>
                    <div className="progress-bar" style={{ flexGrow: 1, maxWidth: '400px' }}>
                        <div
                            className="progress-fill"
                            style={{ width: `${skill.proficiency}%`, boxShadow: '0 0 15px var(--fission-orange)' }}
                        ></div>
                    </div>
                    <span style={{ fontFamily: 'Share Tech Mono', color: 'var(--fission-orange)' }}>{skill.proficiency}%</span>
                </div>
                <p style={{ marginTop: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
                    <strong>Category:</strong> {skill.category}
                </p>
                {/* Placeholder for a description if we had one in the DB */}
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                    Advanced usage and integration of {skill.name} in scalable systems.
                    Deployed in production environments for high-performance applications.
                </p>
            </motion.div>

            <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ borderBottom: '1px solid var(--text-secondary)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}
            >
                Associated Mission Logs (Projects)
            </motion.h3>

            {relatedProjects.length > 0 ? (
                <div className="grid">
                    {relatedProjects.map(project => (
                        <motion.div
                            key={project.id}
                            className="glass-panel project-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -5, boxShadow: '0 0 20px rgba(255, 85, 0, 0.2)' }}
                        >
                            <h3>{project.title}</h3>
                            <p className="tech-stack">{project.tech_stack}</p>
                            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{project.description}</p>
                            {project.link ? (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="link-text" style={{ fontSize: '0.8rem' }}>
                                    View Project Source
                                </a>
                            ) : (
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Link unavailable</span>
                            )}
                        </motion.div>
                    ))}
                </div>
            ) : (
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    No specific projects linked to this skill in the current database, but it is a core part of the technical arsenal.
                </p>
            )}
        </div>
    );
};

export default SkillDetail;
