import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { host } from "../config";
import { Table, Thead, Tbody, Trh, Tr, Th, Td, Input, Label, Button } from "../components/Balise";
import { useEffect, useState } from "react";

const Products = () => {
    const navigate = useNavigate();
    const { data: products, loading: loading_products, error: error_products } = useFetch(`${host}/produits`);
    const [items, setItems] = useState([]);
    const [keywords, setKeywords] = useState('');
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

    useEffect(() => {
        if (keywords != '') {
            filterByKeywords(keywords)
        } else {
            if (products.items) {
                setItems(products.items);
            }
        }
    }, [keywords]);

    const filterByKeywords = async (search) => {
        try {
            const response = await fetch(`${host}/produits?keywords=${search}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setItems(data.items);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex p-8 gap-12">

            <div className="flex w-72 pt-4 border-neutral-300 border-t-[1px]">
                <div className="flex flex-col w-full gap-4">
                    <Input onInput={(e) => { setKeywords(e.target.value) }} placeholder="Keyword" />
                </div>
            </div>

            <div className="flex-1 flex items-baseline flex-wrap gap-4">
                {items.map((item, i) => (

                    <div key={i} onClick={() => { handleClick(item.id) }} className="flex flex-col w-72 gap-0">
                        <img src="https://placehold.co/100" className="w-full rounded-sm" alt="" />
                        <div className="flex justify-between pt-3">
                            <div className="text-[16px]">{item.nom}</div>
                            <div className="text-[16px]">{item.prix} Ar/kg</div>
                        </div>
                        <div className="flex text-neutral-500">
                            <div className="text-[14px]">{item.categorie}</div>
                        </div>
                        <div className="w-full pt-2">
                            <Button onClick={() => handleClick(item.id)} otherClass={"w-full"}>voir</Button>
                        </div>
                    </div>

                ))}

            </div>

        </div>
    )
}

export default Products;