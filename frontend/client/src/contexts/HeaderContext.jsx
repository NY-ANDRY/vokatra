import { createContext, useContext, useState } from "react";

const HeaderContext = createContext();

const HeaderProvider = ({ children }) => {
    const [headerTitle, setHeaderTitle] = useState("VOKATRA");

    return (
        <HeaderContext.Provider value={{ headerTitle, setHeaderTitle }}>
            {children}
        </HeaderContext.Provider>
    );
};

const useHeader = () => {
    return useContext(HeaderContext);
};

export { HeaderProvider, useHeader };