import React, { useState, useEffect } from 'react';

const Footer = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        let timeoutId;
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
        };

        const debouncedCheck = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(checkMobile, 200);
        };

        checkMobile();
        window.addEventListener('resize', debouncedCheck);
        return () => {
            window.removeEventListener('resize', debouncedCheck);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <footer style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: '0.5rem 1rem',
            background: 'rgba(5, 5, 5, 0.95)',
            backdropFilter: 'blur(5px)',
            borderTop: '1px solid rgba(255, 85, 0, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 100,
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            letterSpacing: '1px'
        }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
                    <span style={{ width: '6px', height: '6px', background: '#00ff00', borderRadius: '50%', boxShadow: '0 0 5px #00ff00' }}></span>
                    <span className="sys-status">SYSTEM: ONLINE</span>
                </span>
                <span className="hide-mobile"> // SECURE CONNECTION ESTABLISHED</span>
            </div>

            <div
                className="cmd-hint"
                style={{
                    color: 'var(--fission-orange)',
                    cursor: 'pointer',
                    animation: 'pulse 3s infinite',
                    textAlign: 'right',
                    paddingLeft: '10px'
                }}
                onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
            >
                {isMobile ? '[ TAP TO ACCESS TERMINAL ]' : '[ PRESS CTRL + K TO EXECUTE COMMANDS ]'}
            </div>

            <style>{`
                @keyframes pulse {
                    0% { opacity: 0.7; text-shadow: 0 0 0px var(--fission-orange); }
                    50% { opacity: 1; text-shadow: 0 0 10px var(--fission-orange); }
                    100% { opacity: 0.7; text-shadow: 0 0 0px var(--fission-orange); }
                }
                @media (max-width: 600px) {
                    .hide-mobile { display: none; }
                    .cmd-hint { font-size: 0.7rem; font-weight: bold; }
                    .sys-status { font-size: 0.7rem; }
                    footer { padding: 0.8rem; padding-bottom: max(0.8rem, env(safe-area-inset-bottom)); }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
