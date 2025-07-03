import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Tr, Trh, Thead, Tbody, Th, Td, Table } from "../Balise";
import Popup from "../alert/Popup";

const TableSort = ({ title, data, loading, error, idKey, columns, to }) => {
    const navigate = useNavigate();
    // const { setNavLocation } = useNav();
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [showPopup, setShowPopup] = useState(false);
    const [idCp, setIdCp] = useState("");

    const timerRef = useRef(null);

    const handleClick = (id) => {
        setIdCp(id)
        setShowPopup(false);
        if (to) {
            // setNavLocation(to);
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

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                if (prev.direction === "asc") return { key, direction: "desc" };
                if (prev.direction === "desc") return { key: null, direction: null };
            }
            return { key, direction: "asc" };
        });
    };
    const isNumeric = (str) => {
        try {
            return !isNaN(str) && str.trim() !== ""
        } catch (error) {
            return false;
        }
    }

    const sortedData = () => {
        if (!sortConfig.key) return data;

        return [...data].sort((a, b) => {
            let left = a[sortConfig.key];
            let right = b[sortConfig.key];

            if (isNumeric(left) && isNumeric(right)) {
                left = Number(left);
                right = Number(right);
            }

            if (left < right) return sortConfig.direction === "asc" ? -1 : 1;
            if (left > right) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    };

    return (
        <>
            <Table>
                <Thead>
                    <Trh>
                        {columns.map((col, index) => (
                            <Th key={index} onClick={() => handleSort(col.key)}>
                                {col.label}
                                {sortConfig.key === col.key && (sortConfig.direction === "asc" ? "(asc)" : "(desc)")}
                            </Th>
                        ))}
                    </Trh>
                </Thead>
                <Tbody>
                    {loading && <Tr><Td colSpan={columns.length} className="text-center">Chargement...</Td></Tr>}
                    {error && <Tr><Td colSpan={columns.length} className="text-center">Erreur</Td></Tr>}
                    {sortedData().map((item, i) => (
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
            {!to && <Popup show={showPopup}>"{idCp}" Copié</Popup>}
        </>
    );
};

export default TableSort;
