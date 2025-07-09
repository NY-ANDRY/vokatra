import { useState, useEffect } from "react";
import { Input } from "../Balise";
import { host } from "../../config";
import Select from "react-select";
import { useFetch } from "../../hooks/useFetch";

const Filtre_categories = ({ setItems, handleReset }) => {

    const { data: categories, loading: loading_categories, error: error_categories } = useFetch(`${host}/categories`);

    const [item_categories, setItem_categories] = useState([]);
    const [categorieId, setCategorieId] = useState('');

    useEffect(() => {
        if (categories.items) {
            setItem_categories(categories.items);
        }
    }, [categories]);

    useEffect(() => {
        if (categorieId != '') {
            filterByCategorie(categorieId);
        } else {
            handleReset()
        }
    }, [categorieId]);

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

    const reset = () => {
        setCategorieId('');
        handleReset();
    }

    return (
        <>
            <div className="flex justify-between text-neutral-600">
                <div className="p-0">
                    categories
                </div>
                <div className="p-px cursor-pointer transition-all hover:bg-gray-200 active:bg-gray-400 rounded-sm" onClick={reset}>
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
        </>
    )
}

export default Filtre_categories;