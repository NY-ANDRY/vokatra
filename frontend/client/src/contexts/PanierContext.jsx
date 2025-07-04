import { createContext, useContext, useState } from "react";

const PanierContext = createContext();

const PanierProvider = ({ children }) => {
    const [openPanier, setOpenPanier] = useState(false);

    return (
        <PanierContext.Provider value={{ openPanier, setOpenPanier }}>
            {children}
        </PanierContext.Provider>
    );
};

const usePanier = () => {
    return useContext(PanierContext);
};

export { PanierProvider, usePanier };