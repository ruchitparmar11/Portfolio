import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
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
      background: 'rgba(5, 5, 5, 0.8)'
    }}>
      <div style={{ fontFamily: 'Orbitron', fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--accretion-gold)' }}>
        RP
      </div>
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
        <li><Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>ABOUT</Link></li>
        <li><Link to="/projects" className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}>PROJECTS</Link></li>
        <li><Link to="/education" className={`nav-link ${location.pathname === '/education' ? 'active' : ''}`}>EDUCATION</Link></li>
        <li><Link to="/certificates" className={`nav-link ${location.pathname === '/certificates' ? 'active' : ''}`}>CERTIFICATES</Link></li>
        <li><Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} style={{ border: '1px solid var(--fission-orange)', padding: '0.5rem 1rem' }}>HIRE ME</Link></li>
      </ul>
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
      `}</style>
    </nav>
  );
}

export default Navbar;
