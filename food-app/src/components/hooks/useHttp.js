import { useEffect, useState, useCallback } from "react";

async function sentHttpRequest(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();
    if (!response.ok) {
        throw new Error(resData.message || 'Something went wrong!');
    }
    return resData;
}

export default function useHttp(url, config, initialData) {
    const [data, setData] = useState(initialData);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // Only accept the body as argument
    const sendRequest = useCallback(
        async function sendRequest(bodyData) {
            setIsLoading(true);
            try {
                const resData = await sentHttpRequest(url, { ...config, body: bodyData });
                setData(resData);
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        },
        [url, config]
    );

    useEffect(() => {
        if (config && (config.method === 'GET' || !config.method) || !config) {
            sendRequest();
        }
        // eslint-disable-next-line
    }, [sendRequest, config]);

    return {
        data,
        error,
        isLoading,
        sendRequest
    };
}