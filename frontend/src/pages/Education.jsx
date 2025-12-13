import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const cardVariants = {
    hidden: { opacity: 1, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 }
    }
};

function Education() {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                console.log("Fetching education data...");
                const res = await fetch(`${API_URL}/education`);
                const data = await res.json();
                console.log("Education data received:", data);
                setEducation(data);
            } catch (err) {
                console.error("Error fetching education:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEducation();
    }, []);

    return (
        <div className="page-content container" style={{ paddingTop: '100px' }}>
            <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                style={{ marginBottom: '3rem' }}
            >
                Flight Training (Education)
            </motion.h2>
            <motion.div
                className="grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {loading ? <div className="loader"></div> : education.map((edu, index) => (
                    <motion.div
                        key={index}
                        className="glass-panel"
                        variants={cardVariants}
                        style={{ marginBottom: '1.5rem' }}
                        whileHover={{ x: 10, borderColor: 'var(--accretion-gold)' }}
                    >
                        <h3>{edu.degree}</h3>
                        <p style={{ color: 'var(--accretion-gold)', fontSize: '1.2rem' }}>{edu.institution}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: 'var(--text-secondary)' }}>
                            <span>{edu.year}</span>
                            <span style={{ color: 'var(--wormhole-blue)' }}>{edu.score}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default Education;
