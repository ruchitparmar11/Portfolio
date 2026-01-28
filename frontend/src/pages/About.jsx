import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { skills, experience } from '../data/portfolioData';
import ExperienceCard from '../components/ExperienceCard';

const About = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('All');

    // Group skills by category
    const categories = ['All', ...new Set(skills.map(skill => skill.category))];
    const filteredSkills = activeCategory === 'All'
        ? skills
        : skills.filter(skill => skill.category === activeCategory);

    return (
        <div className="page-content" style={{ perspective: '1000px', overflowX: 'hidden' }}>
            {/* --- Hero Section --- */}
            <section className="hero" style={{ minHeight: 'calc(100vh - 100px)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', transformStyle: 'preserve-3d' }}>

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
                        <div className="profile-image-placeholder" style={{ padding: 0, overflow: 'hidden' }}>
                            <div className="scan-line"></div>
                            <img
                                src="/images/commander_profile.png"
                                alt="Commander Profile"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div className="profile-stats">
                            <div className="stat-row">
                                <span className="stat-label">CODENAME</span>
                                <span className="stat-value">"NEURAL_ARCHITECT"</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">OPERATING BASE</span>
                                <span className="stat-value">Vadodara, IN</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">CLEARANCE</span>
                                <span className="stat-value" style={{ color: 'var(--fission-orange)' }}>LEVEL 5 (TOP SECRET)</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">PRIMARY CLASS</span>
                                <span className="stat-value">Full Stack / ML-Ops</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">SPECIAL WEAPON</span>
                                <span className="stat-value">Gemini 2.0 / PyTorch</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">MISSION STATUS</span>
                                <span className="stat-value" style={{ color: '#00ff00' }}>DEPLOYABLE</span>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
                            <a href="/docs/Ruchit_Parmar_Resume.pdf" target="_blank" className="btn-glow" style={{ fontSize: '0.8rem', padding: '0.8rem', width: '100%' }}>
                                [ ACCESS DOSSIER / RESUME ]
                            </a>
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
                                <span className="prompt">&gt;</span> <strong>IDENTITY CONFIRMED:</strong> Ruchit Parmar<br />
                                <span className="prompt">&gt;</span> <strong>PRIMARY DIRECTIVE:</strong> Architecting Intelligent Systems<br /><br />

                                I am an <strong>AI & ML Engineer</strong> who operates at the intersection of <strong className="highlight">heavy compute</strong> and <strong className="highlight">human-centric design</strong>.
                                My expertise isn't just in writing code—it's in engineering <strong>solutions</strong> that bridge the gap between complex research and scalable, real-world applications.
                            </p>

                            <br />

                            <p>
                                <span className="prompt">&gt;</span> <strong>OPERATIONAL CAPABILITIES:</strong><br />
                                I possess a relentless drive for <strong>optimization</strong>. Whether fine-tuning Large Language Models (LLMs) for high-precision RAG pipelines or orchestrating full-stack architectures, I ensure every system runs with maximum efficiency.
                                I don't just build software; I build <strong>engines of innovation</strong> that scale.
                            </p>

                            <br />

                            <p>
                                <span className="prompt">&gt;</span> <strong>PROTOCOL (WORKING STYLE):</strong><br />
                                // <strong>Systems-First Mindset:</strong> robust, modular, and future-proof code.<br />
                                // <strong>Rapid Iteration:</strong> deployment cycles that favor speed without sacrificing stability.<br />
                                // <strong>Deep Reasoning:</strong> solving algorithmic challenges from first principles.
                            </p>

                            <br />

                            {/* <p>
                                <span className="prompt">&gt;</span> <strong>CURRENT MISSION:</strong><br />
                                Exploring the event horizon of <strong>Generative AI</strong> and <strong>Autonomous Agents</strong>. I am constantly upgrading my neural arsenal to stay ahead of the singularity.
                            </p> */}

                            <p className="typing-cursor">_</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- Experience Section --- */}
            <section className="container about-section">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '3rem', textAlign: 'center' }}
                >
                    <Link to="/experience" style={{ textDecoration: 'none' }}>
                        <h2 className="section-title" style={{ transition: 'color 0.3s', cursor: 'pointer', display: 'inline-block' }}
                            onMouseOver={(e) => e.target.style.color = 'var(--quantum-white)'}
                            onMouseOut={(e) => e.target.style.color = 'var(--fission-orange)'}
                        >
                            Professional Experience 🔗
                        </h2>
                    </Link>
                </motion.div>

                <div className="projects-container">
                    {experience.map((exp, index) => (
                        <ExperienceCard key={exp.id} exp={exp} index={index} />
                    ))}
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
                            onClick={() => navigate(`/skill/${skill.id}`)}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05, borderColor: 'var(--fission-orange)', cursor: 'pointer' }}
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