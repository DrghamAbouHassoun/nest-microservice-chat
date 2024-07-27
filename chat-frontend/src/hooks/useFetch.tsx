import { useState, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../app/features/auth.slice';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface ResponseType<T> {
  success: boolean;
  messages: string[];
  data: T;
  status: number;
}

interface IOptions {
  method: "GET" | "POST" | "DELETE" | "PUT";
  headers?: HeadersInit
  body?: string | null;
}

const useFetch = <T,>(url: string, options: IOptions): UseFetchResult<T> => {
  const dispatch = useDispatch();

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // const memoizedOptions = useMemo(() => options, [options]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // try {
        const response = await fetch(url, options);
        if (!response.ok) {
          setData(null);
          setError(response.statusText);
          setLoading(false)
        }
        const body: ResponseType<T> = await response.json();
        if (!body.success) {
          if (body.status === 401) {
            dispatch(logout());
            window.location.reload();
          }
          setData(null);
          setError(body.messages[0] || "Something went wrong")
          setLoading(false)
        }
        setData(body.data);
        setError(null);
        setLoading(false);
      } catch (error) {
        console.log(error);
        dispatch(logout())
        setData(null);
        setError("Something went wrong")
        setLoading(false)
      }

      // } catch (error: any) {
      //   setData(null);
      //   setError(error.message)
      //   setLoading(false)
      // }
    }
    fetchData();
  }, [url])

  return { data, loading, error };
}

export default useFetch