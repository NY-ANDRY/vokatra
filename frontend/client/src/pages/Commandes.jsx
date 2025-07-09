import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { host } from "../config";
import { Table, Thead, Tbody, Trh, Tr, Th, Td, Input, Label } from "../components/Balise";
import { useEffect, useState } from "react";

const Products = () => {
    const navigate = useNavigate();
    const { data: commandes, loading: loading_products, error: error_products } = useFetch(`${host}/commandes`);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (commandes.items) {
            setItems(commandes.items);
        }
        console.log(commandes);

    }, [commandes]);

    const handleClick = (id) => {
        navigate(`/commandes/${id}`)
    }

    return (
        <div className="flex flex-col items-center max-h-full overflow-auto  p-8 gap-12">
            <div className="w-[1100px]">
                <div className="text-xl pb-4">Commandes</div>

                <div className="flex-1 w-full flex justify-center items-center">
                    <Table>
                        <Thead>
                            <Trh>
                                <Th>date</Th>
                                <Th>etat</Th>
                                <Th>total (Ar)</Th>
                            </Trh>
                        </Thead>
                        <Tbody>
                            {items.map((item, i) => (

                                <Tr key={i} onClick={() => { handleClick(item.id) }}>
                                    <Td>{item.date_commande}</Td>
                                    <Td>{item.statut_nom}</Td>
                                    <Td>{item.total}</Td>
                                </Tr>

                            ))}

                        </Tbody>
                    </Table>
                </div>

            </div>
        </div>
    )
}

export default Products;