import { useSearchParams } from "react-router-dom";

export function useQueryParam(key) {
  const [searchParams, setSearchParams] = useSearchParams();

  const setQueryParam = (value) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return [searchParams.get(key), setQueryParam];
}
