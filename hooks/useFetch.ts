import { useState, useEffect } from 'react';

interface Params {
  [key: string]: string;
}

interface FetchData {
  data: any;
  loading: boolean;
  error: Error | null;
}

function useFetch(baseUrl: string, params?: Params): FetchData {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL(baseUrl);
        if (params) {
          Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key]),
          );
        }
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error as any);
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [baseUrl, params]);

  return { data, loading, error };
}

export default useFetch;
