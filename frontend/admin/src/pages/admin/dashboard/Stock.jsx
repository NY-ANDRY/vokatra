import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { host } from "../../../config";
import { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar
} from 'recharts';


const Products = () => {
    const navigate = useNavigate();
    const { data: products, loading: loading_products, error: error_products } = useFetch(`${host}/dashboard/stock`);
    const [items, setItems] = useState([]);
    const [asc, setAsc] = useState(false);
    const [nb, setNb] = useState(10);

    useEffect(() => {
        if (products.items) {
            setItems(products.items);
        }
    }, [products]);

    const handleClick = (e) => {
        if (items[e.activeIndex]) {
            navigate(`/products/${items[e.activeIndex].id}`);
        }
    }

    const fetchNew = async (asc) => {
        try {
            const response = await fetch(`${host}/dashboard/stock?order=${asc}&count=${nb}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const result = await response.json();
            if (result.items) {
                setItems(result.items);
            }

        } catch (err) {
            setIsError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (asc) {
            fetchNew('asc');
        } else {
            fetchNew('desc');
        }
    }, [asc, nb]);

    return (
        <div className="flex flex-col p-8 pt-2 gap-4">

            <div className="p-4 text-xl">Stock</div>

            <div className="flex flex-row-reverse pr-8">
                <div className="p-0"></div>
                <div className="flex gap-2">
                    <input type="number" value={nb} onInput={(e) => { if (!isNaN(e.target.value)) setNb(e.target.value); }} className="w-16 text-end text-neutral-700" />
                    <div className="flex p-1 rounded-sm cursor-pointer hover:bg-neutral-200" onClick={() => setAsc(!asc)}>
                        <img src="/assets/svg/swap.svg" alt="" />
                    </div>
                </div>
            </div>

            <div className="flex-1 flex justify-center items-center">
                <div className="w-full h-96 flex flex-col gap-4 pr-8"  >
                    <ResponsiveContainer width="100%" height="100%" >
                        <BarChart width={730} height={250} data={items} onClick={handleClick}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="nom" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar className="cursor-pointer" dataKey="stock" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    )
}

export default Products;