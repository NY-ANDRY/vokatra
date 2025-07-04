import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { host } from "../config";
import { Table, Thead, Tbody, Trh, Tr, Th, Td, Button, Input, TextArea, Label, DatePick, Button_red } from "../components/Balise";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { usePanier } from "../contexts/PanierContext";

const Commande = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setOpenPanier } = usePanier();

    const { data, loading, error } = useFetch(`${host}/commandes/${id}`);
    const { data: modes_paiement, loading_mode_p, error_mode_p } = useFetch(`${host}/modes_paiements`);
    const { data: lieux, loading_lieux, error_lieux } = useFetch(`${host}/livraisons_lieux`);
    const [items, setItem] = useState([]);
    const [total, setTotal] = useState(0);

    const [lieux_id, setLieux_id] = useState('');
    const [mode_p_id, setMode_p_id] = useState('');
    const [mode_p_label, setMode_p_label] = useState('');
    const [numero, setNumero] = useState('');
    const [nomClient, setNomClient] = useState('');

    useEffect(() => {
        setOpenPanier(false);
    }, []);
    useEffect(() => {
        if (data.items) {
            setItem(data.items);
        }
        if (data.total) {
            setTotal(data.total);
        }
    }, [data]);

    const handleChangeLieux = (option) => {
        // console.log(option);
        setLieux_id(option.value);
    }

    const handleChangeMode_p = (option) => {
        // console.log(option);
        setMode_p_id(option.value);
        setMode_p_label(option.label);
    }

    const handleSubmit = async () => {
        console.log("ok");

        const url_stock = `${host}/factures`;

        const data_send = {
            commande_id: id,
            lieux_id: lieux_id,
            mode_paiement_id: mode_p_id,
            numero: numero,
            nom: nomClient,
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
                navigate(`/factures/${result.facture.id}`);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            console.log("finally");

        }
    }

    return (
        <div className="flex w-full p-4 gap-20 justify-center">
            <div className="w-[900px]">

                <div className="pt-2 pb-4 text-xl">
                    commande numero: {data.commande && data.commande.id}
                </div>

                <div className="flex-1 flex justify-center items-center">
                    <Table>
                        <Thead>
                            <Trh>
                                <Th>produit</Th>
                                <Th>prix (Ar)</Th>
                                <Th>quantite (kg)</Th>
                                <Th>total (Ar)</Th>
                            </Trh>
                        </Thead>
                        <Tbody>

                            {items.map((item, i) => (

                                <Tr key={i}>
                                    <Td>{item.produit_nom}</Td>
                                    <Td>{item.produit_prix}</Td>
                                    <Td>{item.quantite}</Td>
                                    <Td>{item.total}</Td>
                                </Tr>

                            ))}

                        </Tbody>
                    </Table>
                </div>

                <div className="flex justify-between pt-2">
                    <div className="p-2"></div>
                    <div className="p-2 font-[i-m] text-xl">{data.commande && data.commande.statut_nom}</div>
                </div>

            </div>


            {data.commande && data.commande.statut_id != 3 &&

                <div className="flex flex-col pt-2 pb-4 w-[300px] gap-4">
                    <div className="flex flex-row-reverse text-xl">
                        {total} Ar
                    </div>

                    <div className="pt-0">
                        <div className="text-gray-600">
                            nom client
                        </div>
                        <div className="pt-2">
                            <Input placeholder="nom client" onChange={(e) => setNomClient(e.target.value)} />
                        </div>
                    </div>

                    <div className="pt-0">
                        <div className="text-gray-600">
                            mode de paiement
                        </div>
                        <div className="pt-2">
                            <Select options={modes_paiement} onChange={handleChangeMode_p} />
                        </div>
                    </div>

                    {mode_p_label.toLowerCase() == 'mvola' &&

                        <div className="pt-0">
                            <div className="text-gray-600">
                                numero
                            </div>
                            <div className="pt-2">
                                <Input placeholder="numero" onChange={(e) => setNumero(e.target.value)} />
                            </div>
                        </div>

                    }

                    <div className="pt-0">
                        <div className="text-gray-600">
                            lieux livraison
                        </div>
                        <div className="pt-2">
                            <Select options={lieux} onChange={handleChangeLieux} />
                        </div>
                    </div>

                    <div className="flex flex-row-reverse pt-2">
                        <Button onClick={() => handleSubmit()}>VALIDER</Button>
                    </div>
                </div>

            }

        </div>

    )
}

export default Commande;