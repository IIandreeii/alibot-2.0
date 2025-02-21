import { useEffect, useState } from 'react';
import { useAxios } from '../hooks/use-axios';
import { useSearchParams } from 'react-router-dom';
type LoaderState = {
  loading: boolean;
  action: 'get' | 'post' | 'put' | 'putDisabled' | null;
};

export const useTemplate = () => {
  const { execute } = useAxios<any>();
  
  const [getResponse, setGetResponse] = useState<any>([]);
  const [getContactNew, setContactNew] = useState<any>(null);
  const [loader, setLoader] = useState<LoaderState>({ loading: false, action: null });
  const [searchParams] = useSearchParams();

  const getTemplate = async (id: any) => {
    setLoader({ loading: true, action: 'get' });
    const method = 'GET';
    const url = `/template/list/${id}`;

    try {
      const data = await execute({ method, url });
      console.log('Datos obtenidos en getTemplate:', data);
      setGetResponse(data);
    } catch (error) {
      console.error('Error obteniendo los datos:', error);
    } finally {
    }
  };

  const postTemplate = async (data: any) => {
    setLoader({ loading: true, action: 'post' });

    const method = 'POST';
    const url = '/template/create';

    try {
      const response = await execute({ method, url, data });
      await getTemplate(data?.id); 
      setLoader({ loading: false, action: 'post' });

    } catch (error) {
      console.error('Error creando el número de teléfono:', error);
      setLoader({ loading: false, action: 'post' });
    } finally {
    }
  };

  const postDuplicateTemplate = async (data: any) => {
    setLoader({ loading: true, action: 'post' });

    const method = 'POST';
    const url = '/template/create';
    try {
      const response = await execute({ method, url, data });
      await getTemplate(data?.id); 
      setLoader({ loading: false, action: 'post' });

    } catch (error) {
      console.error('Error creando el número de teléfono:', error);
      setLoader({ loading: false, action: 'post' });
    } finally {
    }
  };

  const patchTemplate = async (data: any,  id: any) => {
    const method = 'PATCH';
    const url = `/template/update/${id}`;

    try {
      const response = await execute({ method, url, data });
      await getTemplate(id); 
    } catch (error) {
      console.error('Error creando el número de teléfono:', error);
    } finally {
    }
  };

  const putDeleteTemplate = async (id: any) => {
    const method = 'PATCH';
    const url = `/template/delete/${id}`;
    const data ={
      "isActive" : false
  }

    try {
      await execute({ method, url, data });
      await getTemplate(id); 
    } catch (error) {
      console.error('Error actualizando el número de teléfono:', error);
    } finally {
    }
  };

  const postRespuesta = async (data: any) => {
    setLoader({ loading: true, action: 'post' });

    const method = 'POST';
    const url = '/quick-response/create';

    try {
      const response = await execute({ method, url, data });
      await getTemplate(data?.id); 
      setLoader({ loading: false, action: 'post' });

    } catch (error) {
      console.error('Error creando el número de teléfono:', error);
      setLoader({ loading: false, action: 'post' });
    } finally {
    }
  };

  const postDuplicateRespuesta = async (data: any) => {
    setLoader({ loading: true, action: 'post' });

    const method = 'POST';
    const url = '/quick-response/create';

    try {
      const response = await execute({ method, url, data });
      await getTemplate(data?.id); 
      setLoader({ loading: false, action: 'post' });

    } catch (error) {
      console.error('Error creando el número de teléfono:', error);
      setLoader({ loading: false, action: 'post' });
    } finally {
    }
  };

  const patchRespuesta = async (data: any,  id: any) => {
    const method = 'PATCH';
    const url = `/quick-response/update/${id}`;

    try {
      const response = await execute({ method, url, data });
      await getTemplate(id); 
    } catch (error) {
      console.error('Error creando el número de teléfono:', error);
    } finally {
    }
  };

  const putDeleteRespuesta = async (id: any) => {
    const method = 'PATCH';
    const url = `/quick-response/delete/${id}`;
    const data ={
      "isActive" : false
  }

    try {
      await execute({ method, url, data });
      await getRespuestaRapida(searchParams.get('acc')); 
    } catch (error) {
      console.error('Error actualizando el número de teléfono:', error);
    } finally {
    }
  };

  const postStore = async (data: any) => {
    setLoader({ loading: true, action: 'post' });

    const method = 'POST';
    const url = '/store/create';

    try {
      await execute({ method, url, data });
      await getStore(searchParams.get('acc')); 
      setLoader({ loading: false, action: 'post' });

    } catch (error) {
      console.error('Error creando el número de teléfono:', error);
      setLoader({ loading: false, action: 'post' });
    } finally {
    }
  };

  const postDuplicateStore = async (data: any) => {
    setLoader({ loading: true, action: 'post' });

    const method = 'POST';
    const url = '/store/create';

    try {
      const response = await execute({ method, url, data });
      await getTemplate(data?.id); 
      setLoader({ loading: false, action: 'post' });

    } catch (error) {
      console.error('Error creando el número de teléfono:', error);
      setLoader({ loading: false, action: 'post' });
    } finally {
    }
  };

  const patchStore= async (data: any,  id: any) => {
    const method = 'PATCH';
    const url = `/store/update/${id}`;

    try {
      await execute({ method, url, data });
      await getTemplate(searchParams.get('acc')); 
    } catch (error) {
      console.error('Error creando el número de teléfono:', error);
    } finally {
    }
  };

  const putDeleteStore = async (id: any) => {
    const method = 'PATCH';
    const url = `/store/delete/${id}`;
    const data ={
      "isActive" : false
  }

    try {
      await execute({ method, url, data });
      await getTemplate(searchParams.get('acc')); 
    } catch (error) {
      console.error('Error actualizando el número de teléfono:', error);
    } finally {
    }
  };

  const getRespuestaRapida = async (id: any) => {
    setLoader({ loading: true, action: 'get' });
    const method = 'GET';
    const url = `/quick-response/list/${id}`;

    try {
      const data = await execute({ method, url });
      console.log('Datos obtenidos en getTemplate:', data);
      setGetResponse(data);
    } catch (error) {
      console.error('Error obteniendo los datos:', error);
    } finally {
    }
  };

  const getRespuestaRapidaByPhoneNumber = async (id: any) => {
    setLoader({ loading: true, action: 'get' });
    const method = 'GET';
    const url = `/quick-response/pni/list/${id}`;

    try {
      const data = await execute({ method, url });
      console.log('Datos obtenidos en getTemplate:', data);
      setGetResponse(data);
    } catch (error) {
      console.error('Error obteniendo los datos:', error);
    } finally {
    }
  };

  const getTemplateByPni = async (id: any) => {
    setLoader({ loading: true, action: 'get' });
    const method = 'GET';
    const url = `/template/pni/list/${id}`;

    try {
      const data = await execute({ method, url });
      console.log('Datos obtenidos en getTemplate:', data);
      setGetResponse(data);
    } catch (error) {
      console.error('Error obteniendo los datos:', error);
    } finally {
    }
  };

  const getStore = async (id: any) => {
    setLoader({ loading: true, action: 'get' });
    const method = 'GET';
    const url = `/store/list/${id}`;

    try {
      const data = await execute({ method, url });
      console.log('Datos obtenidos en getTemplate:', data);
      setGetResponse(data);
    } catch (error) {
      console.error('Error obteniendo los datos:', error);
    } finally {
    }
  };

  const getProducts = async (id: any) => {
    setLoader({ loading: true, action: 'get' });
    const method = 'GET';
    const url = `/product/list/${id}`;

    try {
      const data = await execute({ method, url });
      console.log('Datos obtenidos en getTemplate:', data);
      setGetResponse(data);
    } catch (error) {
      console.error('Error obteniendo los datos:', error);
    } finally {
    }
  };

  const getProductsToPni = async (id: any) => {
    setLoader({ loading: true, action: 'get' });
    const method = 'GET';
    const url = `/product/pni/list/${id}`;

    try {
      const data = await execute({ method, url });
      console.log('Datos obtenidos en getTemplate:', data);
      setGetResponse(data);
    } catch (error) {
      console.error('Error obteniendo los datos:', error);
    } finally {
    }
  };

  const postProduct = async (data: any) => {
    setLoader({ loading: true, action: 'post' });

    const method = 'POST';
    const url = '/product/create';

    try {
      await execute({ method, url, data });
      await getProductsToPni(data?.id); 
      setLoader({ loading: false, action: 'post' });

    } catch (error) {
      console.error('Error creando el número de teléfono:', error);
      setLoader({ loading: false, action: 'post' });
    } finally {
    }
  };

  const postDuplicateProduct = async (data: any) => {
    setLoader({ loading: true, action: 'post' });

    const method = 'POST';
    const url = '/product/create';

    try {
      const response = await execute({ method, url, data });
      await getProductsToPni(data?.id); 
      setLoader({ loading: false, action: 'post' });

    } catch (error) {
      console.error('Error creando el número de teléfono:', error);
      setLoader({ loading: false, action: 'post' });
    } finally {
    }
  };

  const patchProduct= async (data: any,  id: any) => {
    const method = 'PATCH';
    const url = `/product/update/${id}`;

    try {
      await execute({ method, url, data });
      await getTemplate(id); 
    } catch (error) {
      console.error('Error creando el número de teléfono:', error);
    } finally {
    }
  };

  const putDeleteProduct = async (id: any) => {
    const method = 'PATCH';
    const url = `/product/delete/${id}`;
    const data ={
      "isActive" : false
  }

    try {
      await execute({ method, url, data });
      await getProductsToPni(id); 
    } catch (error) {
      console.error('Error actualizando el número de teléfono:', error);
    } finally {
    }
  };

  const postNewContact = async (data: any) => {
    setLoader({ loading: true, action: 'post' });

    const method = 'POST';
    const url = '/chat/create';

    try {
      const contactNew = await execute({ method, url, data });
      setLoader({ loading: false, action: 'post' });
      setContactNew(contactNew)
    } catch (error) {
      console.error('Error creando el nuevo contacto:', error);
      setLoader({ loading: false, action: 'post' });
    } finally {
    }
  };

  return {
    getTemplate,
    postTemplate,
    getRespuestaRapida,
    getStore,
    getRespuestaRapidaByPhoneNumber,
    getTemplateByPni,

    postDuplicateTemplate,
    postDuplicateRespuesta,
    postDuplicateStore,
    postDuplicateProduct,

    patchTemplate,
    putDeleteTemplate,
    postRespuesta,
    patchRespuesta,
    putDeleteRespuesta,

    getProducts,
    postProduct,
    patchProduct,
    putDeleteProduct,
    getProductsToPni,

    postStore,
    patchStore,
    putDeleteStore,
    
    postNewContact,

    loader, 
    getResponse, 
    getContactNew
  };
};
