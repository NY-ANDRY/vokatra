import { useState, useEffect } from "react";
import { host } from "../../config";
import Select from "react-select";
import { useFetch } from "../../hooks/useFetch";

const Filtre_saisons = ({ setItems, handleReset }) => {

    const { data: saisons, loading: loading_saisons, error: error_saisons } = useFetch(`${host}/saisons`);
    const [item_saisons, setItem_saisons] = useState([]);
    const [saisonsId, setSaisonsId] = useState([]);

    useEffect(() => {
        if (saisons.items) {
            setItem_saisons(saisons.items);
        }
    }, [saisons]);

    useEffect(() => {
        if (saisonsId.length > 0) {
            const ids = saisonsId.map(option => option.value).join('-');
            filterBySaisons(ids);
        } else {
            handleReset();
        }
    }, [saisonsId]);

    const filterBySaisons = async (search) => {
        try {
            const response = await fetch(`${host}/produits?saisons_id=${search}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            if (data.items) {
                setItems(data.items);
            }
        } catch (err) {
            console.error("Erreur filtrage saisons:", err.message);
        }
    }

    const reset = () => {
        setSaisonsId([]);
        handleReset();
    }

    return (
        <>
            <div className="flex justify-between text-neutral-600">
                <div className="p-0">saisons</div>
                <div className="p-px cursor-pointer transition-all hover:bg-gray-200 active:bg-gray-400 rounded-sm" onClick={reset}>
                    <img src="./assets/svg/reset.svg" className="w-5" alt="" />
                </div>
            </div>
            <div className="flex w-full text-neutral-600">
                <Select
                    isMulti
                    options={item_saisons}
                    value={saisonsId}
                    onChange={(selectedOptions) => {
                        setSaisonsId(selectedOptions || []);
                    }}
                    className="w-full z-0"
                />
            </div>
        </>
    );
}

export default Filtre_saisons;
