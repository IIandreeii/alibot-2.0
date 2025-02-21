import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';

import { usePhoneNumberWithLoader } from '../../../../services/phone-number/getPhoneNumber.service';
import { ContainerGroup, ErrorMessage, FormContainer, Input, InputContainer, Label, SubmitButton } from './styles';
import Cookies from 'js-cookie';
import { Checkbox } from 'primereact/checkbox';

interface FormData {
    accountUserId: number;
    phoneNumberId: string;
    phone: string;
    tokenMeta: string;
    nickname: string;
    wabaId: string;
    openaiApiKey: string;
}

interface Props {
    closeModal: () => void;
    setLoaderService: (data: boolean) => void;
    dataEdit: any;
    isDeletingUser: boolean; // Recibe el estado de eliminación
}

const UserForm: React.FC<Props> = ({ closeModal, setLoaderService, dataEdit, isDeletingUser }) => {
    const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm<FormData>({
        mode: 'onChange'
    });
    const { postPhoneNumber, putPhoneNumber, loader } = usePhoneNumberWithLoader();
    const [isEditMode, setIsEditMode] = useState(false);
    const toast = useRef<any>(null);
    const [isChecked, setisChecked] = useState(false);

    const confirmCreateUser = (data: FormData) => {
        confirmPopup({
            className: "toast_custom",
            appendTo: document.getElementById('submitButton') as HTMLElement,
            message: dataEdit?.action === 'edit' ? '¿Estás seguro de editar al número?' : '¿Estás seguro de crear al número?',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            acceptLabel: 'SI',
            rejectLabel: 'NO',
            accept: () => accept(data),
            reject: closeModal
        });
    };

    const onSubmit = (data: FormData) => confirmCreateUser(data);

    const accept = async (data: FormData | null) => {
        const storedId = Cookies.get('authId');

        if (!data) return;
        setLoaderService(true);

        try {
            if (dataEdit?.action === 'edit' && dataEdit.phoneNumberId) {
                await putPhoneNumber(
                    { phoneNumberId: data.phoneNumberId, tokenMeta: data.tokenMeta, isAssistantAi: isChecked, nickname: data.nickname, wabaId: data.wabaId, openaiApiKey: data.openaiApiKey },
                    dataEdit.id
                );
                setLoaderService(false);
                closeModal();
            } else {
                await postPhoneNumber({ ...data, isAssistantAi: isChecked, accountUserId: Number(storedId) || 1 });
                setLoaderService(false);
                closeModal();
            }
        } catch (error) {
            setLoaderService(false);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al procesar el usuario', life: 3000 });
        }
    };

    useEffect(() => {
        if (dataEdit?.action === 'edit' && dataEdit.phoneNumberId) {
            setValue('accountUserId', dataEdit.id, { shouldValidate: true });
            setValue('phoneNumberId', dataEdit.phoneNumberId, { shouldValidate: true });
            setValue('tokenMeta', dataEdit.tokenMeta, { shouldValidate: true });
            setValue('phone', dataEdit.phone, { shouldValidate: true });
            setValue('nickname', dataEdit.nickname, { shouldValidate: true });
            setValue('wabaId', dataEdit.wabaId, { shouldValidate: true });
            setValue('openaiApiKey', dataEdit.openaiApiKey, { shouldValidate: false });
            setisChecked(dataEdit.isAssistantAi);
            setIsEditMode(true);
        }
    }, [dataEdit, setValue]);

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Toast ref={toast} />
            <h4>{isEditMode ? 'Editar número' : 'Crear número'} #<span>03</span></h4>
            <ContainerGroup>
                <InputContainer>
                    <Label htmlFor="phoneNumberId">Identificador de teléfono:</Label>
                    <Input
                        id="phoneNumberId"
                        type="tel"
                        {...register('phoneNumberId', { required: 'Campo obligatorio' })}
                    />
                    {errors.phoneNumberId && <ErrorMessage>{errors.phoneNumberId.message}</ErrorMessage>}
                </InputContainer>

                <InputContainer>
                    <Label htmlFor="phone">Número de celular:</Label>
                    <Input
                        id="phone"
                        type="tel"
                        {...register('phone', { required: 'Campo obligatorio' })}
                    />
                    {errors.phoneNumberId && <ErrorMessage>{errors.phoneNumberId.message}</ErrorMessage>}
                </InputContainer>

                <InputContainer>
                    <Label htmlFor="tokenMeta">Token:</Label>
                    <Input
                        id="tokenMeta"
                        {...register('tokenMeta', { required: 'Campo obligatorio' })}
                    />
                    {errors.tokenMeta && <ErrorMessage>{errors.tokenMeta.message}</ErrorMessage>}
                </InputContainer>

                <InputContainer>
                    <Label htmlFor="nickname">Nickname:</Label>
                    <Input
                        id="nickname"
                        {...register('nickname', { required: 'Campo obligatorio' })}
                    />
                    {errors.nickname && <ErrorMessage>{errors.nickname.message}</ErrorMessage>}
                </InputContainer>

                <InputContainer>
                    <Label htmlFor="wabaId">Identificador de WhatsApp Business:</Label>
                    <Input
                        id="wabaId"
                        {...register('wabaId', { required: 'Campo obligatorio' })}
                    />
                    {errors.wabaId && <ErrorMessage>{errors.wabaId.message}</ErrorMessage>}
                </InputContainer>

                <InputContainer>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <Checkbox
                            inputId="isAssistantAi"
                            onChange={(e) => setisChecked(e.checked || false)}
                            checked={isChecked}
                            style={{ boxSizing: 'border-box', backgroundColor: 'white', border: '1px solid black', borderRadius: '1px', width: '20px', height: '24px' }}
                            />
                        <span style={{ marginLeft: '8px' }}>Activar Asistente IA</span>
                    </label>
                </InputContainer>

                <InputContainer>
                    <Label htmlFor="openaiApiKey">Api key OpenAI:</Label>
                    <Input
                        id="openaiApiKey"
                        {...register('openaiApiKey', { required: '' })}
                    />
                    {errors.openaiApiKey && <ErrorMessage>{errors.openaiApiKey.message}</ErrorMessage>}
                </InputContainer>

            </ContainerGroup>

            <div id='submitButton' style={{ position: 'relative' }}>
                <SubmitButton type="submit" disabled={!isValid || loader.loading}>
                    {loader.loading ? <img src="/assets/icons/icon-loader.svg" alt="Icon loader" /> : isEditMode ? 'Guardar' : 'Crear usuario'}
                </SubmitButton>
            </div>

            <ConfirmPopup className='toast_delete' />
        </FormContainer>
    );
};

export default UserForm;
