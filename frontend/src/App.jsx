import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import StarField from './components/StarField';
import PageTransition from './components/PageTransition';
import About from './pages/About';
import Projects from './pages/Projects';
import Education from './pages/Education';
import Certificates from './pages/Certificates';
import SkillDetail from './pages/SkillDetail';
import Contact from './pages/Contact';

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <StarField />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><About /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
          <Route path="/education" element={<PageTransition><Education /></PageTransition>} />
          <Route path="/certificates" element={<PageTransition><Certificates /></PageTransition>} />
          <Route path="/skill/:id" element={<PageTransition><SkillDetail /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        </Routes>
      </AnimatePresence>

      {/* Footer could go here or in specific pages, let's keep it global */}

    </div>
  );
}

export default App;