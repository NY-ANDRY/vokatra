import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { host } from "../../config";
import { Button, Input } from "../Balise";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fade } from "../animations/Index";
import { usePanier } from "../../contexts/PanierContext";
import Alert from "../alert/Alert";

const Packs = ({ id }) => {
    const navigate = useNavigate();
    const { setOpenPanier } = usePanier();
    const { data: pack, loading: loading_packs, error: error_packs } = useFetch(`${host}/packs/${id}`);

    const [item, setItem] = useState([]);
    const [products, setProducts] = useState([]);

    const [nb, setNb] = useState(1);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (pack.item) {
            setItem(pack.item);
        }
        if (pack.produits) {
            setProducts(pack.produits);
        }
    }, [pack]);

    const handleClick = () => {
        navigate(`/packs/${id}`);
    }

    const handleChange = (e) => {
        if (!isNaN(e.target.value)) {
            setNb(e.target.value)
        }
    }

    const handleSubmit = async () => {

        const url_stock = `${host}/paniers_packs`;

        const data_send = {
            pack_id: id,
            quantity: nb
        };

        try {
            const response = await fetch(url_stock,
                {
                    method: "POST",
                    body: JSON.stringify(data_send),
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            if (result.ok) {
                setOpenPanier(true);
                // navigate("/packs");
            } else if (result.message) {
                setError(result.message);
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 2000);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            console.log("finally");

        }
    }

    return (
        <>
            <div className="flex flex-col w-full p-2 xl:w-[1000px] xl:flex-col gap-2 border-b-[1px] pb-8 xl:pb-8 border-neutral-400">
                <Alert show={showError}>{error}</Alert>

                <div className="flex justify-between">
                    <div className="flex flex-col pt-3 gap-1">
                        <div className="text-[24px]">{item && item.pack_nom}</div>
                        <div className="text-[14px] text-gray-500">{item && item.description}</div>
                    </div>
                    <div className="flex flex-col items-end pt-3 gap-1">
                        <div className="text-[24px] text-gray-900">{item.prix_calcule_avec_reduction} Ar</div>
                        <div className="text-[14px] text-gray-500">- {item.reduction_percent} %</div>
                    </div>
                </div>
                <div className="flex gap-4 pt-2 pb-2">
                    {products.map((product) => (
                        <motion.div
                            key={product.pack_id}
                            layout
                            {...fade}
                            className="w-full justify-baseline flex items-center"
                        >
                            <div className="flex flex-col w-auto">
                                <div className="p-0">{product.produit_nom}</div>
                                <div className="p-0">
                                    <img
                                        src={product.produit_image ? product.produit_image : "https://placehold.co/100"}
                                        className="w-[200px] h-[200px] object-contain rounded-sm"
                                        alt=""
                                    />
                                </div>
                                <div className="p-0">{product.quantite} kg</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="flex justify-between">
                    <div className="p-0 text-gray-500">
                        .
                    </div>
                    <div className="flex items-center gap-6 p-0 text-gray-500">
                        <div className="flex items-center gap-4">
                            <div className="p-1 cursor-pointer rounded-sm hover:bg-gray-300 active:bg-gray-400 transition-all" onClick={() => { setNb(nb - 1) }}>
                                <img src="/assets/svg/minus.svg" className="w-4" alt="" />
                            </div>
                            <div className="p-0">
                                <div className="w-16">
                                    <Input value={nb} onChange={handleChange} otherClass={"text-center"} />
                                </div>
                            </div>
                            <div className="p-1 cursor-pointer rounded-sm hover:bg-gray-300 active:bg-gray-400 transition-all" onClick={() => { setNb(nb + 1) }}>
                                <img src="/assets/svg/add.svg" className="w-4" alt="" />
                            </div>
                        </div>
                        <Button onClick={handleSubmit}>ajouter panier</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Packs;
