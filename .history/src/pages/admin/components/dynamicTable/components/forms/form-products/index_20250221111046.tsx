import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { useTemplate } from 'services/template/template.service';
import { useSearchParams } from 'react-router-dom';
import { useChatContext } from '../../../../../../../pages/chat/context/chat';
import ReactQuill from 'react-quill';

interface FormData {
  storeId: number,
  shopifyProductId: string,
  text: string,
  urlImage: string,
  urlVideo: string,
  textVideo: string,
  name: string,
  prompt: string,
  temperature: number
  maxTokens: number
}

const FormContainer = styled.form`
  width: 500px;
  max-width: 500px;
  margin: 5px auto;
  padding: 0 30px;
  margin-bottom: 40px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }

  h4 {
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
`;

const InputContainer = styled.div`
 
`;

const SelectContainer = styled.div`
 
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

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  
  border: 1px solid #ccc;
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

const Textarea = styled.textarea`
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

const ScrollableQuill = styled(ReactQuill)`
   width: 400px; 
  .ql-editor {
    max-height: 50px; 
    overflow-y: auto;
  }
`;

interface Props {
  closeModal: () => void;
  setLoaderService: (data: boolean) => void;
  dataEdit: any;
  id?: string;
  isDeletingUser: boolean;
}
const FormProducts: React.FC<Props> = ({
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
  const [selectedStore, setSelectedStore] = useState<any>(''); 

  const [isEditMode, setIsEditMode] = useState(false);
  const toast = useRef<any>(null);
  const { postProduct, patchProduct, getStore, getResponse, loader } = useTemplate();
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
      message: dataEdit?.action === 'edit' ? '¿Estás seguro de editar la producto?' : '¿Estás seguro de crear la producto?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'SI',
      rejectLabel: 'NO',
      accept: () => accept(data),
      reject: closeModal,
    });
  };

  const onSubmit = (data: FormData) => {
    confirmCreateUser(data)
  };

  useEffect(() => {
    getStore(searchParams.get('id') || 1)
  }, [])

  const accept = async (data: FormData) => {
    setLoaderService(true);
    
    try {
      if (dataEdit?.action === 'edit') {
        await patchProduct({ ...data }, Number(dataEdit?.data?.id));
      } else {
        await postProduct({ ...data, id: Number(id)});
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
      setSelectedStore(`${dataEdit.data.storeId}`);
      setValue('storeId', dataEdit.data.storeId);
      setValue('name', dataEdit.data.name);
      setValue('prompt', dataEdit.data.prompt);
      setValue('temperature', dataEdit.data.temperature);
      setValue('maxTokens', dataEdit.data.maxTokens);
      trigger();
    }
  }, [searchParams, dataEdit, setValue, trigger]);

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Toast ref={toast} />
      <h4>{isEditMode ? 'Editar producto' : 'Crear producto'}</h4>

      {/*
      <InputContainer>
        <Label htmlFor="text">Texto video:</Label>
        <Input id="text" {...register('text', { required: 'Este campo es obligatorio' })} />
        {errors.text && <ErrorMessage>{errors.text.message}</ErrorMessage>}
      </InputContainer>

      <InputContainer>
        <Label htmlFor="urlImage">Url Imagen:</Label>
        <Textarea id="urlImage" {...register('urlImage', { required: 'Este campo es obligatorio' })} />
        {errors.urlImage && <ErrorMessage>{errors.urlImage.message}</ErrorMessage>}
      </InputContainer>

      <InputContainer>
        <Label htmlFor="urlVideo">Url Video:</Label>
        <Textarea id="urlVideo" {...register('urlVideo', { required: 'Este campo es obligatorio' })} />
        {errors.urlVideo && <ErrorMessage>{errors.urlVideo.message}</ErrorMessage>}
      </InputContainer>
      */}

      <SelectContainer>
        <Label htmlFor="storeId">Tienda:</Label>
        <Select
          id="storeId"
          value={selectedStore}
          {...register('storeId', {
            required: 'Este campo es obligatorio',
            validate: (value: any) => value !== '' || 'Por favor, selecciona una tienda',
          })}
          onChange={(e) => setSelectedStore(e.target.value)}
        >
          <option value="">Seleccione tienda</option>
          {getResponse.map((option: any) => (
            <option key={option.id} value={`${option.id}`}>
              {option.name}
            </option>
          ))}
        </Select>
        {errors.storeId && <ErrorMessage>{errors.storeId.message}</ErrorMessage>}
      </SelectContainer>

      <InputContainer>
        <Label htmlFor="name">Nombre de producto:</Label>
        <Input id="name" {...register('name', { required: 'Este campo es obligatorio' })} />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </InputContainer>

      <InputContainer>
        <Label htmlFor="prompt">Prompt del Sistema:</Label>
        <Controller
          name="prompt"
          control={control}
          rules={{ required: 'Este campo es obligatorio' }}
          render={({ field }) => (
            <ScrollableQuill
              {...field}
              theme="snow"
              placeholder="Personalidad y contexto principal del chatbot"
            />
          )}
        />
        {errors.prompt && <ErrorMessage>{errors.prompt.message}</ErrorMessage>}
      </InputContainer>

      <InputContainer>
        <Label htmlFor="maxTokens">Máximo de tokens:</Label>
        <Input id="maxTokens" placeholder='Longitud máxima de respuesta' {...register('maxTokens', { required: 'Este campo es obligatorio' })} />
        {errors.maxTokens && <ErrorMessage>{errors.maxTokens.message}</ErrorMessage>}
      </InputContainer>

      <InputContainer>
        <Label htmlFor="temperature">Temperatura:</Label>
        <Input id="temperature" placeholder='Controla creatividad (0 - 2)' {...register('temperature', { required: 'Este campo es obligatorio' })} />
        {errors.temperature && <ErrorMessage>{errors.temperature.message}</ErrorMessage>}
      </InputContainer>

      <div id="submitButton" style={{ position: 'relative'}}>
        <SubmitButton type="submit" disabled={!isValid}>
          {isEditMode ? 'Guardar' : 'Crear producto'}
        </SubmitButton>
      </div>

    </FormContainer>
  );
};

export default FormProducts;
