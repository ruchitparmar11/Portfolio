import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

const QuantumDecode = ({ text, interval = 50, revealSpeed = 2, className = "", style = {} }) => {
    const [display, setDisplay] = useState("");
    const [reveal, setReveal] = useState(0);

    useEffect(() => {
        let timer;
        const animate = () => {
            let output = "";
            for (let i = 0; i < text.length; i++) {
                if (i < reveal) {
                    output += text[i];
                } else {
                    output += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            setDisplay(output);

            if (reveal < text.length) {
                setReveal(prev => prev + (1 / revealSpeed)); // Fractional increment for longer scramble duration
            } else {
                clearInterval(timer); // Ensure timer is cleared when done
                setDisplay(text); // Ensure final text is exact
            }
        };

        timer = setInterval(animate, interval);
        return () => clearInterval(timer);
    }, [text, interval, reveal, revealSpeed]);

    return (
        <motion.span
            className={className}
            style={style}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
        >
            {display}
        </motion.span>
    );
};

export default QuantumDecode;
