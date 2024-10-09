import { useState, useEffect, useCallback } from 'react';

function useCache(key, fetchFunction, ttl = 60000) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const cachedData = localStorage.getItem(key);
      const cachedTime = localStorage.getItem(`${key}_time`);

      if (cachedData && cachedTime && (Date.now() - Number(cachedTime)) < ttl) {
        setData(JSON.parse(cachedData));
      } else {
        const result = await fetchFunction();
        localStorage.setItem(key, JSON.stringify(result));
        localStorage.setItem(`${key}_time`, Date.now().toString());
        setData(result);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [key, fetchFunction, ttl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}_time`);
    fetchData();
  }, [key, fetchData]);

  return { data, loading, error, refetch };
}

export default useCache;