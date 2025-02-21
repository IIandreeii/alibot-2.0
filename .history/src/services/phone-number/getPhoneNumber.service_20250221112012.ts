import { useState } from 'react';
import { useAxios } from '../../hooks/use-axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export interface PhoneNumber {
  accountUserId: number;
  phoneNumberId: string;
  phone: string;
  tokenMeta: string;
  nickname: string;
  isAssistantAi: boolean;
}

type LoaderState = {
  loading: boolean;
  action: 'get' | 'post' | 'put' | 'putDisabled' | null;
};

export const usePhoneNumberWithLoader = () => {
  const { execute } = useAxios<any>();
  const { logout } = useAuth(); // Usamos el método login del contexto
  
  const [getResponse, setGetResponse] = useState<PhoneNumber[]>([]);
  const [postResponse, setPostResponse] = useState<any>(null);
  const [putResponse, setPutResponse] = useState<any>(null);
  const [putDisabledResponse, setPutDisabledResponse] = useState<any>(null);
  const navigate = useNavigate(); 
  
  const [loader, setLoader] = useState<LoaderState>({ loading: false, action: null });

  const getPhoneNumber = async () => {
    const storedId = Cookies.get('authId');
    console.log("ASDSADASDDAS", !storedId);
    
    if (!storedId) {
      logout()
      navigate('/login')
      return ;
    }

    setLoader({ loading: true, action: 'get' });
    const method = 'GET';
    const url = `/phone-number/account/${storedId}`;

    try {
      const data = await execute({ method, url });
      console.log('Datos obtenidos en getPhoneNumber:', data);
      setGetResponse(data);
      return data;
    } catch (error) {
      console.error('Error obteniendo los datos:', error);
    } finally {
    }
  };

  const postPhoneNumber = async (data: PhoneNumber) => {
    const method = 'POST';
    const url = '/phone-number/create';

    try {
      const response = await execute({ method, url, data });
      setPostResponse(response);
      await getPhoneNumber(); 
    } catch (error) {
      console.error('Error creando el número de teléfono:', error);
    } finally {
    }
  };

  const putPhoneNumber = async (data: any, id: any) => {
    const method = 'PATCH';
    const url = `/phone-number/update/${id}`;

    try {
      const response = await execute({ method, url, data });
      setPutResponse(response);
      await getPhoneNumber(); 
    } catch (error) {
      console.error('Error actualizando el número de teléfono:', error);
    } finally {
    }
  };

  const putChangeStatusMessage = async (data: any, nro_telefono: any) => {
    const method = 'PATCH';
    const url = `/webhook/change-status-message/${nro_telefono}`;

    try {
      const response = await execute({ method, url, data });
      setPutResponse(response);
      await getPhoneNumber(); 
    } catch (error) {
      console.error('Error actualizando el número de teléfono:', error);
    } finally {
    }
  };

  const putPhoneDisabled = async (data: any, id: any) => {
    setLoader({ loading: true, action: 'putDisabled' });
    const method = 'PATCH';
    const url = `/phone-number/delete/${id}`;

    try {
      const response = await execute({ method, url, data });
      setPutDisabledResponse(response);
      await getPhoneNumber(); 
    } catch (error) {
      console.error('Error deshabilitando el número de teléfono:', error);
    } finally {
    }
  };
  

  return {
    getPhoneNumber,
    postPhoneNumber,
    putPhoneNumber,
    putPhoneDisabled,
    putChangeStatusMessage,
    setLoader,
    loader, 
    getResponse,
    postResponse,
    putResponse,
    putDisabledResponse,
  };
};
