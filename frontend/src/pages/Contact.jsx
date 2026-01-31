import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuantumDecode from '../components/QuantumDecode';
import { useSound } from '../context/SoundContext';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const { playClick } = useSound();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        playClick(); // Play sound on submit
        setStatus('sending');
        try {
            console.log("Transmitting to uplink:", `${API_URL}/contact`, formData);
            const res = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            console.log("Uplink status:", res.status);
            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                // Reset after 5 seconds
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                const errorText = await res.text();
                console.error("Transmission rejected:", errorText);
                setStatus('error');
            }
        } catch (err) {
            console.error("Signal lost:", err);
            setStatus('error');
        }
    };

    return (
        <div className="page-content container" style={{ paddingTop: '100px', display: 'flex', justifyContent: 'center', minHeight: '80vh', alignItems: 'center' }}>
            <motion.div
                className="glass-panel"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                style={{ width: '100%', maxWidth: '700px', border: '1px solid var(--fission-orange)', position: 'relative', overflow: 'hidden' }}
            >
                {/* Decorative Tech Lines */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'var(--fission-orange)', opacity: 0.5 }}></div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '100%', height: '2px', background: 'var(--fission-orange)', opacity: 0.5 }}></div>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '2px', height: '30px', background: 'var(--fission-orange)' }}></div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '2px', height: '30px', background: 'var(--fission-orange)' }}></div>

                <div style={{ padding: '2rem' }}>
                    <h2 style={{ color: 'var(--fission-orange)', textAlign: 'center', marginBottom: '0.5rem', letterSpacing: '4px' }}>
                        <QuantumDecode text="ESTABLISH UPLINK" interval={40} revealSpeed={1.5} />
                    </h2>
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontFamily: 'Share Tech Mono', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
                        SECURE CHANNEL // ENCRYPTION: ENABLED
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ position: 'relative' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontFamily: 'Share Tech Mono',
                                color: 'var(--fission-orange)',
                                fontSize: '0.8rem',
                                letterSpacing: '1px'
                            }}>
                                // CALLSIGN (NAME)
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'rgba(0,0,0,0.3)',
                                    border: 'none',
                                    borderBottom: '1px solid var(--text-secondary)',
                                    color: 'var(--quantum-white)',
                                    fontFamily: 'Jura',
                                    fontSize: '1.1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.3s'
                                }}
                                onFocus={(e) => { e.target.style.borderBottomColor = 'var(--fission-orange)'; }}
                                onBlur={(e) => e.target.style.borderBottomColor = 'var(--text-secondary)'}
                                placeholder="_"
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontFamily: 'Share Tech Mono',
                                color: 'var(--fission-orange)',
                                fontSize: '0.8rem',
                                letterSpacing: '1px'
                            }}>
                                // COMM FREQUENCY (EMAIL)
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'rgba(0,0,0,0.3)',
                                    border: 'none',
                                    borderBottom: '1px solid var(--text-secondary)',
                                    color: 'var(--quantum-white)',
                                    fontFamily: 'Jura',
                                    fontSize: '1.1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.3s'
                                }}
                                onFocus={(e) => { e.target.style.borderBottomColor = 'var(--fission-orange)'; }}
                                onBlur={(e) => e.target.style.borderBottomColor = 'var(--text-secondary)'}
                                placeholder="_"
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontFamily: 'Share Tech Mono',
                                color: 'var(--fission-orange)',
                                fontSize: '0.8rem',
                                letterSpacing: '1px'
                            }}>
                                // DATA PACKET (MESSAGE)
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'rgba(0,0,0,0.3)',
                                    border: '1px solid var(--text-secondary)',
                                    color: 'var(--quantum-white)',
                                    fontFamily: 'Jura',
                                    fontSize: '1rem',
                                    resize: 'vertical',
                                    outline: 'none',
                                    transition: 'border-color 0.3s'
                                }}
                                onFocus={(e) => { e.target.style.borderColor = 'var(--fission-orange)'; }}
                                onBlur={(e) => e.target.style.borderColor = 'var(--text-secondary)'}
                                placeholder="Start typing transmission..."
                            />
                        </div>

                        <div style={{ position: 'relative', height: '60px' }}>
                            <AnimatePresence mode="wait">
                                {status === 'idle' && (
                                    <motion.button
                                        key="idle"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        whileHover={{ backgroundColor: 'rgba(255, 85, 0, 0.1)' }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={status === 'sending'}
                                        onClick={playClick}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            background: 'transparent',
                                            border: '1px solid var(--fission-orange)',
                                            color: 'var(--fission-orange)',
                                            fontFamily: 'Share Tech Mono',
                                            fontSize: '1.1rem',
                                            cursor: 'pointer',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            position: 'absolute'
                                        }}
                                    >
                                        [ INITIATE TRANSMISSION ]
                                    </motion.button>
                                )}

                                {status === 'sending' && (
                                    <motion.div
                                        key="sending"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '10px',
                                            color: 'var(--fission-orange)',
                                            fontFamily: 'Share Tech Mono'
                                        }}
                                    >
                                        <motion.span
                                            animate={{ opacity: [0, 1, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                        >
                                            {'>>> UPLOADING PACKET...'}
                                        </motion.span>
                                    </motion.div>
                                )}

                                {status === 'success' && (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            textAlign: 'center',
                                            color: '#00ff00',
                                            fontFamily: 'Share Tech Mono',
                                            border: '1px solid #00ff00',
                                            padding: '1rem',
                                            background: 'rgba(0, 255, 0, 0.05)'
                                        }}
                                    >
                                        TRANSMISSION SUCCESSFUL
                                    </motion.div>
                                )}

                                {status === 'error' && (
                                    <motion.div
                                        key="error"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            textAlign: 'center',
                                            color: '#ff0000',
                                            fontFamily: 'Share Tech Mono',
                                            border: '1px solid #ff0000',
                                            padding: '1rem',
                                            background: 'rgba(255, 0, 0, 0.05)'
                                        }}
                                    >
                                        SIGNAL FAILED. RETRY?
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

export default Contact;
