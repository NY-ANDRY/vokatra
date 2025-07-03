import { useFetch } from "../hooks/useFetch";
import { host } from "../config";
import { useEffect } from "react";

const Test = () => {
    const { data, loading, error } = useFetch(`${host}/test`);

    useEffect( () => {
        if (data) {
            console.log(data);
            
        }
    }, [data] );

    return (
        <>
            <p>abc</p>
            <p>{data && data.test}</p>
        </>
    )
}

export default Test;