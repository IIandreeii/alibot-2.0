import styled from "styled-components";

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;
    border-radius: 15px; // Añadir borde redondeado
    padding: 2rem;
    position: relative; // Añadir position: relative para el contenedor
    width: 100%;
    margin: 0 auto; // Centrar el contenedor
`;

export const ContainerGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const Label = styled.label`
    font-weight: bold;
`;

export const Input = styled.input`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 10px; // Añadir borde redondeado
`;

export const ErrorMessage = styled.span`
    color: red;
    font-size: 0.875rem;
`;

export const SubmitButton = styled.button`
    padding: 0.75rem;
    background-color: #2D2E83;
    color: white;
    border: none;
    border-radius: 10px; // Añadir borde redondeado
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #3C58A4;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #333;
    &:hover {
        color: #000;
    }
`;

export const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const CheckboxLabel = styled.label`
    font-weight: bold;
`;