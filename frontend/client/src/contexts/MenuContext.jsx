import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <MenuContext.Provider value={{ openMenu, setOpenMenu }}>
            {children}
        </MenuContext.Provider>
    );
};

const useMenu = () => {
    return useContext(MenuContext);
};

export { MenuProvider, useMenu };