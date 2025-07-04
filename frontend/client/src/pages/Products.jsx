import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { host } from "../config";
import { Table, Thead, Tbody, Trh, Tr, Th, Td, Input, Label, Button } from "../components/Balise";
import { useEffect, useState } from "react";
import Select from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import { fade } from "../components/animations/Index";

const Products = () => {
    const navigate = useNavigate();
    const { data: products, loading: loading_products, error: error_products } = useFetch(`${host}/produits`);
    const { data: categories, loading: loading_categories, error: error_categories } = useFetch(`${host}/categories`);

    const [item_categories, setItem_categories] = useState([]);

    const [items, setItems] = useState([]);
    const [keywords, setKeywords] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [categorieId, setCategorieId] = useState('');

    useEffect(() => {
        if (products.items) {
            setItems(products.items);
        }
        if (categories.items) {
            setItem_categories(categories.items);
        }
    }, [products, categories]);

    const handleClick = (id) => {
        navigate(`/products/${id}`)
    }

    const handleReset = () => {
        if (products.items) {
            setItems(products.items);
        }
    }

    useEffect(() => {
        if (keywords != '') {
            filterByKeywords(keywords)
        } else {
            if (products.items) {
                setItems(products.items);
            }
        }
    }, [keywords]);

    useEffect(() => {
        if (categorieId != '') {
            filterByCategorie(categorieId);
        } else {
            if (products.items) {
                setItems(products.items);
            }
        }
    }, [categorieId]);

    const filterByKeywords = async (search) => {
        try {
            const response = await fetch(`${host}/produits?keywords=${search}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            if (data.items) {
                setItems(data.items);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    const filterByCategorie = async (search) => {
        try {
            const response = await fetch(`${host}/produits?categorie_id=${search}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            if (data.items) {
                setItems(data.items);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col xl:flex-row p-2 xl:p-8 gap-12">

            <div className="flex flex-col gap-4 w-full xl:w-72 pt-4 border-neutral-300 border-t-[1px]">
                <div className="flex flex-col w-full gap-4">
                    <Input onInput={(e) => { setKeywords(e.target.value) }} placeholder="Keywords" />
                </div>

                <div className="flex flex-col w-full gap-2 px-0">
                    <div className="flex justify-between text-neutral-600">
                        <div className="p-0">
                            categories
                        </div>
                        <div className="p-px cursor-pointer transition-all hover:bg-gray-200 active:bg-gray-400 rounded-sm" onClick={handleReset}>
                            <img src="./assets/svg/reset.svg" className="w-5" alt="" />
                        </div>
                    </div>
                    <div className="flex w-full text-neutral-600">
                        <Select
                            options={item_categories}
                            value={item_categories.find(cat => cat.value == categorieId)}
                            onChange={(selectedOption) => {
                                setCategorieId(selectedOption.value);
                            }}
                            className="w-full z-0"
                        />
                    </div>
                </div>

            </div>

            <div className="flex-1 flex flex-col items-center xl:flex-row xl:items-baseline flex-wrap gap-6">

                <AnimatePresence mode="popLayout">

                    {items.map((item) => (

                        <motion.div
                            key={item.id}
                            layout
                            {...fade}
                            onClick={() => handleClick(item.id)}
                            className="flex flex-col w-full p-2 xl:p-0 xl:w-72 gap-0 cursor-pointer"
                        >
                            <img src="https://placehold.co/100" className="w-full rounded-sm" alt="" />
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