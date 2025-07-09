import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { host } from "../../../config";
import { Table, Thead, Tbody, Trh, Tr, Th, Td, Button, Input, TextArea, Label, DatePick } from "../../../components/Balise";
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
import { CustomTooltip } from "../../../components/Tooltip/CustomToolTip";

const Products = () => {
    const { id } = useParams();
    const { data: product, loading: loading_product, error: error_product } = useFetch(`${host}/produits/${id}`);
    const { data: categories, loading: loading_categories, error: error_categories } = useFetch(`${host}/categories`);
    const [item, setItem] = useState([]);
    const [item_categories, setItem_categories] = useState([]);
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [categorie, setCategorie] = useState('');
    const [categorieId, setCategorieId] = useState('');
    const [prix, setPrix] = useState('');
    const [stock, setStock] = useState('');
    const [stock_histo, setStock_histo] = useState([]);


    const [date_stock, setDate_stock] = useState('');
    const [value_stock, setValue_stock] = useState(0);

    useEffect(() => {
        // const todayy = new Date();
        // const yyyy = todayy.getFullYear();
        // const mm = String(todayy.getMonth() + 1).padStart(2, '0');
        // const dd = String(todayy.getDate()).padStart(2, '0')
        // const dateToday = `${yyyy}-${mm}-${dd}`
        // setDate_stock(dateToday);
    }, []);

    useEffect(() => {
        if (product.item) {
            setItem(product.item);
            setNom(product.item.nom);
            setDescription(product.item.description);
            setPrix(product.item.prix);
            setStock(product.item.stock);
            setStock_histo(product.stock_histo);
            console.log(product.stock_histo);


            setCategorie(product.item.categorie);
            setCategorieId(product.item.categorie_id);
        }
        if (categories.items) {
            setItem_categories(categories.items);
        }
    }, [product, categories]);

    const handleClick = () => {
        console.log("hehe");
    }

    const handleClick2 = async () => {
        console.log("go");

        const url_stock = `${host}/stocks/produits`

        const formatDate = (date) => date.toLocaleDateString("fr-CA");

        const data_send = {
            date_stock: formatDate(date_stock),
            value_stock: value_stock,
            produit_id: id
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
            if (result.stock_histo) {
                setStock_histo(result.stock_histo);
            }
            if (result.item) {
                setStock(result.item.stock);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            console.log("finally");

        }
    }

    const handleClick3 = async () => {
        console.log('s');


        const url_refresh = `${host}/produits/${id}`

        try {
            const response = await fetch(url_refresh,
                {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            if (result.stock_histo) {
                setStock_histo(result.stock_histo);
            }
            if (result.item) {
                setStock(result.item.stock);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
        }
    }

    return (
        <div className="p-4 pt-6 flex flex-col gap-4">
            <div className="flex w-full">

                <div className="flex flex-col">

                    <div className="pl-2 pb-6 text-neutral-700 font-[i-m] text-2xl">{item && item.nom}</div>

                    <div className="flex gap-16">
                        <div className="p-2 flex flex-col w-[600px]">

                            <div className="flex items-center">
                                <div className="pt-2 flex-1/3">
                                    <Label>nom</Label>
                                </div>
                                <div className="pt-2 flex-2/3">
                                    <Input value={nom} onChange={(e) => setNom(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="pt-2 flex-1/3">
                                    <Label>description</Label>
                                </div>
                                <div className="pt-2 flex-2/3">
                                    <TextArea name="sda" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="pt-2 flex-1/3">
                                    <Label>Categorie</Label>
                                </div>
                                <div className="pt-2 flex-2/3">
                                    <Select
                                        options={item_categories}
                                        value={item_categories.find(cat => cat.value == categorieId)}
                                        onChange={(selectedOption) => {
                                            setCategorie(selectedOption.label);
                                            setCategorieId(selectedOption.value);
                                        }} />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="pt-2 flex-1/3">
                                    <Label>prix</Label>
                                </div>
                                <div className="pt-2 flex-2/3">
                                    <Input value={prix} onChange={(e) => setPrix(e.target.value)} />
                                </div>
                            </div>

                            <div className="pt-5">
                                <div className="flex flex-row-reverse">
                                    <Button onClick={() => handleClick()}>Submit</Button>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <div className="flex justify-between pl-8 pb-10 text-neutral-700 font-[i-m] text-2xl">
                        <div className="p-0">
                            Stock: {stock && stock} kg
                        </div>
                        <button className="p-0 cursor-pointer" onClick={handleClick3}>
                            <img src="/assets/svg/reset.svg" alt="" />
                        </button>
                    </div>

                    <div className="pl-2 flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                width={500}
                                height={400}
                                data={stock_histo}
                                margin={{ right: 30 }}
                            >
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.02} />
                                    </linearGradient>
                                </defs>

                                <YAxis />
                                <XAxis dataKey="date" width={1} />
                                <CartesianGrid strokeDasharray="2 2" vertical={false} />

                                <Tooltip content={<CustomTooltip />} />
                                {/* <Legend iconSize={24} /> */}

                                <Area
                                    type="monotone"
                                    dataKey="stock"
                                    stroke="#8884d8"
                                    fill="url(#colorUv)"
                                    fillOpacity={1}
                                    stackId="1"
                                />

                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">

                <div className="pt-4 pb-4 text-[24px]">modifier stock</div>
                <div className="w-[400px] flex flex-col gap-4">
                    <DatePick
                        selected={date_stock}
                        onChange={(date) => setDate_stock(date)}
                    />
                    <Input placeholder="value" value={value_stock} onChange={(e) => setValue_stock(e.target.value)} />

                    <Button onClick={() => handleClick2()}>Submit</Button>
                </div>

            </div>

        </div>
    )
}

export default Products;