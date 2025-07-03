import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useNav } from "../../contexts/NavContext";
import { Tr, Trh, Thead, Tbody, Th, Td, Table } from "../Balise";
import Popup from "../alert/Popup";

const TableStatic = ({ title, data, loading, error, idKey, columns, to }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const { setNavLocation } = useNav();
    const [idCp, setIdCp] = useState("");

    const timerRef = useRef(null);

    const handleClick = (id) => {
        setIdCp(id)
        setShowPopup(false);
        if (to) {
            setNavLocation(to);
            navigate(to + id);
        } else {
            navigator.clipboard.writeText(id);
            setShowPopup(true);
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                setShowPopup(false);
            }, 2000);
        }
    };

    return (
        <>
            <div className="relative">
                <Table>
                    <Thead onClick={() => setIsOpen(!isOpen)}>
                        <Trh>
                            {columns.map((col, index) => (
                                <Th key={index}>{col.label}</Th>
                            ))}
                        </Trh>
                    </Thead>
                    <Tbody>
                        {loading && <Tr><Td colSpan={columns.length} className="text-center">Chargement...</Td></Tr>}
                        {error && <Tr><Td colSpan={columns.length} className="text-center">Erreur</Td></Tr>}
                        {isOpen && data?.map((item, i) => (
                            <Tr key={i} onClick={() => handleClick(item[idKey])}>
                                {columns.map((col, index) => (
                                    <Td key={index}>
                                        {col.format ? col.format(item[col.key]) : item[col.key]}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </div>
            {!to && <Popup show={showPopup}>"{idCp}" Copié</Popup>}
        </>
    );
};

export default TableStatic;
