import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { host } from "../config";
import { Table, Thead, Tbody, Trh, Tr, Th, Td, Button, Input, TextArea, Label, DatePick } from "../components/Balise";
import Select from "react-select";
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import { CustomTooltip } from "../components/Tooltip/CustomToolTip";
import { useNavigate } from "react-router-dom";
import { usePanier } from "../contexts/PanierContext";
import Popup from "../components/alert/Popup";
import Alert from "../components/alert/Alert";

const Products = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setOpenPanier } = usePanier();

    const { data: product, loading: loading_product, error: error_product } = useFetch(`${host}/produits/${id}`);
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const [item, setItem] = useState([]);

    const [quantity, setQuantity] = useState(0);
    const [qtt_prix, setQtt_prix] = useState(0);

    useEffect(() => {
        setOpenPanier(false);
    }, []);

    useEffect(() => {
        if (!isNaN(Number(quantity)) && !isNaN(Number(item.prix))) {
            let qtt = Number(quantity);
            let prix = Number(item.prix);
            setQtt_prix(qtt * prix);
        }
    }, [quantity]);

    useEffect(() => {
        if (product.item) {
            setItem(product.item);
        }
    }, [product]);

    const handleChange = async (newValue) => {
        if (!isNaN(Number(newValue))) {
            setQuantity(newValue);
        }
    }

    const handleClick = async () => {
        console.log("ok");

        const url_stock = `${host}/paniers`;

        const data_send = {
            produit_id: id,
            quantity: quantity
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
                navigate("/products");
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
        <div className="flex w-full justify-center max-h-full overflow-auto">

            <Alert show={showError}>{error}</Alert>

            <div className="w-[1100px] p-4 pt-6 flex flex-col gap-4">
                <div className="pl-2 pb-6 text-neutral-700 font-[i-m] text-2xl">{item && item.nom}</div>

                <div className="flex flex-col xl:flex-row w-full gap-8">

                    <div className="flex flex-col w-[400px]">
                        <img
                            src={item.url_image ? item.url_image : "https://placehold.co/100"}
                            className="w-full object-cover aspect-[4/3] rounded-sm"
                            alt=""
                        />
                    </div>

                    <div className="flex flex-col min-w-[400px] min-h-full justify-baseline xl:justify-between">

                        <div className="flex flex-col">

                            <div className="flex text-[20px] text-neutral-500 pb-2">
                                {item.description}
                            </div>
                            <div className="flex text-[14px] text-neutral-500 pb-4">
                                {item.categorie}
                            </div>
                            <div className="flex">
                            </div>
                            <div className="flex items-center gap-12 pt-8">
                                <div className="pt-2 text-neutral-600">
                                    prix
                                </div>
                                <div className="pt-2 text-xl">
                                    {item.prix} Ar/kg
                                </div>
                            </div>
                            <div className="flex items-center gap-12 pt-0 pb-2">
                                <div className="pt-2 text-neutral-600">
                                    stock
                                </div>
                                <div className="pt-2 text-xl">
                                    {item.stock} Ar/kg
                                </div>
                            </div>

                            <div className="flex items-center gap-12 pt-4">
                                <div className="pt-2 text-neutral-600">
                                    quantity (kg)
                                </div>
                                <div className="pt-2 text-xl">
                                    <Input value={quantity} onInput={(e) => handleChange(e.target.value)} />
                                </div>
                            </div>

                        </div>

                        <div className="w-full flex flex-col xl:flex-row justify-baseline xl:justify-between pt-5">
                            <div className="p-2 text-2xl">
                                {qtt_prix} Ar
                            </div>
                            <div className="flex w-28 h-12">
                                <Button onClick={() => handleClick()} otherClass={"w-full w-full"} >VALIDER</Button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col">
                    -
                </div>

            </div>
        </div>

    )
}

export default Products;