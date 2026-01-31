import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
    const audioCtx = useRef(null);
    const masterGain = useRef(null);
    const musicRef = useRef(null);

    // Initialize background music
    useEffect(() => {
        musicRef.current = new Audio('/music/succession.mp3');
        musicRef.current.loop = true;
        musicRef.current.volume = 0.3; // Subtle background volume

        // Attempt to play immediately
        const playPromise = musicRef.current.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => {
                console.log("Auto-play prevented by browser policy. Interaction needed.");
            });
        }

        return () => {
            if (musicRef.current) {
                musicRef.current.pause();
                musicRef.current = null;
            }
        };
    }, []);

    // Global Interaction Listener for Mobile/Autoplay Unlock
    useEffect(() => {
        const enableAudio = () => {
            // 1. Resume Audio Context
            if (audioCtx.current && audioCtx.current.state === 'suspended') {
                audioCtx.current.resume();
            }

            // 2. Play Music if paused
            if (musicRef.current && musicRef.current.paused) {
                musicRef.current.play().catch(e => console.log("Still waiting for interaction..."));
            }
        };

        window.addEventListener('click', enableAudio);
        window.addEventListener('touchstart', enableAudio);
        window.addEventListener('keydown', enableAudio);

        return () => {
            window.removeEventListener('click', enableAudio);
            window.removeEventListener('touchstart', enableAudio);
            window.removeEventListener('keydown', enableAudio);
        };
    }, []);

    const initAudio = () => {
        if (!audioCtx.current) {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            audioCtx.current = new Ctx();
            masterGain.current = audioCtx.current.createGain();
            masterGain.current.gain.value = 0.05; // Keep it subtle!
            masterGain.current.connect(audioCtx.current.destination);
        }
        if (audioCtx.current.state === 'suspended') {
            audioCtx.current.resume().catch(e => console.log("Audio resume failed", e));
        }
    };

    const playHover = useCallback(() => {
        try {
            initAudio();
            const ctx = audioCtx.current;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(masterGain.current);

            const now = ctx.currentTime;
            osc.type = 'sine';
            // High tech short chirp (UI hover)
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.3, now + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

            osc.start(now);
            osc.stop(now + 0.1);
        } catch (e) {
            // Ignore audio errors
        }
    }, []);

    const playClick = useCallback(() => {
        try {
            initAudio();
            const ctx = audioCtx.current;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(masterGain.current);

            const now = ctx.currentTime;
            // Mechanical "enter" sound
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.15);

            gain.gain.setValueAtTime(0.4, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

            osc.start(now);
            osc.stop(now + 0.15);
        } catch (e) {
            // Ignore
        }
    }, []);

    return (
        <SoundContext.Provider value={{ playHover, playClick }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => useContext(SoundContext);
