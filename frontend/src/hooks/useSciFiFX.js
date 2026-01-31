import { useRef, useCallback, useState, useEffect } from 'react';

export const useSciFiFX = () => {
    const audioCtx = useRef(null);
    const masterGain = useRef(null);
    const [isMuted, setIsMuted] = useState(false);

    const initAudio = () => {
        if (!audioCtx.current) {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            audioCtx.current = new Ctx();
            masterGain.current = audioCtx.current.createGain();
            masterGain.current.gain.value = 0.15; // Moderate volume
            masterGain.current.connect(audioCtx.current.destination);
        }
        if (audioCtx.current.state === 'suspended') {
            audioCtx.current.resume();
        }
    };

    const playHover = useCallback(() => {
        if (isMuted) return;
        initAudio();
        const ctx = audioCtx.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(masterGain.current);

        // Futuristic chirp
        // Frequency: Rapid slide up
        const now = ctx.currentTime;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.05);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);

        // Envelope
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.5, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        osc.start(now);
        osc.stop(now + 0.1);
    }, [isMuted]);

    const playClick = useCallback(() => {
        if (isMuted) return;
        initAudio();
        const ctx = audioCtx.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(masterGain.current);

        // Mechanical confirm
        const now = ctx.currentTime;
        osc.type = 'square';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);

        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        osc.start(now);
        osc.stop(now + 0.1);
    }, [isMuted]);

    const playAmbience = useCallback(() => {
        if (isMuted) return;
        initAudio();
        const ctx = audioCtx.current;

        // Brown noise for low hum
        const bufferSize = ctx.sampleRate * 2; // 2 seconds buffer
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (0 + (0.02 * white)) / 1.02;
            data[i] *= 3.5; // (rough brown noise approx)
            // Actually simpler to just use white noise + lowpass filter
        }

        // Just use white noise generator logic simplified
        // Create an oscillator for a low drone instead, cleaner
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.value = 50; // Low drone

        filter.type = 'lowpass';
        filter.frequency.value = 120;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain.current);

        gain.gain.value = 0.05; // Very quiet

        osc.start();
        // Return stop function
        return () => osc.stop();
    }, [isMuted]);

    return { playHover, playClick, playAmbience, isMuted, setIsMuted };
};
