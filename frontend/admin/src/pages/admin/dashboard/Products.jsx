import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../../../client/src/hooks/useFetch";
import { host } from "../../../../../client/src/config";
import { useEffect, useState } from "react";
import Filtre_keywords from "../../../../../client/src/components/filtre/FIltre_keywords";
import Filtre_prix from "../../../../../client/src/components/filtre/FIltre_prix";
import Filtre_saisons from "../../../../../client/src/components/filtre/FIltre_saisons";
import Filtre_categories from "../../../../../client/src/components/filtre/FIltre_categories";
import { Table, Thead, Tbody, Th, Tr, Trh, Td } from "../../../../../client/src/components/Balise";

const Products = () => {
    const navigate = useNavigate();
    const { data: products, loading: loading_products, error: error_products } = useFetch(`${host}/produits`);

    const [items, setItems] = useState([]);
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

    const handleReset = () => {
        if (products.items) {
            setItems(products.items);
        }
    }

    return (
        <div className="flex flex-col xl:flex-row p-2 xl:p-6 gap-12 h-full max-h-full overflow-auto relative">

            <div className="h-fit flex flex-col gap-4 w-full xl:w-72 pt-4 border-neutral-300 border-t-[1px]">
                <div className="flex flex-col w-full gap-4">
                    <Filtre_keywords setItems={setItems} handleReset={handleReset} />
                </div>

                <div className="flex flex-col w-full gap-2 px-0 z-30">
                    <Filtre_categories setItems={setItems} handleReset={handleReset} />
                </div>

                <div className="flex flex-col w-full gap-2 px-0 z-20">
                    <Filtre_saisons setItems={setItems} handleReset={handleReset} />
                </div>

                <div className="flex flex-col w-full gap-0 px-0 z-10">
                    <Filtre_prix setItems={setItems} handleReset={handleReset} />
                </div>

            </div>

            <div className="flex-1 flex justify-center h-fit">
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