import { useHeader } from "../../contexts/HeaderContext";
import { motion, AnimatePresence } from "framer-motion";
import { show } from "../../components/animations/Index";
import { useNavigate, Link } from "react-router-dom";
import { useNav } from "../../contexts/NavContext";
import Panier_popup from "../Panier_popup";
import { usePanier } from "../../contexts/PanierContext";

const Header = () => {
    const navigate = useNavigate();
    const { openPanier, setOpenPanier } = usePanier();
    const { headerTitle } = useHeader();
    const { navLocation, setNavLocation } = useNav();

    return (
        <>
            <header className="h-12 flex items-center justify-between gap-24 px-5 border-b-[0.6px] border-zinc-300 text-neutral-400 overflow-hidden">
                <div className="flex items-center text-xs relative h-5">
                    <AnimatePresence mode="popLayout">
                        <Link to={"/"}>
                            <motion.div key={headerTitle} {...show} className="text-neutral-900 font-[i-b] text-sm xl:text-xl" >
                                {headerTitle}
                            </motion.div>
                        </Link>
                    </AnimatePresence>
                </div>

                <div className="hidden xl:flex xl:flex-1">


                    <div className="flex-1 text-gray-500 flex items-center gap-2">
                        <Link to={"/commandes"} className="px-2 cursor-pointer">
                            commandes
                        </Link>
                        <Link to={"/factures"} className="px-2 cursor-pointer">
                            factures
                        </Link>
                    </div>

                    <div className="flex">
                        <div className="theme flex items-center cursor-pointer" >
                            <Link to={"/panier"} className="px-2 cursor-pointer">
                                panier
                            </Link>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="theme flex items-center cursor-pointer hover:bg-gray-200 rounded-sm p-2" onClick={() => { setOpenPanier(!openPanier) }} >
                            <img src="./assets/svg/panier.svg" className="w-8" alt="" />
                        </div>

                        <div className="flex z-50">
                            <Panier_popup />
                        </div>
                    </div>
                </div>

            </header>

            <nav className="fixed xl:hidden bg-white w-full bottom-0 h-12 flex items-center justify-between">

                <div className="flex flex-1 w-full justify-between xl:flex-1">

                    <div className="flex-1 text-gray-500 flex items-center justify-center gap-2">
                        <div className="p-0">

                            <Link to={"/commandes"} className="px-2 cursor-pointer">
                                commandes
                            </Link>
                        </div>
                        <div className="p-0">

                            <Link to={"/factures"} className="px-2 cursor-pointer">
                                factures
                            </Link>
                        </div>

                        <div className="p-0">

                            <Link to={"/panier"} className="px-2 cursor-pointer">
                                panier
                            </Link>
                        </div>
                    </div>

                    <div className="flex pr-8">
                        <div className="theme flex items-center cursor-pointer hover:bg-gray-200 rounded-sm p-2" onClick={() => { setOpenPanier(!openPanier) }} >
                            <img src="./assets/svg/panier.svg" className="w-8" alt="" />
                        </div>

                        <div className="flex z-50">
                            <Panier_popup />
                        </div>
                    </div>

                </div>

            </nav>
        </>
    );
};

export default Header;