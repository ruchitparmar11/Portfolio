import React, { createContext, useContext, useCallback } from 'react';

const SoundContext = createContext();

// Sound is disabled — all functions are no-ops.
export const SoundProvider = ({ children }) => {
    const playHover = useCallback(() => { }, []);
    const playClick = useCallback(() => { }, []);

    return (
        <SoundContext.Provider value={{ playHover, playClick }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => useContext(SoundContext);
