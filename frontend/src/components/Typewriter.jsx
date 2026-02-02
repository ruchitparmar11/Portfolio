import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Typewriter = ({ text, delay = 0, speed = 30, className = "" }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => {
            setStarted(true);
        }, delay);

        return () => clearTimeout(startTimer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        let index = 0;
        const intervalId = setInterval(() => {
            if (index < text.length) {
                // Handle HTML breaks crudely if needed, or just append distinct chars
                // For simplicity, we just append content. 
                // A more robust solution might parse HTML, but for bio logs we often use plain text.
                // If text contains HTML tags like <br/>, we might want to handle it.
                // But let's assume raw text processing for the "log" feel.

                setDisplayedText((prev) => prev + text.charAt(index));
                index++;
            } else {
                clearInterval(intervalId);
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [started, text, speed]);

    return (
        <span className={className}>
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                style={{ display: 'inline-block', width: '8px', height: '1em', background: 'var(--fission-orange)', marginLeft: '2px', verticalAlign: 'middle' }}
            />
        </span>
    );
};

export default Typewriter;
