import {useEffect, useState} from "react";

const useFetch = <T>(fetchFunction: ()=> Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetchFunction();

            setData(response);

        } catch (error) {
            setError(error instanceof Error ? error : new Error('An unknown error occurred'));
        } finally {
            setIsLoading(false);
        }
    }

    const reset = () => {
        setData(null)
        setIsLoading(false);
        setError(null);
    }

    useEffect(() => {
        if(autoFetch) {
            fetchData();
        }
    }, []);

    return  { data, isLoading, error, refetch: fetchData, reset };
}

export default useFetch;