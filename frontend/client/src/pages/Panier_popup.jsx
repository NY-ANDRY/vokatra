import { usePanier } from '../contexts/PanierContext';
import Panier from './Panier';
import { AnimatePresence, motion } from 'framer-motion';
import { bottom_top } from '../components/animations/Index';

const Panier_popup = () => {
    const { openPanier, setOpenPanier } = usePanier();

    return (
        <>
            <AnimatePresence mode="wait">
                {openPanier &&

                    <motion.div
                        {...bottom_top}
                        className="fixed flex flex-col z-50 p-2 pt-2 w-full top-8 left-0 xl:left-auto xl:p-4 xl:pt-2 xl:top-[4vh] xl:right-12 bg-white shadow-md rounded-xl text-black xl:w-[800px] h-[92vh]">
                        <div className="flex w-full justify-between">
                            <div className="p-0"></div>
                            <div className=" cursor-pointer hover:bg-gray-200 rounded-sm p-1" onClick={() => {setOpenPanier(false)}}>
                                <img src="/assets/svg/close.svg" alt="" />
                            </div>
                        </div>
                        <Panier></Panier>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}

export default Panier_popup;