import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { host } from "../config";
import { Table, Thead, Tbody, Trh, Tr, Th, Td, Button, Input, TextArea, Label, DatePick, Button_red } from "../components/Balise";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, loading, error } = useFetch(`${host}/paniers`);
    const [items, setItem] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {

    }, []);

    useEffect(() => {
        if (data.items) {
            setItem(data.items);
        }
        if (data.total) {
            setTotal(data.total);
        }
    }, [data]);

    const handleDelete = async (id, product_id) => {
        console.log("ok");

        const url_stock = `${host}/paniers_products`;

        const data_send = {
            id: id
        };

        try {
            const response = await fetch(url_stock,
                {
                    method: "DELETE",
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
            if (result.ok && result.items) {
                setItem(result.items);
                setTotal(result.total);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            console.log("finally");

        }
    }

    const handleReset = async (id, product_id) => {
        handleDelete(id, product_id);
        navigate(`/products/${product_id}`);
    }

    const handleClick = async () => {
        console.log("ok");

        const url_stock = `${host}/commandes`;

        const data_send = {
            // produit_id: id,
            // quantity: quantity
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
            if (result.commande) {
                navigate(`/commandes/${result.commande.id}`);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            console.log("finally");

        }
    }

    return (
        <div className="flex w-full justify-center">
            <div className="w-[1100px]">

                <div className="pt-2 pb-4 text-xl">
                    Panier numero: {data.panier && data.panier.id}
                </div>

                <div className="flex-1 flex justify-center items-center">
                    <Table>
                        <Thead>
                            <Trh>
                                <Th>produit</Th>
                                <Th>prix (Ar)</Th>
                                <Th>quantite (kg)</Th>
                                <Th>total (Ar)</Th>
                                <Th></Th>
                            </Trh>
                        </Thead>
                        <Tbody>
                            {items.map((item, i) => (

                                <Tr key={i} >
                                    <Td>{item.produit_nom}</Td>
                                    <Td>{item.produit_prix}</Td>
                                    <Td>{item.quantite}</Td>
                                    <Td>{item.total}</Td>
                                    <Td>
                                        <div className="flex w-6 xl:w-auto flex-col xl:flex-row items-center gap-2">
                                            <div onClick={() => handleDelete(item.id, item.produit_id)} className="flex items-center justify-center hover:bg-neutral-400 active:bg-neutral-600 rounded-sm">
                                                <img src="/assets/svg/delete.svg" alt="" />
                                            </div>
                                            <div onClick={() => handleReset(item.id, item.produit_id)} className="flex items-center justify-center hover:bg-neutral-400 active:bg-neutral-600 rounded-sm">
                                                <img src="/assets/svg/reset.svg" alt="" />
                                            </div>
                                        </div>
                                    </Td>
                                </Tr>

                            ))}

                        </Tbody>
                    </Table>
                </div>

                <div className="flex justify-between pt-2">
                    <div className="p-2"></div>
                    <div className="p-2 font-[i-m] text-xl">Total: {total}</div>
                </div>

                <div className="flex justify-between pt-1">
                    <div className="p-2 font-[i-m] text-xl">
                        <Button_red>EFFACER</Button_red>
                    </div>
                    <div className="p-2 font-[i-m] text-xl">
                        <Button onClick={() => handleClick()}>VALIDER</Button>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Products;