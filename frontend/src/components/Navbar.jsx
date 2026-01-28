import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: '/', label: 'ABOUT' },
    { path: '/projects', label: 'PROJECTS' },
    { path: '/experience', label: 'EXPERIENCE' },
    { path: '/education', label: 'EDUCATION' },
    { path: '/certificates', label: 'CERTIFICATES' },
    { path: '/contact', label: 'HIRE ME', highlight: true },
  ];

  return (
    <>
      <nav className="glass-panel" style={{
        position: 'fixed',
        top: '0',
        width: '100%',
        zIndex: 1000,
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 0,
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        background: 'rgba(5, 5, 5, 0.9)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ fontFamily: 'Orbitron', fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--accretion-gold)', zIndex: 1001 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>RP</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="desktop-menu" style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                style={link.highlight ? { border: '1px solid var(--fission-orange)', padding: '0.5rem 1rem' } : {}}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div className="mobile-toggle" onClick={toggleMenu} style={{ cursor: 'pointer', zIndex: 1001 }}>
          <div style={{ width: '30px', height: '3px', background: 'var(--fission-orange)', marginBottom: '5px', transition: '0.3s', transform: isOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }}></div>
          <div style={{ width: '30px', height: '3px', background: 'var(--fission-orange)', marginBottom: '5px', opacity: isOpen ? 0 : 1, transition: '0.3s' }}></div>
          <div style={{ width: '30px', height: '3px', background: 'var(--fission-orange)', transition: '0.3s', transform: isOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              background: 'rgba(10, 10, 10, 0.95)',
              backdropFilter: 'blur(15px)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem'
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                style={{ fontSize: '1.5rem' }}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-family: 'Orbitron', sans-serif;
          font-weight: 500;
          letter-spacing: 1px;
          transition: color 0.3s;
        }
        .nav-link:hover, .nav-link.active {
          color: var(--accretion-gold);
          text-shadow: 0 0 10px rgba(255, 170, 51, 0.5);
        }

        /* Responsive Visibility */
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </>
  );
}

export default Navbar;
