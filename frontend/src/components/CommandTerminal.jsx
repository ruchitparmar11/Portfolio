import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../context/SoundContext';

// Command Data Structure
const commands = [
    { id: 'home', label: 'RETURN TO BASE', sub: 'Navigate to Home', action: '/', type: 'NAV' },
    { id: 'projects', label: 'MISSION LOGS', sub: 'View Projects', action: '/projects', type: 'NAV' },
    { id: 'exp', label: 'CAREER HISTORY', sub: 'View Experience', action: '/experience', type: 'NAV' },
    { id: 'edu', label: 'FLIGHT PATH', sub: 'View Education', action: '/education', type: 'NAV' },
    { id: 'cert', label: 'CLASSIFIED DOCS', sub: 'View Certificates', action: '/certificates', type: 'NAV' },
    { id: 'contact', label: 'ESTABLISH UPLINK', sub: 'Contact Me', action: '/contact', type: 'NAV' },
    { id: 'resume', label: 'DOWNLOAD DOSSIER', sub: 'Get Resume PDF', action: 'DOWNLOAD', type: 'SYS' },
    { id: 'github', label: 'ACCESS GITHUB', sub: 'External Link', action: 'EXTERNAL', pay: 'https://github.com/ruchitparmar11', type: 'EXT' },
    { id: 'linkedin', label: 'ACCESS LINKEDIN', sub: 'External Link', action: 'EXTERNAL', pay: 'https://www.linkedin.com/in/ruchit-parmar-16562229b', type: 'EXT' },
];

const CommandTerminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const { playClick, playHover } = useSound();

    // Filter commands based on query
    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase()) ||
        cmd.sub.toLowerCase().includes(query.toLowerCase())
    );

    // Toggle Terminal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
                playClick();
                setQuery('');
                setActiveIndex(0);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [playClick]);

    // Handle Body Class for Theming
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('terminal-open');
        } else {
            document.body.classList.remove('terminal-open');
        }
    }, [isOpen]);

    // Navigation Logic within the customized dropdown
    useEffect(() => {
        const handleNav = (e) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIndex(prev => (prev + 1) % filteredCommands.length);
                playHover(); // Sound effect on navigate
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
                playHover();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                executeCommand(filteredCommands[activeIndex]);
            }
        };

        window.addEventListener('keydown', handleNav);
        return () => window.removeEventListener('keydown', handleNav);
    }, [isOpen, activeIndex, filteredCommands, playHover]);

    const executeCommand = (cmd) => {
        if (!cmd) return;
        playClick(); // Confirm sound

        if (cmd.type === 'NAV') {
            navigate(cmd.action);
        } else if (cmd.type === 'EXT') {
            window.open(cmd.pay, '_blank');
        } else if (cmd.action === 'DOWNLOAD') {
            window.open('/docs/Ruchit_Parmar_Resume.pdf', '_blank');
        }

        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="terminal-overlay" onClick={() => setIsOpen(false)}>
                    <motion.div
                        className="terminal-modal"
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header / Search Bar */}
                        <div className="terminal-search">
                            <span className="terminal-prompt">&gt; QUERY_SYSTEM:</span>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Execute command..."
                                value={query}
                                onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
                                className="terminal-input"
                            />
                            <div className="terminal-badge">CMD+K</div>
                        </div>

                        {/* Scanline Effect Overlay */}
                        <div className="scanline"></div>

                        {/* Results List */}
                        <div className="terminal-results">
                            {filteredCommands.length > 0 ? (
                                filteredCommands.map((cmd, index) => (
                                    <motion.div
                                        key={cmd.id}
                                        className={`terminal-item ${index === activeIndex ? 'active' : ''}`}
                                        onClick={() => executeCommand(cmd)}
                                        onMouseEnter={() => setActiveIndex(index)}
                                    >
                                        <div className="terminal-item-left">
                                            <span className="status-dot"></span>
                                            <span className="cmd-label">{cmd.label}</span>
                                        </div>
                                        <span className="cmd-sub">{cmd.sub}</span>
                                        {index === activeIndex && (
                                            <motion.div
                                                layoutId="highlight"
                                                className="terminal-highlight"
                                                initial={false}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            />
                                        )}
                                    </motion.div>
                                ))
                            ) : (
                                <div className="terminal-empty">NO MATCHING PROTOCOLS FOUND</div>
                            )}
                        </div>

                        {/* Footer Stats */}
                        <div className="terminal-footer">
                            <span>SYSTEM: ONLINE</span>
                            <span>SECURE_CONNECTION</span>
                            <span>v2.0.4</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CommandTerminal;
