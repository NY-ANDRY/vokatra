import { useState, useEffect } from "react";
import { Input } from "../Balise";
import { host } from "../../config";

const Filtre_keywords = ({ setItems, handleReset }) => {

    const [keywords, setKeywords] = useState('');

    useEffect(() => {
        if (keywords != '') {
            filterByKeywords(keywords)
        } else {
            handleReset();
        }
    }, [keywords]);

    const filterByKeywords = async (search) => {
        try {
            const response = await fetch(`${host}/produits?keywords=${search}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            if (data.items) {
                setItems(data.items);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const reset = () => {
        setKeywords('');
        handleReset();
    }

    return (
        <>
            <Input onInput={(e) => { setKeywords(e.target.value) }} placeholder="Keywords" />
        </>
    )
}

export default Filtre_keywords;