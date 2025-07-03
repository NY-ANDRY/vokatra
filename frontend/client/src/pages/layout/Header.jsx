import { useHeader } from "../../contexts/HeaderContext";
import { motion, AnimatePresence } from "framer-motion";
import { show } from "../../components/animations/Index";
import { useNavigate, Link } from "react-router-dom";
import { useNav } from "../../contexts/NavContext";

const Header = () => {
    const navigate = useNavigate();
    const { headerTitle } = useHeader();
    const { navLocation, setNavLocation } = useNav();

    return (
        <header className="h-12 flex items-center justify-between gap-24 px-5 border-b-[0.6px] border-zinc-300 text-neutral-400 overflow-hidden">
            <div className="flex items-center text-xs relative h-5">
                <AnimatePresence mode="popLayout">
                    <Link to={"/"}>
                        <motion.div key={headerTitle} {...show} className="text-neutral-900 font-[i-b] text-xl" >
                            {headerTitle}
                        </motion.div>
                    </Link>
                </AnimatePresence>
            </div>

            <div className="flex-1 text-gray-500 flex items-center gap-2">
                <Link to={"/panier"} className="px-2 cursor-pointer">
                    panier
                </Link>
                <Link to={"/commandes"} className="px-2 cursor-pointer">
                    commandes
                </Link>                
                <Link to={"/factures"} className="px-2 cursor-pointer">
                    factures
                </Link>
            </div>

            <div className="flex">
                <div className="theme cursor-pointer" >dsa</div>
            </div>
        </header>
    );
};

export default Header;