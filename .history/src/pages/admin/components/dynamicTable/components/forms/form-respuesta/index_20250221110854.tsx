import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { useTemplate } from '../../../../../../../services/template/template.service';
import { useChatContext } from 'pages/chat/context/chat';
import { Checkbox } from 'primereact/checkbox';
import ReactQuill from 'react-quill'; // Importar Quill
import 'react-quill/dist/quill.snow.css'; // Importar el estilo de Quill
import { htmlToText } from 'html-to-text';
import { storage } from '../../../../../../../libs/firebase'; // Asegúrate de que esta ruta sea correcta
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface FormData {
  upsellText: string;
  upsellImage: File | string;
  upsellVideo: File | string;
  upsellTextVideo: string;
  keyword: string;
  isConfirmed: boolean;
  isInformative: boolean;
}

const FormContainer = styled.form`
  width: 100%;
  max-width: 500px; /* Ajustar el tamaño máximo del formulario */
  margin: 10px auto;
  padding: 0 10px;
  margin-bottom: 30px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
  h4 {
    font-size: 18px; /* Reducir el tamaño de la fuente */
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
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 12px; /* Reducir el tamaño de la fuente */
`;

const Input = styled.input`
  width: 100%;
  padding: 6px; /* Reducir el padding */
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 12px;

  &:focus {
    border-color: #007BFF;
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 10px; /* Reducir el tamaño de la fuente */
`;

const SubmitButton = styled.button`
  background-color: #2D2E83;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px; /* Reducir el padding */
  font-size: 14px; /* Reducir el tamaño de la fuente */
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

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: space-between; 
`;

const ScrollableQuill = styled(ReactQuill)`
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

const FormRespuesta: React.FC<Props> = ({
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
  const { postRespuesta, patchRespuesta } = useTemplate();
  const { setShowMessageDialog } = useChatContext();
  const [isChecked, setisChecked] = useState(false);
  const [isInformatived, setInformatived] = useState(false);

  useEffect(() => {
    setShowMessageDialog(true);
  }, []);

  const uploadFile = async (file: File, path: string) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const confirmCreateUser = (data: FormData) => {
    if (isDeletingUser) return;

    confirmPopup({
      className: 'toast_custom',
      appendTo: document.getElementById('submitButton') as HTMLElement,
      message:
        dataEdit?.action === 'edit'
          ? '¿Estás seguro de editar la respuesta rápida?'
          : '¿Estás seguro de crear la respuesta rápida?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'SI',
      rejectLabel: 'NO',
      accept: () => accept(data),
      reject: closeModal,
    });
  };

  const onSubmit = async (data: FormData) => {
    const upsellImageUrl = await uploadFile(data.upsellImage as File, `images/${(data.upsellImage as File).name}`);
    const upsellVideoUrl = await uploadFile(data.upsellVideo as File, `videos/${(data.upsellVideo as File).name}`);
    const upsellText = htmlToText(data.upsellText, { wordwrap: 200 });
    const upsellTextVideo = htmlToText(data.upsellTextVideo, { wordwrap: 200 });
    console.log('Datos enviados:', { ...data, upsellImage: upsellImageUrl, upsellVideo: upsellVideoUrl, upsellText, upsellTextVideo });
    confirmCreateUser({ ...data, upsellImage: upsellImageUrl, upsellVideo: upsellVideoUrl, upsellText, upsellTextVideo });
  };

  const accept = async (data: FormData) => {
    setLoaderService(true);
    console.log('data 2', data);
    
    const upsellTextVideoParse = htmlToText(data.upsellTextVideo, {
      wordwrap: 200,
    });
  
    const upsellTextParse = htmlToText(data.upsellText, {
      wordwrap: 200,
    });
  
    try {
      if (dataEdit?.action === 'edit') {
        await patchRespuesta({ ...data, upsellTextVideo: upsellTextVideoParse, upsellText: upsellTextParse, isConfirmed: isChecked, isInformative: isInformatived, id: Number(dataEdit?.data?.id) }, Number(dataEdit?.data?.id));
      } else {
        await postRespuesta({ ...data, upsellTextVideo: upsellTextVideoParse, upsellText: upsellTextParse, isConfirmed: isChecked, isInformative: isInformatived, id: Number(id) });
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
      setValue('upsellText', dataEdit.data.upsellText);
      setValue('upsellImage', dataEdit.data.upsellImage);
      setValue('upsellVideo', dataEdit.data.upsellVideo);
      setValue('upsellTextVideo', dataEdit.data.upsellTextVideo);
      setValue('keyword', dataEdit.data.keyword);
     
      setisChecked(dataEdit.data.isConfirmed);
      setInformatived(dataEdit.data.isInformative);
      trigger();
    }
  }, [dataEdit, setValue, trigger]);

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Toast ref={toast} />
      <h4>{isEditMode ? 'Editar respuesta rápida' : 'Crear respuesta rápida'}</h4>

      <InputContainer>
        <Label htmlFor="keyword">Palabra clave:</Label>
        <Input id="keyword" {...register('keyword', { required: 'Este campo es obligatorio' })} />
        {errors.keyword && <ErrorMessage>{errors.keyword.message}</ErrorMessage>}
      </InputContainer>

      <InputContainer>
        <Label htmlFor="upsellImage">Url Imagen:</Label>
        <Input type="file" id="upsellImage" {...register('upsellImage', { required: 'Este campo es obligatorio' })} />
        {errors.upsellImage && <ErrorMessage>{errors.upsellImage.message}</ErrorMessage>}
      </InputContainer>

      <InputContainer>
        <Label htmlFor="upsellVideo">Url Video:</Label>
        <Input type="file" id="upsellVideo" {...register('upsellVideo', { required: 'Este campo es obligatorio' })}  />
        {errors.upsellVideo && <ErrorMessage>{errors.upsellVideo.message}</ErrorMessage>}
      </InputContainer>

      <InputContainer>
        <Label htmlFor="upsellText">Texto:</Label>
        <Controller 
          name="upsellText"
          control={control}
          rules={{ required: 'Este campo es obligatorio' }}
          render={({ field }) => (
            <ScrollableQuill
              {...field}
              theme="snow"
              placeholder="Escribe el texto"
            />
          )}
        />
        {errors.upsellText && <ErrorMessage>{errors.upsellText.message}</ErrorMessage>}
      </InputContainer>

      <InputContainer>
        <Label htmlFor="upsellTextVideo">Texto Video:</Label>
        <Controller
          name="upsellTextVideo"
          control={control}
          rules={{ required: 'Este campo es obligatorio' }}
          render={({ field }) => (
            <ScrollableQuill
              {...field}
              theme="snow"
              placeholder="Escribe el texto del video"
            />
          )}
        />
        {errors.upsellTextVideo && <ErrorMessage>{errors.upsellTextVideo.message}</ErrorMessage>}
      </InputContainer>

      <CheckboxContainer>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <Checkbox
            inputId="isConfirmed"
            onChange={(e) => setisChecked(e.checked || false)}
            checked={isChecked}
            style={{ boxSizing: 'border-box', backgroundColor: 'white', border: '1px solid black', borderRadius: '1px', width: '20px', height: '24px' }}
          />
          <span style={{ marginLeft: '8px' }}>Confirmar pedido</span>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <Checkbox
            inputId="isInformative"
            onChange={(e) => setInformatived(e.checked || false)}
            checked={isInformatived}
            style={{ boxSizing: 'border-box', backgroundColor: 'white', border: '1px solid black', borderRadius: '1px', width: '20px', height: '24px' }}
          />
          <span style={{ marginLeft: '8px' }}>Informar pedido</span>
        </label>
      </CheckboxContainer>

      <div id="submitButton" style={{ position: 'relative' }}>
        <SubmitButton type="submit" disabled={!isValid}>
          {isEditMode ? 'Guardar' : 'Crear respuesta'}
        </SubmitButton>
      </div>
    </FormContainer>
  );
};

export default FormRespuesta;