import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { host } from "../config";
import { Table, Thead, Tbody, Trh, Tr, Th, Td, Input, Label } from "../components/Balise";
import { useEffect, useState } from "react";

const Products = () => {
    const navigate = useNavigate();
    const { data: factures, loading: loading_products, error: error_products } = useFetch(`${host}/factures`);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (factures.items) {
            setItems(factures.items);
        }
        console.log(factures);

    }, [factures]);

    const handleClick = (id) => {
        navigate(`/factures/${id}`)
    }

    return (
        <div className="flex flex-col items-center p-8 gap-12">

            <div className="w-[1100px]">
                <div className="text-xl pb-4">Factures</div>

                <div className="flex-1 w-full flex justify-center items-center">
                    <Table>
                        <Thead>
                            <Trh>
                                <Th>date</Th>
                                <Th>nom client</Th>
                                <Th>etat</Th>
                                <Th>total</Th>
                            </Trh>
                        </Thead>
                        <Tbody>
                            {items.map((item, i) => (

                                <Tr key={i} onClick={() => { handleClick(item.id) }}>
                                    <Td>{item.date_facture}</Td>
                                    <Td>{item.nom_client}</Td>
                                    <Td>{item.statut_facture}</Td>
                                    <Td>{item.total_commande}</Td>
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