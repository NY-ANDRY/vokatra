import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { host } from "../config";
import { Button } from "../components/Balise";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fade } from "../components/animations/Index";
import Filtre_keywords from "../components/filtre/FIltre_keywords";
import Filtre_prix from "../components/filtre/FIltre_prix";
import Filtre_saisons from "../components/filtre/FIltre_saisons";
import Filtre_categories from "../components/filtre/FIltre_categories";

const Products = () => {
    const navigate = useNavigate();
    const { data: products, loading: loading_products, error: error_products } = useFetch(`${host}/produits`);

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (products.items) {
            setItems(products.items);
        }
    }, [products]);

    const handleClick = (id) => {
        navigate(`/products/${id}`)
    }

    const handleReset = () => {
        if (products.items) {
            setItems(products.items);
        }
    }

    return (
        <div className="flex flex-col xl:flex-row p-2 xl:p-6 gap-12 h-full max-h-full overflow-auto relative">

            <div className="h-fit flex flex-col gap-4 w-full xl:w-72 pt-4 border-neutral-300 border-t-[1px]">
                <div className="flex flex-col w-full gap-4">
                    <Filtre_keywords setItems={setItems} handleReset={handleReset} />
                </div>

                <div className="flex flex-col w-full gap-2 px-0 z-30">
                    <Filtre_categories setItems={setItems} handleReset={handleReset} />
                </div>

                <div className="flex flex-col w-full gap-2 px-0 z-20">
                    <Filtre_saisons setItems={setItems} handleReset={handleReset} />
                </div>

                <div className="flex flex-col w-full gap-0 px-0 z-10">
                    <Filtre_prix setItems={setItems} handleReset={handleReset} />
                </div>

            </div>

            <div className="flex-1 flex flex-col xl:overflow-y-auto items-center xl:flex-row xl:items-baseline flex-wrap gap-6">

                <AnimatePresence mode="popLayout">

                    {items.map((item) => (

                        <motion.div
                            key={item.id}
                            layout
                            {...fade}
                            onClick={() => handleClick(item.id)}
                            className="flex flex-col w-full p-2 xl:p-0 xl:w-72 gap-0 cursor-pointer"
                        >
                            <img
                                src={item.url_image ? item.url_image : "https://placehold.co/100"}
                                className="w-full object-cover aspect-[4/3] rounded-sm"
                                alt=""
                            />
                            <div className="flex justify-between pt-3">
                                <div className="text-[16px]">{item.nom}</div>
                                <div className="text-[16px]">{item.prix} Ar/kg</div>
                            </div>
                            <div className="flex justify-between text-neutral-500">
                                <div className="text-[14px]">{item.categorie}</div>
                            </div>
                            <div className="w-full pt-2">
                                <Button onClick={() => handleClick(item.id)} otherClass={"w-full"}>voir</Button>
                            </div>
                        </motion.div>
                    ))}

                </AnimatePresence>

            </div>

        </div>
    )
}

export default Products;