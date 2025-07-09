import { motion, AnimatePresence } from "framer-motion"
import DatePicker from "react-datepicker"

export const Input = ({ otherClass, ...rest }) => {
    return <input className={'bg-neutral-50 w-full h-8 px-0 pl-4 pr-4 rounded-sm border-neutral-300 text-neutral-800 text-sm focus:outline-0 border-[1px] transition-all hover:border-green-500 focus:border-green-600' + ` ${otherClass}`} {...rest} />
}

export const TextArea = ({ otherClass, ...rest }) => {
    return <textarea rows="4" className={'py-2 bg-neutral-50 w-full px-0 pl-4 pr-4 rounded-sm border-neutral-300 text-neutral-800 text-sm focus:outline-0 border-[1px] transition-all hover:border-green-500 focus:border-green-600 ' + ` ${otherClass}`} {...rest} />
}

export const DatePick = ({ otherClass, ...rest }) => {
    return (
        <DatePicker
            className={'bg-neutral-50 w-full h-8 px-0 pl-4 pr-4 rounded-sm border-neutral-300 text-neutral-800 text-sm focus:outline-0 border-[1px] transition-all hover:border-green-500 focus:border-green-600 '  + ` ${otherClass}`}
            dateFormat="yyyy-MM-dd"
            isClearable
            showYearDropdown
            scrollableMonthYearDropdown
            {...rest}
        />
    )
}

export const DateTimePick = ({ otherClass, ...rest }) => {
    return (
        <DatePicker
            className={
                'bg-neutral-50 w-full h-8 px-0 pl-4 pr-4 rounded-sm border-neutral-300 text-neutral-800 text-sm focus:outline-0 border-[1px] transition-all hover:border-green-500 focus:border-green-600 ' +
                `${otherClass}`
            }
            dateFormat="yyyy-MM-dd HH:mm"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Heure"
            isClearable
            showYearDropdown
            scrollableMonthYearDropdown
            {...rest}
        />
    );
};

export const Label = ({ children, otherClass, ...rest }) => {
    return <label className={'text-neutral-500 font-[i] text-sm whitespace-nowrap' + ` ${otherClass}`} {...rest}> {children} </label>
}

export const Button = ({ children, otherClass, ...rest }) => {
    return <button className={'px-3 py-0.5 text-white rounded-sm font-[i-m] bg-green-500 border-green-400 transition-all hover:bg-green-600 active:bg-green-700 border-[1px] cursor-pointer' + ` ${otherClass}`} {...rest}> {children} </button>
}

export const Button_red = ({ children, otherClass, ...rest }) => {
    return <button className={'px-3 py-0.5 rounded-sm bg-red-300 border-red-400 transition-all hover:bg-red-400 active:bg-red-500 border-[1px] cursor-pointer' + ` ${otherClass}`} {...rest}> {children} </button>
}

export const Table = ({ children, ...rest }) => {
    return (
        <table className="table w-full bg-neutral-100 rounded-md overflow-hidden" {...rest}>
            {children}
        </table>
    )
}

export const Thead = ({ children, ...rest }) => {
    return (
        <thead className="text-neutral-400 border-zinc-700 border-b-[1px] cursor-pointer" {...rest}>{children}</thead>
    )
}

export const Tbody = ({ children, ...rest }) => {
    return (
        <tbody className="text-neutral-700 font-light" {...rest}>{children}</tbody>
    )
}

export const Trh = ({ children, delay, ...rest }) => {
    return (
        <motion.tr
            key={delay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: delay * 0.05 }}
            className="cursor-pointer font-light text-left transition-normal bg-transparent"
            {...rest}
        >
            {children}
        </motion.tr>
    )
}

export const Tr = ({ children, delay, ...rest }) => {
    return (
        <motion.tr
            key={delay}
            // initial={{ opacity: 0, y: 10 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.3, delay: delay * 0.05 }}
            className="cursor-pointer font-light text-left transition-normal bg-transparent transition-all hover:bg-green-200 active:bg-green-400 "
            {...rest}
        >
            {children}
        </motion.tr>
    )
}

export const Th = ({ children, ...rest }) => {
    return (
        <td className="font-light px-4 py-2" {...rest}>{children}</td>
    )
}

export const Td = ({ children, id, ...rest }) => {
    return (

        <td className="px-4 py-2 relative" {...rest}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.1, ease: 'easeOut' }}
                    style={{ display: "inline-block" }}
                >
                    {children}
                </motion.span>
            </AnimatePresence>
        </td >

    )
}
