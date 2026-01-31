import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../context/SoundContext';

const ExperienceCard = ({ exp, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { playClick } = useSound();

    return (
        <motion.div
            className={`project-feature ${index % 2 === 1 ? 'reversed' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            {/* Visual Side (Left/Right) */}
            <div className="feature-image-container">
                {exp.image_url ? (
                    <>
                        <img src={exp.image_url} alt={exp.company} className="feature-image" />
                        <div className="image-overlay"></div>
                    </>
                ) : (
                    <div style={{ width: '100%', height: '100%', background: 'var(--atomic-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{
                            fontSize: '8rem',
                            fontFamily: 'Share Tech Mono',
                            color: 'rgba(255, 85, 0, 0.1)',
                            fontWeight: 'bold'
                        }}>
                            0{index + 1}
                        </div>
                    </div>
                )}
            </div>

            {/* Content Side */}
            <div className="feature-content">
                <div className="feature-number">0{index + 1}</div>
                <h3 className="feature-title">{exp.company}</h3>

                <h4 style={{ color: 'var(--fission-orange)', fontFamily: 'Share Tech Mono', marginBottom: '1rem', fontSize: '1.1rem' }}>
                    {exp.role} <span style={{ color: 'var(--text-secondary)' }}>// {exp.duration}</span>
                </h4>

                <p className="feature-description">
                    {exp.description}
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {exp.certificate && (
                        <a
                            href={exp.certificate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="feature-link"
                            style={{ fontSize: '0.9rem' }}
                            onClick={playClick}
                        >
                            Download Doc &darr;
                        </a>
                    )}

                    {exp.details && (
                        <button
                            onClick={() => { playClick(); setIsExpanded(!isExpanded); }}
                            className="feature-link"
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--fission-orange)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                            }}
                        >
                            <span>{isExpanded ? 'Close Report' : 'View Report'}</span>
                            <motion.span animate={{ rotate: isExpanded ? 180 : 0 }}>▼</motion.span>
                        </button>
                    )}
                </div>

                <AnimatePresence>
                    {isExpanded && exp.details && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{ overflow: 'hidden', borderTop: '1px dashed var(--glass-border)', paddingTop: '1rem', width: '100%' }}
                        >
                            <h4 style={{ color: 'var(--fission-orange)', fontFamily: 'Share Tech Mono', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                                {exp.details.projectTitle}
                            </h4>
                            <p style={{ color: '#ccc', marginBottom: '1rem', fontSize: '0.95rem' }}>{exp.details.overview}</p>

                            <div style={{ marginBottom: '1rem' }}>
                                <strong style={{ color: 'var(--quantum-white)', display: 'block', marginBottom: '0.5rem' }}>System Architecture:</strong>
                                <ul style={{ listStyle: 'none', paddingLeft: '0.5rem' }}>
                                    {exp.details.structure && exp.details.structure.map((item, i) => (
                                        <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                                            <span style={{ color: 'var(--fission-orange)', marginRight: '0.5rem' }}>&gt;</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <strong style={{ color: 'var(--quantum-white)', display: 'block', marginBottom: '0.5rem' }}>Key Capabilities:</strong>
                                <ul style={{ listStyle: 'none', paddingLeft: '0.5rem' }}>
                                    {exp.details.features && exp.details.features.map((item, i) => (
                                        <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                                            <span style={{ color: 'var(--uranium-glow)', marginRight: '0.5rem' }}>+</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {exp.details.tech_stack && (
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                                    {exp.details.tech_stack.map((tech, i) => (
                                        <span key={i} className="tech-tag" style={{ fontSize: '0.75rem' }}>{tech}</span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default ExperienceCard;
