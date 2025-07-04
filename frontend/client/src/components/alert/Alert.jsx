import { motion, AnimatePresence } from "framer-motion";

const Alert = ({ children, show }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    className="fixed top-12 left-1/2 transform -translate-x-1/2 bg-red-700 text-white font-[i-b] px-6 py-3 rounded shadow-lg z-50"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Alert;
