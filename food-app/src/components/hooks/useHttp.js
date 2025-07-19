import { useEffect, useState } from "react";
import { useCallback } from "react";

async function sentHttpRequest( url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();
    if (!response.ok) {
        throw new Error(
            resData.message || 'Something went wrong!'
        );
    }

    return resData;
}


export default function useHttp(url, config, intialData) {
    const [data, setData] = useState(intialData);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const sendRequest = useCallback(
      async function sendRequest(url, config) {
        setIsLoading(true);
        try {
            const resData = await sentHttpRequest(url, config);
            setData(resData);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, [url, config]);

    useEffect(() => {
        if(config && (config.method === 'GET' || !config.method) || !config )  {
          sendRequest(url, config);
        } 
    }, [sendRequest, config]);

    return {
        data,
        error,
        isLoading,
        sendRequest
    };
}