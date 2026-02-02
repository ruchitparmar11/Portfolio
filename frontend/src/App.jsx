import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import StarField from './components/StarField';
import CursorHUD from './components/CursorHUD';
import CommandTerminal from './components/CommandTerminal';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import About from './pages/About';
import Projects from './pages/Projects';
import Education from './pages/Education';
import Certificates from './pages/Certificates';
import Experience from './pages/Experience';
import SkillDetail from './pages/SkillDetail';
import Contact from './pages/Contact';

function App() {
  const location = useLocation();

  // Check for touch device to optionally disable custom cursor logic if needed
  // (CSS media query handles visibility, but we can prevent rendering too)
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  return (
    <div className="app-container">
      {!isTouch && <CursorHUD />}
      <CommandTerminal />
      <StarField />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><About /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
          <Route path="/education" element={<PageTransition><Education /></PageTransition>} />
          <Route path="/experience" element={<PageTransition><Experience /></PageTransition>} />
          <Route path="/certificates" element={<PageTransition><Certificates /></PageTransition>} />
          <Route path="/skill/:id" element={<PageTransition><SkillDetail /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;