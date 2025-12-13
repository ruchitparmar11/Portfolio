
import React, { useEffect, useRef } from 'react';

const StarField = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.innerHTML = '';
            // Optimization: Reduced count for performance
            for (let i = 0; i < 75; i++) {
                const ember = document.createElement('div');
                ember.className = 'star';
                const size = Math.random() * 3;
                ember.style.width = `${size}px`;
                ember.style.height = `${size}px`;
                ember.style.left = `${Math.random() * 100}%`;
                ember.style.top = `${Math.random() * 100}%`;
                ember.style.opacity = Math.random() * 0.5 + 0.2;
                ember.style.animationDuration = `${Math.random() * 5 + 3}s`;
                // More varied colors
                const colorRoll = Math.random();
                if (colorRoll > 0.9) ember.style.background = '#ffffff'; // Occasional bright white star
                else if (colorRoll > 0.7) ember.style.background = '#7a7979ff'; // Dust
                else if (colorRoll > 0.4) ember.style.background = '#ff9900'; // Accretion orange
                else ember.style.background = '#ff5500'; // Fission red

                container.appendChild(ember);
            }
        }
    }, []);

    return <div id="star-field" className="star-field" ref={containerRef}></div>;
};

export default StarField;
