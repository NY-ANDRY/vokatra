import { useState, useEffect } from "react";

export function useFetch(url, body) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(url,
                    {
                        signal: controller.signal,
                        body: body,
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [url]);

    return { data, loading, error };
}
