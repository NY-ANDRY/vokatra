import { useState, useEffect } from "react";
import { Input } from "../Balise";
import { host } from "../../config";

const Filtre_prix = ({ setItems, handleReset }) => {

    const [prix_min, setPrix_min] = useState(null);
    const [prix_max, setPrix_max] = useState(null);

    useEffect(() => {

        if (!isNaN(prix_min) && !isNaN(prix_max)) {
            console.log('bb');

            filterByPrix(prix_min, prix_max);
        } else {
            if (products.items) {
                setItems(products.items);
            }
        }
    }, [prix_min, prix_max]);

    const filterByPrix = async (min, max) => {
        try {
            const response = await fetch(`${host}/produits?min=${min}&max=${max}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            if (data.items) {
                console.log(data.items);

                setItems(data.items);
            }
        } catch (err) {
            console.log(err);

        } finally {
        }
    }

    const reset = () => {
        setPrix_min('');
        setPrix_max('');
        handleReset();
    }

    return (
        <>
            <div className="flex justify-between text-neutral-600">
                <div className="p-0">
                    prix / kg
                </div>
                <div className="p-px cursor-pointer transition-all hover:bg-gray-200 active:bg-gray-400 rounded-sm" onClick={reset}>
                    <img src="./assets/svg/reset.svg" className="w-5" alt="" />
                </div>
            </div>
            <div className="flex items-center w-full gap-2 text-neutral-600">
                <div className="flex flex-col">
                    <div className="text-gray-400 text-sm">min</div>
                    <Input
                        value={prix_min}
                        onChange={(e) => {
                            if (!isNaN(e.target.value)) setPrix_min(e.target.value);
                        }}
                    />
                </div>
                <div className="flex flex-col">
                    <div className="text-gray-400 text-sm">max</div>
                    <Input
                        value={prix_max}
                        onChange={(e) => {
                            if (!isNaN(e.target.value)) setPrix_max(e.target.value);
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default Filtre_prix;