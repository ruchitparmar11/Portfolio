import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const API_URL = "http://localhost:8000";

function About() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await fetch(`${API_URL}/skills`);
                const data = await res.json();
                setSkills(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    return (
        <div className="page-content" style={{ perspective: '1000px', overflowX: 'hidden' }}>
            <section className="hero" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', transformStyle: 'preserve-3d' }}>

                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, z: -100 }}
                    animate={{ opacity: 1, z: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ zIndex: 10, textAlign: 'center', position: 'relative' }}
                >
                    <motion.h1
                        className="glitch-text"
                        data-text="Ruchit"
                        animate={{
                            textShadow: [
                                "0 0 10px rgba(255, 255, 255, 0.5)",
                                "2px 2px 0px #11ff00ff, -2px -2px 0px #ff4400ff",
                                "0 0 10px rgba(255, 255, 255, 0.5)"
                            ]
                        }}
                        transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror", repeatDelay: 5 }}
                        style={{ fontSize: '5rem', marginBottom: '0.5rem', mixBlendMode: 'screen' }}
                    >
                        RUCHIT PARMAR
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <motion.h2
                            animate={{
                                textShadow: [
                                    "0 0 5px rgba(255, 255, 255, 0.3)",
                                    "1px 1px 0px #ff00c1, -1px -1px 0px #00fff9",
                                    "0 0 5px rgba(255, 255, 255, 0.3)"
                                ]
                            }}
                            transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror", repeatDelay: 4 }}
                            style={{
                                fontSize: '1.5rem',
                                letterSpacing: '2px',
                                color: 'var(--text-primary)',
                                fontFamily: 'Orbitron, sans-serif',
                                margin: '1rem 0',
                                textTransform: 'uppercase'
                            }}
                        >
                            ML ENGINEER Full time | Full STACK DEVELOPER Part time
                        </motion.h2>
                    </motion.div>

                    {/* <div className="contact-links" style={{ marginBottom: '2rem', fontFamily: 'Orbitron', color: 'var(--accretion-gold)' }}>
                        Vadodara, Gujarat | ruchitparmar78@gmail.com
                    </div> */}

                    <motion.div
                        className="bio glass-panel"
                        initial={{ rotateX: 90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 1, type: "spring" }}
                        whileHover={{ scale: 1.05, rotateX: 5, boxShadow: "0 20px 50px rgba(255, 170, 51, 0.2)" }}
                        style={{ maxWidth: '1100px', margin: '2rem auto', textAlign: 'left', background: 'rgba(5, 5, 5, 0.6)', backdropFilter: 'blur(10px)', border: '1px solid var(--accretion-gold)' }}
                    >
                        <p style={{ fontSize: '1.3rem', lineHeight: '1.8' }}>
                            I am a passionate Software Engineer with expertise in <strong style={{ color: 'var(--wormhole-blue)' }}>Machine Learning, AI, and Full Stack Development</strong>.
                            My goal is to explore the event horizon of code, building resilient and intelligent systems that solve real-world problems.
                        </p>
                    </motion.div>
                </motion.div>

                {/* 3D Moving Black Hole Background */}
                <motion.div
                    className="gargantua-visual"
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ rotate: { duration: 60, ease: "linear", repeat: Infinity }, scale: { duration: 10, repeat: Infinity, repeatType: "reverse" } }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        x: '-50%',
                        y: '-50%',
                        zIndex: 0,
                        opacity: 0.8,
                        transformStyle: 'preserve-3d',
                        willChange: 'transform' // PERFORMANCE FIX
                    }}
                >
                    <div className="accretion-disk" style={{ transform: 'rotateX(70deg)', boxShadow: '0 0 100px var(--accretion-gold), inset 0 0 50px var(--accretion-gold)', willChange: 'transform' }}></div>
                    <div className="black-hole" style={{ boxShadow: '0 0 60px #000, 0 0 20px 10px rgba(255,255,255,0.1)' }}></div>
                </motion.div>

            </section>

            <section id="skills" className="section container" style={{ position: 'relative', zIndex: 5 }}>
                <h2 style={{ borderBottomColor: 'var(--fission-orange)', marginBottom: '1.5rem' }}>Technical Arsenal (Skills)</h2>
                <div className="skills-grid">
                    {loading ? <div className="loader"></div> : skills.map((skill) => (
                        <Link to={`/skill/${skill.id}`} key={skill.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="skill-item">
                                <div className="skill-info">
                                    <span>{skill.name}</span>
                                    <span>{skill.proficiency}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${skill.proficiency}%` }}></div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default About;