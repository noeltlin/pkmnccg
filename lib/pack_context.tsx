import React, { createContext, useContext, useState } from 'react';

const ActivePackContext = createContext([null, () => {}]);

export default function ActivePack({children}) {

    //const [pack, setPack] = useState(null);

    //console.log('ActivePackContext pack:', pack);

    return (
        <ActivePackContext.Provider value={[]}>
            {children}
        </ActivePackContext.Provider>
    );
}

export function useActivePack() {
    return useContext(ActivePackContext);
}

/*
const PackContext = createContext([]);

export default function ActivePack({ children }) {
    const [pack, setPack] = useState(null);

    return (
        <PackContext.Provider value={[pack, setPack]}>
            {children}
        </PackContext.Provider>
    )   
}

export function setActivePack(packArray) {
    setPack(packArray);
}

export function useActivePack() {
    return useContext(PackContext);
}; */