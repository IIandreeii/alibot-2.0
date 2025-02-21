import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { RadioButton } from 'primereact/radiobutton';
import { useTemplate } from 'services/template/template.service';
import { useChatContext } from 'pages/chat/context/chat';

interface FormData {
  text: string;
  name: string;
  code: string;
  templateType: string; 
}

const FormContainer = styled.form`
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 768px) {
    width: 100%;
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
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
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
  justify-content: space-between;
  margin-top: 10px;
  cursor: pointer;
  font-size: 14px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  > label {
    display: flex;
    align-items: center;
    gap: 5px;

    > div > div {
      width: 14px;
      height: 14px;
      margin: auto;
      border: 1px solid black; /* Borde negro */

      > div {
        width: 8px;
        height: 8px;
      }
    }
  }
`;

interface Props {
  closeModal: () => void;
  setLoaderService: (data: boolean) => void;
  dataEdit: any;
  id?: string;
  isDeletingUser: boolean;
}

const radioOptions = [
    { label: 'Genérico', value: 'generic' },
    { label: 'Agencia', value: 'agency' },
    { label: 'Pago contra Entrega', value: 'cash_on_delivery' },
];

const FormPlantilla: React.FC<Props> = ({
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
  const { postTemplate, patchTemplate } = useTemplate();
  const { setShowMessageDialog } = useChatContext();

  useEffect(() => {
    setShowMessageDialog(true)
  }, [])

  const confirmCreateUser = (data: FormData) => {
    
    if (isDeletingUser) return;

    confirmPopup({
      className: "toast_custom", 
      appendTo: document.getElementById('submitButton') as HTMLElement,
      message: dataEdit?.action === 'edit' ? '¿Estás seguro de editar la plantilla?' : '¿Estás seguro de crear la plantilla?',
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

  const accept = async (data: FormData) => {
    setLoaderService(true);
    
    try {
      if (dataEdit?.action === 'edit') {
        await patchTemplate({ ...data }, Number(dataEdit?.data?.id));
      } else {
        await postTemplate({ ...data, id: Number(id) });
      }
      closeModal();
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error', life: 3000 });
    } finally {
      setLoaderService(false);
    }
  };

  useEffect(() => {
    setValue('templateType', 'generic');
  }, [])
  

  useEffect(() => {
    if (dataEdit?.action === 'edit') {
      setIsEditMode(true);
      setValue('name', dataEdit.data.name);
      setValue('code', dataEdit.data.code);
      setValue('text', dataEdit.data.text);
      setValue('templateType', dataEdit.data.templateType);
      trigger();
    }
  }, [dataEdit, setValue, trigger]);

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Toast ref={toast} />
      <h4>{isEditMode ? 'Editar plantilla' : 'Crear plantilla'}</h4>

      <InputContainer>
        <Label htmlFor="name">Nombre plantilla:</Label>
        <Input id="name" {...register('name', { required: 'Este campo es obligatorio' })} />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </InputContainer>

      <InputContainer>
        <Label htmlFor="code">Cod. plantilla en meta:</Label>
        <Input id="code" {...register('code', { required: 'Este campo es obligatorio' })} />
        {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
      </InputContainer>

      <InputContainer>
        <Label htmlFor="text">Adicional:</Label>
        <Textarea id="text" {...register('text', { required: 'Este campo es obligatorio' })} />
        {errors.text && <ErrorMessage>{errors.text.message}</ErrorMessage>}
      </InputContainer>

      <InputContainer>
        <Label>Tipo de Plantilla:</Label>
        <RadioGroup>
          {radioOptions.map((option) => (
            <label key={option.value}>
              <Controller
                name="templateType"
                control={control}
                rules={{ required: 'Selecciona un tipo de plantilla.' }}
                render={({ field }) => (
                  <RadioButton
                    style={{ cursor: 'pointer' }}
                    inputId={option.value}
                    {...field}
                    value={option.value}
                    checked={field.value === option.value}
                  />
                )}
              />
              {option.label}
            </label>
          ))}
        </RadioGroup>
        {errors.templateType && <ErrorMessage>{errors.templateType.message}</ErrorMessage>}
      </InputContainer>

      <div  id="submitButton" style={{position: 'relative'}}>
        <SubmitButton type="submit" disabled={!isValid}>
          {isEditMode ? 'Guardar' : 'Crear plantilla'}
        </SubmitButton>
      </div>

    </FormContainer>
  );
};

export default FormPlantilla;
