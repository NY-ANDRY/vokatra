import { useHeader } from "../contexts/HeaderContext";
import { motion, AnimatePresence } from "framer-motion";
import { bottom_top } from "../components/animations/Index";

const Header = () => {
    const { headerTitle } = useHeader();

    return (
        <header className="h-12 flex items-center justify-between px-5 border-b-[0.6px] border-zinc-300 text-neutral-400 overflow-hidden">
            <div className="flex items-center flex-1 text-xs relative h-5">
                <AnimatePresence mode="popLayout">
                    <motion.div key={headerTitle} {...bottom_top} >
                        {headerTitle}
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="flex">
                <div className="theme cursor-pointer" ></div>
            </div>
        </header>
    );
};

export default Header;