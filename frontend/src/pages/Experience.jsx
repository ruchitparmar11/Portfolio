import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/portfolioData';
import ExperienceCard from '../components/ExperienceCard';
import QuantumDecode from '../components/QuantumDecode';

const Experience = () => {
    return (
        <div className="page-content container" style={{ paddingTop: '100px' }}>
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ marginBottom: '3rem' }}
            >
                <QuantumDecode text="Professional Experience" interval={30} revealSpeed={2} />
            </motion.h2>

            <div className="projects-container">
                {experience.map((exp, index) => (
                    <ExperienceCard key={exp.id} exp={exp} index={index} />
                ))}
            </div>
        </div>
    );
};

export default Experience;
