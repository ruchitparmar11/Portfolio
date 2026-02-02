import React, { useEffect, useRef } from 'react';

const StarField = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        let stars = [];
        const numStars = 150; // Optimized for performance
        const centerX = width / 2;
        const centerY = height / 2;

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e) => {
            // Calculate mouse offset from center
            mouseX = (e.clientX - centerX);
            mouseY = (e.clientY - centerY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        class Star {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.z = Math.random() * width; // 'Depth' into the screen
                this.size = Math.random() * 1.5;

                // Color variation based on theme
                const colorRoll = Math.random();
                if (colorRoll > 0.9) this.color = '#ffffff';
                else if (colorRoll > 0.7) this.color = '#7a7979'; // Dust grey
                else if (colorRoll > 0.5) this.color = '#ff9900'; // Uranium Glow
                else this.color = '#ff5500'; // Fission Orange
            }

            update() {
                // Parallax Logic:
                // We map 'z' to a speed factor. 
                // Smaller 'z' means closer = moves faster.
                // Larger 'z' means further = moves slower.

                // Normalizing z to get a speed factor
                // Let's say max depth is 'width'.
                const depth = this.z / width; // 0 to 1
                const speed = (1 - depth) * 0.15; // Closer stars (depth near 0) move faster

                // Move stars opposite to mouse direction to simulate camera movement
                const offsetX = mouseX * speed;
                const offsetY = mouseY * speed;

                // We do NOT permanently shift "this.x", because that would make them drift off screen forever if mouse is held still.
                // Instead, we calculate a meaningful "screen position" based on their base (x,y) and the offset.
                // But typically starfields drift. Let's do a subtle drift + parallax.

                // For this implementation, let's do a proper "shifting" parallax where moving the mouse shifts the view.
                // We keep track of a "virtual camera" position? 
                // Simpler: Just nudge the drawn position.

                // Let's stick to the "drifting" model where mouse movement creates velocity?
                // OR the "layered" model where static mouse means static shift.
                // The prompt asks for "Parallax", which usually implies the layered shift.

                // Implementation for layered shift:
                // We need to store original positions? No, we can just apply the shift during draw.
                // But we wrap around.

            }

            // Let's refine the update method to be loop-friendly
            // We'll make them float slowly, and the mouse adds a significant offset.

            draw() {
                // Calculate final position with parallax offset
                const depth = this.z / width; // 0 (close) to 1 (far)
                const speed = (1 - depth) * 2; // Factor for parallax intensity

                // Parallax Offset
                const shiftX = (mouseX * speed * 0.05); // 0.05 is sensitivity
                const shiftY = (mouseY * speed * 0.05);

                let renderX = this.x - shiftX;
                let renderY = this.y - shiftY;

                // Wrap around for rendering so we don't see empty edges
                // This is a bit tricky with static shifting, but if we assume the shift isn't massive (limited to screen bounds interaction), it's okay.
                // For infinite scrolling we'd need a different approach.
                // If renderX is out of bounds, wrap it?
                // Simple wrap:
                while (renderX < 0) renderX += width;
                while (renderX > width) renderX -= width;
                while (renderY < 0) renderY += height;
                while (renderY > height) renderY -= height;

                // Brightness based on depth
                const brightness = (1 - depth) * 0.8 + 0.2;

                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.globalAlpha = brightness;
                // Size adjustment based on depth
                const currentSize = Math.max(0.5, this.size * (1 - depth) * 1.5);
                ctx.arc(renderX, renderY, currentSize, 0, Math.PI * 2);
                ctx.fill();
            }

            // Add a slow inherent drift
            tick() {
                this.x -= 0.2 * (1 - this.z / width); // Slow left drift
                if (this.x < 0) this.x += width;
            }
        }

        const initStars = () => {
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push(new Star());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            stars.forEach(star => {
                star.tick();
                star.draw();
            });

            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            // Re-init isn't strictly necessary if we rely on relative width, 
            // but getting new randoms is fine.
            initStars();
        };

        initStars();
        animate();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="star-field"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                pointerEvents: 'none',
                background: 'radial-gradient(circle at center, #1a0a00 0%, #000000 100%)'
            }}
        />
    );
};

export default StarField;
