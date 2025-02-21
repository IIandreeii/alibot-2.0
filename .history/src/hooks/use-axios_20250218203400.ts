import { useState } from 'react';
import axios, { AxiosRequestConfig, Method } from 'axios';
import { environment } from 'environments/environment.prod';
import { useToast } from 'context/ToastContext';

axios.defaults.baseURL = environment.apiUrl;

interface IAxiosParams {
  method: Method | string;
  url: string;
  data?: unknown;
  params?: unknown;
  token?: string;
  baseUrl?: string;
}

export const useAxios = <T>() => {
  const [response, setResponse] = useState<T | undefined>(undefined);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showError } = useToast();

  const execute = async (axiosParams: IAxiosParams): Promise<T | undefined> => {
    const axiosRequestConfig: AxiosRequestConfig = {
      method: axiosParams.method,
      url: axiosParams.url,
      params: axiosParams.params,
      data: axiosParams.data,
    };
  
    if (axiosParams.baseUrl) {
      axiosRequestConfig.baseURL = axiosParams.baseUrl;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const responseFetch = await axios.request(axiosRequestConfig);
      
      if (responseFetch.status === 200 || responseFetch.status === 201) {
        setResponse(responseFetch.data);
        return responseFetch.data; 
      } else {
        showError(responseFetch.data.message);
        return undefined; 
      }
    } catch (error: any) {
      if (error.response) {
        showError(error.response.data.message.message || error.response.data.message);
        setResponse(error.response.data);
        return error.response.data;
      }
      
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  

  return {
    execute,
    response,
    error,
    loading,
  };
};
