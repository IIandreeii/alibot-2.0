import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { environment } from '../../environments/environment.prod';
import { useToast } from 'context/ToastContext';

axios.defaults.baseURL = environment.apiUrl;

export const useLogin = () => {
  const { login } = useAuth(); // Usamos el método login del contexto
  const [getResponse, setGetResponse] = useState<any>(null);
  const [loader, setLoader] = useState({ loading: false, action: '' });
  const { showError } = useToast();

  const postLogin = async (data: { username: string; password: string }) => {
    const method = 'POST';
    const url = '/auth/authentication';

    setLoader({ loading: true, action: 'post' });

    try {
      const response = await axios.request({
        method,
        url,
        data,
      });
      console.log("Response data in postLogin:", response.data); // Log para verificar

      // Asegúrate de que aquí manejas la respuesta correctamente
      if (response.data && response.data.token) {
        login(response.data.token, response.data.account.id);
        setGetResponse(response.data);
      } else {
        console.error('Token no encontrado en la respuesta:', response.data);
        setGetResponse(response.data); // Esto podría ser undefined si no hay token
      }
    } catch (error: any) {
      showError(error.response.data.message);
      console.error('Error durante la autenticación:', error.response.data.message);

      return error;
    } finally {
      setLoader({ loading: false, action: '' });
    }
  };

  return {
    postLogin,
    loader,
    getResponse,
  };
};
