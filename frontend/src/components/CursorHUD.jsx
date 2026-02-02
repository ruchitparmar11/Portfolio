import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorHUD = () => {
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth physics for the trailing circle - Optimized for speed
    // Increased stiffness and reduced mass to make it feel "faster" and less "laggy"
    const springConfig = { damping: 30, stiffness: 700, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' ||
                e.target.tagName === 'BUTTON' ||
                e.target.closest('a') ||
                e.target.closest('button') ||
                e.target.classList.contains('interactive') ||
                e.target.classList.contains('clickable')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <div className="custom-cursor-container">
            {/* Primary Crosshair - Direct input tracking */}
            <motion.div
                className="cursor-crosshair"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                }}
            >
                <div className="cross-h"></div>
                <div className="cross-v"></div>
            </motion.div>

            {/* Secondary Outer Ring - Smooth spring follow */}
            <motion.div
                className="cursor-ring"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    scale: isHovered ? 1.5 : 1,
                    borderColor: isHovered ? 'var(--fission-orange)' : 'rgba(255, 85, 0, 0.5)'
                }}
                transition={{ duration: 0.2 }}
            >
                {/* Rotating decorative dashes */}
                <motion.div
                    className="cursor-dashes"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>
        </div>
    );
};

export default CursorHUD;
