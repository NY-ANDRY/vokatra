import { createContext, useContext, useState } from "react";

const NavContext = createContext();

const NavProvider = ({ children }) => {
    const [navLocation, setNavLocation] = useState("/");

    return (
        <NavContext.Provider value={{ navLocation, setNavLocation }}>
            {children}
        </NavContext.Provider>
    );
};

const useNav = () => {
    return useContext(NavContext);
};

export { NavProvider, useNav };