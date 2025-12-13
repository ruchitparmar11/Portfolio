
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            console.log("Sending data to:", `${API_URL}/contact`, formData);
            const res = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            console.log("Response status:", res.status);
            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                const errorText = await res.text();
                console.error("Server error:", errorText);
                setStatus('error');
            }
        } catch (err) {
            console.error("Network/Fetch error:", err);
            setStatus('error');
        }
    };

    return (
        <div className="page-content container" style={{ paddingTop: '100px', display: 'flex', justifyContent: 'center' }}>
            <motion.div
                className="glass-panel"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ width: '100%', maxWidth: '600px', border: '1px solid var(--fission-orange)' }}
            >
                <h2 style={{ color: 'var(--fission-orange)', textAlign: 'center', marginBottom: '2rem' }}>
                    ESTABLISH UPLINK
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'Share Tech Mono', color: 'var(--text-secondary)' }}>
                            IDENTIFIER (NAME)
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                background: 'rgba(0,0,0,0.5)',
                                border: '1px solid var(--carbon-grey)',
                                color: 'var(--quantum-white)',
                                fontFamily: 'Jura',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'Share Tech Mono', color: 'var(--text-secondary)' }}>
                            FREQUENCY (EMAIL)
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                background: 'rgba(0,0,0,0.5)',
                                border: '1px solid var(--carbon-grey)',
                                color: 'var(--quantum-white)',
                                fontFamily: 'Jura',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'Share Tech Mono', color: 'var(--text-secondary)' }}>
                            TRANSMISSION (MESSAGE)
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="5"
                            style={{
                                width: '100%',
                                padding: '10px',
                                background: 'rgba(0,0,0,0.5)',
                                border: '1px solid var(--carbon-grey)',
                                color: 'var(--quantum-white)',
                                fontFamily: 'Jura',
                                fontSize: '1rem',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: 'var(--fission-orange)', color: '#000' }}
                        whileTap={{ scale: 0.95 }}
                        disabled={status === 'sending'}
                        style={{
                            padding: '1rem',
                            background: 'transparent',
                            border: '1px solid var(--fission-orange)',
                            color: 'var(--fission-orange)',
                            fontFamily: 'Share Tech Mono',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            marginTop: '1rem',
                            transition: 'all 0.3s'
                        }}
                    >
                        {status === 'sending' ? 'TRANSMITTING...' : 'INITIATE TRANSMISSION'}
                    </motion.button>

                    {status === 'success' && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ color: '#00ff00', textAlign: 'center', fontFamily: 'Share Tech Mono' }}
                        >
                            TRANSMISSION RECEIVED. STAND BY FOR RESPONSE.
                        </motion.p>
                    )}
                    {status === 'error' && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ color: '#ff0000', textAlign: 'center', fontFamily: 'Share Tech Mono' }}
                        >
                            UPLINK FAILED. RETRY SEQUENCE INITIATED.
                        </motion.p>
                    )}
                </form>
            </motion.div>
        </div>
    );
}

export default Contact;
