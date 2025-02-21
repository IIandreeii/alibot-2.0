import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';

import { useTemplate } from '../../../../../../../services/template/template.service';
import { useSearchParams } from 'react-router-dom';

import { useChatContext } from '../../../../../../../pages/chat/context/chat';
import Cookies from 'js-cookie';

interface FormData {
  name: string;
  code: string;
  userAlibot: string;
  storeDomain: string;
}

const FormContainer = styled.form`
  width: 520px;
  max-width: 520px;
  margin: 5px auto;
  padding: 0 30px;
  margin-bottom: 40px;
  border-radius: 10px;
  background-color: #fff;
  display: grid;
  grid-template-columns: 1fr; /* Cambiado a una sola columna */
  gap: 15px;
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
  h4 {
    grid-column: span 1; /* Cambiado a una sola columna */
    font-size: 22px;
    color: #2c303c;
    font-weight: 600;
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
    span {
      color: #7c8c9c;
    }
  }
  > div {
    grid-column: span 1; /* Cambiado a una sola columna */
    @media (max-width: 768px) {
      grid-column: span 1 !important; /* Cambiado a una sola columna */
    }
  }
`;

const InputContainer = styled.div`
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;

  &:focus {
    border-color: #007BFF;
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;

const SubmitButton = styled.button`
  background-color: #2D2E83;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #3C58A4;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

interface Props {
  closeModal: () => void;
  setLoaderService: (data: boolean) => void;
  dataEdit: any;
  id?: string;
  isDeletingUser: boolean;
}

const radioOptions = [
    { label: 'Generic', value: 'generic' },
    { label: 'Agency', value: 'agency' },
    { label: 'Cash on Delivery', value: 'cash_on_delivery' },
];

const FormTienda: React.FC<Props> = ({
  closeModal,
  setLoaderService,
  dataEdit,
  id, 
  isDeletingUser,
}) => {
  const {
    control,
    trigger,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: 'onChange' });

  const [isEditMode, setIsEditMode] = useState(false);
  const toast = useRef<any>(null);
  const { postStore, patchStore } = useTemplate();
  const [searchParams] = useSearchParams();
  const { setShowMessageDialog } = useChatContext();

  useEffect(() => {
    setShowMessageDialog(true)
  }, [])
  
  const confirmCreateUser = (data: FormData) => {
    
    if (isDeletingUser) return;

    confirmPopup({
      className: "toast_custom", 
      appendTo: document.getElementById('submitButton') as HTMLElement,
      message: dataEdit?.action === 'edit' ? '¿Estás seguro de editar la tienda?' : '¿Estás seguro de crear la tienda?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => accept(data),
      reject: closeModal,
    });
  };

  const onSubmit = (data: FormData) => {
    confirmCreateUser(data)
  };

  const accept = async (data: FormData) => {
    setLoaderService(true);
    const storedId = Cookies.get('authId');
    
    try {
      if (dataEdit?.action === 'edit') {
        await patchStore({ ...data }, Number(dataEdit?.data?.id));
      } else {
        await postStore({ ...data, phoneNumberId: Number(searchParams.get('id')), accountUserId: storedId });
      }
      closeModal();
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error', life: 3000 });
    } finally {
      setLoaderService(false);
    }
  };

  useEffect(() => {
    if (dataEdit?.action === 'edit') {
      setIsEditMode(true);
      setValue('name', dataEdit.data.name);
      setValue('code', dataEdit.data.code);
      setValue('userAlibot', dataEdit.data.userAlibot);
      setValue('storeDomain', dataEdit.data.storeDomain);
      trigger();
    }
  }, [searchParams, dataEdit, setValue, trigger]);

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Toast ref={toast} />
      <h4>{isEditMode ? 'Editar tienda' : 'Crear tienda'}</h4>

      <InputContainer>
        <Label htmlFor="name">Nombre de tienda:</Label>
        <Input id="name" {...register('name', { required: 'Este campo es obligatorio' })} />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </InputContainer>

      <InputContainer>
        <Label htmlFor="userAlibot">Usuario Alibot:</Label>
        <Input id="userAlibot" {...register('userAlibot', { required: 'Este campo es obligatorio' })} />
        {errors.userAlibot && <ErrorMessage>{errors.userAlibot.message}</ErrorMessage>}
      </InputContainer>
      
      <InputContainer>
        <Label htmlFor="code">Código de tienda:</Label>
        <Input id="code" {...register('code', { required: 'Este campo es obligatorio' })} />
        {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
      </InputContainer>

      <InputContainer>
        <Label htmlFor="storeDomain">Dominio Tienda Shopify:</Label>
        <Input id="storeDomain" {...register('storeDomain', { required: 'Este campo es obligatorio' })} />
        {errors.storeDomain && <ErrorMessage>{errors.storeDomain.message}</ErrorMessage>}
      </InputContainer>

      <div id="submitButton" style={{ position: 'relative'}}>
        <SubmitButton type="submit" disabled={!isValid}>
          {isEditMode ? 'Guardar' : 'Crear tienda'}
        </SubmitButton>
      </div>

    </FormContainer>
  );
};

export default FormTienda;
