import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { host } from "../../../config";
import { Table, Thead, Tbody, Trh, Tr, Th, Td, Input, Label } from "../../../components/Balise";
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

            <div className="flex-1 flex justify-center items-center">
                <Table>
                    <Thead>
                        <Trh>
                            <Th>nom</Th>
                            <Th>description</Th>
                            <Th>prix (Ar)</Th>
                            <Th>stock (Kg)</Th>
                        </Trh>
                    </Thead>
                    <Tbody>
                        {items.map((item, i) => (

                            <Tr key={i} onClick={() => { handleClick(item.id) }}>
                                <Td>{item.nom}</Td>
                                <Td>{item.description}</Td>
                                <Td>{item.prix}</Td>
                                <Td>{item.stock}</Td>
                            </Tr>

                        ))}

                    </Tbody>
                </Table>
            </div>

        </div>
    )
}

export default Products;