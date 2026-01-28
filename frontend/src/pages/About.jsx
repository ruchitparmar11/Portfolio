import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { skills } from '../data/portfolioData';

const About = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    // Group skills by category
    const categories = ['All', ...new Set(skills.map(skill => skill.category))];
    const filteredSkills = activeCategory === 'All'
        ? skills
        : skills.filter(skill => skill.category === activeCategory);

    return (
        <div className="page-content" style={{ perspective: '1000px', overflowX: 'hidden' }}>
            {/* --- Hero Section --- */}
            <section className="hero" style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', transformStyle: 'preserve-3d' }}>

                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{ zIndex: 10, textAlign: 'center', position: 'relative' }}
                >
                    <motion.div
                        className="identity-glitch"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h1 className="glitch-text" data-text="RUCHIT">RUCHIT PARMAR</h1>
                    </motion.div>

                    <h2 className="role-subtitle">AI & ML Engineer <span className="separator">|</span> Full Stack Developer</h2>
                </motion.div>

                {/* Background Visuals */}
                <motion.div
                    className="gargantua-visual"
                    animate={{ rotate: 360 }}
                    transition={{ rotate: { duration: 120, ease: "linear", repeat: Infinity } }}
                >
                    <div className="accretion-disk"></div>
                    <div className="black-hole"></div>
                </motion.div>
            </section>

            {/* --- Commander Profile & Bio Section --- */}
            <section className="container about-section">
                <div className="profile-grid">

                    {/* Left Column: Commander Profile Card */}
                    <motion.div
                        className="commander-profile"
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="profile-header">
                            <span className="status-indicator online"></span>
                            <span>SYSTEM ONLINE</span>
                        </div>
                        <div className="profile-image-placeholder">
                            <div className="scan-line"></div>
                            {/* Placeholder for actual image if user adds one later */}
                            <div className="avatar-initials">RP</div>
                        </div>
                        <div className="profile-stats">
                            <div className="stat-row">
                                <span className="stat-label">LOCATION</span>
                                <span className="stat-value">Vadodara, IN</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">EXP LEVEL</span>
                                <span className="stat-value">Lvl. 4</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">SPECIALTY</span>
                                <span className="stat-value">Neural Nets</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Mission Log (Bio) */}
                    <motion.div
                        className="bio-terminal"
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="terminal-header">
                            <div className="terminal-dots">
                                <span></span><span></span><span></span>
                            </div>
                            <span className="terminal-title">mission_log.txt</span>
                        </div>
                        <div className="terminal-body">
                            <p>
                                <span className="prompt">&gt;</span> Initiating bio-sequence...<br /><br />
                                I am an <strong>AI & ML Engineer</strong> dedicated to building the next generation of intelligent systems.
                                By bridging the gap between <strong className="highlight">complex research</strong> and <strong className="highlight">scalable applications</strong>,
                                I architect solutions that do more than just compute—they <span className="italic">reason</span>.
                            </p>
                            <p>
                                <span className="prompt">&gt;</span> Current Operations:<br />
                                Specializing in <strong>Multimodal RAG Pipelines</strong> (Gemini 2.0), key predictive analytics engines, and high-performance full-stack architectures.
                            </p>
                            <p className="typing-cursor">_</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- Skills HUD Section --- */}
            <section id="skills" className="container skills-section">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Technical Arsenal
                </motion.h2>

                {/* Filter Tabs */}
                <div className="skill-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Skills Grid */}
                <motion.div
                    className="skills-hud-grid"
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {filteredSkills.map((skill) => (
                        <motion.div
                            layout
                            key={skill.id}
                            className="tech-module"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05, borderColor: 'var(--fission-orange)' }}
                        >
                            <div className="module-header">
                                <span className="module-name">{skill.name}</span>
                                <span className="module-cat">{skill.category}</span>
                            </div>
                            <div className="module-bar-container">
                                <div className="module-bar" style={{ width: `${skill.proficiency}%` }}></div>
                            </div>
                            <div className="module-footer">
                                <span>PROFICIENCY</span>
                                <span>{skill.proficiency}%</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
}

export default About;