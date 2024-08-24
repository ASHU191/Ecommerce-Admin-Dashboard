import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async ({ url, signal }) => {
    setLoading(true);
    setError(false);
    setData(null);

    try {
      const res = await fetch(url, { signal });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      setData(data);
      setError(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    const controler = new AbortController();
    const signal = controler.signal;

    fetchData({ url, signal });

    return () => {
      controler.abort();
    };
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
