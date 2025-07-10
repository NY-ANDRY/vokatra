import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { host } from "../config";
import { Table, Thead, Tbody, Trh, Tr, Th, Td, Button, Input, TextArea, Label, DatePick, Button_red } from "../components/Balise";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Products = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, loading, error } = useFetch(`${host}/factures/${id}`);
    const [items, setItem] = useState([]);
    const [packs, setPacks] = useState([]);

    useEffect(() => {
        if (data.items) {
            setItem(data.items);
        }
        if (data.packs) {
            setPacks(data.packs);
        }
    }, [data]);


    const exportPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Facture VOKATRA", 14, 22);

        doc.setFontSize(12);
        doc.text(`Client : ${data?.facture?.nom_client || ""}`, 14, 32);
        doc.text(`Facture N° : ${data?.facture?.id || ""}`, 14, 40);

        const produitHeaders = [["Produit", "Prix (Ar)", "Quantité (kg)", "Total (Ar)"]];
        const produitRows = items.map(item => [
            item.produit_nom,
            item.produit_prix.toString(),
            item.quantite.toString(),
            item.total.toString(),
        ]);

        autoTable(doc, {
            startY: 50,
            head: produitHeaders,
            body: produitRows,
            styles: { fontSize: 12 },
            headStyles: { fillColor: [22, 160, 133] },
            margin: { left: 14, right: 14 },
        });

        let finalY = doc.lastAutoTable.finalY || 50;

        if (packs.length > 0) {
            const packHeaders = [["Pack", "Prix (Ar)", "Quantité (kg)", "Total (Ar)"]];
            const packRows = packs.map(pack => [
                pack.pack_nom,
                pack.pack_prix.toString(),
                pack.quantite.toString(),
                pack.total.toString(),
            ]);

            autoTable(doc, {
                startY: finalY + 10,
                head: packHeaders,
                body: packRows,
                styles: { fontSize: 12 },
                headStyles: { fillColor: [52, 152, 219] },
                margin: { left: 14, right: 14 },
            });

            finalY = doc.lastAutoTable.finalY || finalY + 10;
        }

        doc.setFontSize(14);
        doc.text(`Total payé : ${data?.facture?.montant_total || ""} Ar`, 14, finalY + 10);
        doc.text(`État : ${data?.facture?.statut_facture || ""}`, 14, finalY + 20);

        doc.setFontSize(12);
        doc.text(`Livraison : ${data?.facture?.date_livraison || ""}`, 14, finalY + 30);
        doc.text(`Lieu : ${data?.facture?.lieu_nom || ""}`, 14, finalY + 38);

        doc.save(`facture_${data?.facture?.id || "export"}.pdf`);
    };




    return (
        <div className="flex w-full justify-center max-h-full overflow-auto p-4 gap-20">
            <div className="w-[900px]">

                <div className="pt-2 pb-4 text-xl flex justify-between">
                    <div className="p-0 font-[i-b]">VOKATRA</div>
                    <div className="p-0">client: {data.facture && data.facture.nom_client}</div>
                </div>

                <div className="pt-2 pb-4 text-xl">
                    facture numero: {data.facture && data.facture.id}
                </div>

                <div className="flex-1 flex flex-col justify-center items-center gap-2">
                    {(items && items.length > 0) && (

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

                    )}

                    {(packs && packs.length > 0) && (

                        <Table>
                            <Thead>
                                <Trh>
                                    <Th>pack</Th>
                                    <Th>prix (Ar)</Th>
                                    <Th>quantite (kg)</Th>
                                    <Th>total (Ar)</Th>
                                </Trh>
                            </Thead>
                            <Tbody>

                                {packs.map((item, i) => (

                                    <Tr key={i}>
                                        <Td>{item.pack_nom}</Td>
                                        <Td>{item.pack_prix}</Td>
                                        <Td>{item.quantite}</Td>
                                        <Td>{item.total}</Td>
                                    </Tr>

                                ))}

                            </Tbody>
                        </Table>
                    )}

                </div>

                <div className="flex justify-between pt-3">
                    <div className="p-0">
                        <div className="flex text-xl rounded-sm px-4 py-1 bg-neutral-200">
                            {data.facture && data.facture.statut_facture}
                        </div>
                    </div>
                    <div className="pt-2 text-xl w-[400px] flex flex-col gap-3">
                        <div className="flex justify-between">
                            <div className="p-0">
                                Total
                            </div>
                            <div className="p-0">
                                {data.facture && data.facture.total_commande} Ar
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="p-0">
                                Total payé
                            </div>
                            <div className="p-0">
                                {data.facture && data.facture.montant_total} Ar
                            </div>
                        </div>

                    </div>
                </div>

                {data.facture &&
                    <div className="flex flex-col gap-0 justify-between pt-2 pb-2">
                        <div className="p-2 pb-0 text-xl font-[i-m]">
                            LIVRAISON
                        </div>
                        <div className="flex flex-col gap-1 p-2 pt-3 pb-1">
                            <div className="flex gap-3 relative">
                                <div className="flex items-center text-gray-500 relative top-[2px]">
                                    heure:
                                </div>
                                <div className="flex text-xl text-gray-900">
                                    {data.facture && data.facture.date_livraison}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 p-2 pt-0">
                            <div className="flex gap-3 relative">
                                <div className="flex items-center text-gray-500 relative top-[2px]">
                                    lieux:
                                </div>
                                <div className="flex text-xl text-gray-900">
                                    {data.facture && data.facture.lieu_nom}
                                </div>
                            </div>
                        </div>
                    </div>
                }


                <div className="flex flex-row-reverse text-xl pt-2 h-12">
                    <Button onClick={exportPDF}>exporter en PDF</Button>
                </div>
            </div>
        </div>

    )
}

export default Products;