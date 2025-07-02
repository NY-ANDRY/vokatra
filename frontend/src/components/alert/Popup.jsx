import { motion, AnimatePresence } from "framer-motion";

const Popup = ({ children, show }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-neutral-950 text-white px-6 py-3 rounded shadow-lg z-50"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Popup;
