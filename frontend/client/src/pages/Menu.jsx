import { useMenu } from '../contexts/MenuContext';
import { AnimatePresence, motion } from 'framer-motion';
import { left_left } from '../components/animations/Index';

const Menu = () => {
    const { openMenu, setOpenMenu } = useMenu();

    return (
        <>
            <AnimatePresence mode="wait">
                {openMenu &&

                    <motion.div
                        {...left_left}
                        className="fixed flex flex-col z-50 p-2 pt-2 w-[30%] h-full top-0 left-0 bg-green-400 text-black">
                        <div className="flex w-full justify-between">
                            <div className="p-0"></div>
                            <div className=" cursor-pointer hover:bg-gray-200 rounded-sm p-1" onClick={() => { setOpenMenu(false) }}>
                                <img src="/assets/svg/close.svg" alt="" />
                            </div>
                        </div>
                    </motion.div>

                }
            </AnimatePresence>
        </>
    )
}

export default Menu;