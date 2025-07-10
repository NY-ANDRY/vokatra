import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { host } from "../config";
import { Button } from "../components/Balise";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fade } from "../components/animations/Index";
import Pack from "../components/Pack/Pack";

const Packs = () => {
    const navigate = useNavigate();
    const { data: packs, loading: loading_packs, error: error_packs } = useFetch(`${host}/packs`);

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (packs.items) {
            setItems(packs.items);
        }
    }, [packs]);

    const handleClick = (id) => {
        navigate(`/packs/${id}`)
    }

    const handleReset = () => {
        if (packs.items) {
            setItems(packs.items);
        }
    }

    return (
        <div className="flex flex-col xl:flex-row p-2 xl:p-6 gap-12 h-full max-h-full overflow-auto relative">

            <div className="flex-1 flex flex-col xl:overflow-y-auto items-center xl:flex-col xl:items-center gap-6">

                <AnimatePresence mode="popLayout">

                    {items.map((item) => (

                        <motion.div
                            key={item.pack_id}
                            layout
                            {...fade}
                            className="w-full flex items-center justify-center"
                        >
                            <Pack id={item.pack_id} />
                        </motion.div>
                    ))}

                </AnimatePresence>

            </div>

        </div>
    )
}

export default Packs;