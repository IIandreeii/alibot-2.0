import styled, { css } from "styled-components";
import { Dialog } from 'primereact/dialog';

export const StyledDialog = styled(Dialog)`
  .p-dialog {
    width: 90%; /* Hacer el contenedor más grande */
    max-height: 95vh; /* Aumentar la altura máxima */
    display: flex;
    flex-direction: column;
    justify-content: center; /* Centrar verticalmente */
    align-items: center; /* Centrar horizontalmente */
    overflow: hidden; /* Eliminar el desplazamiento */
    border-radius: 20px;
    background-color: white;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 1);
    margin: 0 auto; /* Centrar el contenedor */
  }

  .p-dialog-header-close {
    position: absolute;
    top: 3rem;
    right: 1rem;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #000;
    transition: background-color 0.3s;
    cursor: pointer;
    &:hover {
      background-color: #333;
    }
  }

  .p-dialog-content {
    width: 100%; /* Asegurar que el contenido ocupe todo el ancho */
    padding: 2rem;
    font-size: 14px;
    color: #333;
    flex-grow: 1;
    overflow: hidden; /* Eliminar el desplazamiento */
    border-radius: 0 0 20px 20px; /* Añadido para redondear el cuerpo del diálogo */
    display: flex;
    justify-content: center; /* Centrar horizontalmente */
    align-items: center; /* Centrar verticalmente */
  }

  .p-dialog-footer .p-button {
    width: 100%;
    padding: 0.75rem;
    font-size: 16px;
    font-weight: bold;
    background-color: #e0e0e0;
    border-radius: 12px;
    border: none;
    cursor: not-allowed;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 1);
  }
`;

export const Container = styled.div`
  grid-column: span 2 / span 2;
  background-color: white;
  border-radius: 15px;
  @media (max-width: 768px) {
    width: 100%;
    grid-column: span 12 / span 12;
  }
  > div {
    padding: 15px;
    border-right: 1px solid #f0f0f0;
    &:last-child {
      padding: 0;
      height: 55vh;
    }
    margin-bottom: 10px;
    > input {
      width: 100%;
      padding: 10px;
      border: 1px solid #f0f0f0;
      border-radius: 10px;
      margin-bottom: 10px;
    }
    > button {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #2D2E83;
      color: white;
      border: none;
      border-radius: 10px;
      padding: 10px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 1); /* Cambiado a opacidad 1 */

      &:hover {
        background-color: #3C58A4;
      }

      &:focus {
        outline: none;
      }
      span {
        width: fit-content;
        max-width: fit-content;
        margin: 0 8px;
      }
    }
  }
`;

export const Card = styled.div`
  padding: 15px 20px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;

  
    & > div {
      opacity: 1;
      visibility: visible;
    }
  }

  p {
    font-weight: 600;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  button {
    display: flex;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
      background-color: #3C58A4;
      transform: scale(1.05);
    }

    i {
      margin-right: 5px;
    }
  }
`;

export const CardContainer = styled.div`
  overflow-y: auto;
  position: relative;
`;