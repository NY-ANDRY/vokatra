import Router from './Router';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Routers = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                {Router.map(({ path, element, redirect }) =>
                    redirect ? (
                        <Route key={path} path={path} element={<Navigate to={redirect} replace />} />
                    ) : (
                        <Route key={path} path={path} element={
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                exit={{ opacity: 0, y: 5 }}
                                className='max-w-full max-h-full h-full relative'
                            >
                                {element}
                            </motion.div>
                        } />
                    )
                )}
            </Routes>
        </AnimatePresence>
    )
}

export default Routers;