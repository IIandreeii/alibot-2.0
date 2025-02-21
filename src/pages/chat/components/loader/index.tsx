import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animaciones
const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const animLoader = keyframes`
  50% {
    transform: scale(1) translate(-50%, -50%);
  }
`;

// Estilos para el contenedor del loader
const LoaderContainer = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.89);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh; // Puedes usar '100%' en lugar de '100vh' si prefieres
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Estilos para el loader
const Loader = styled.span`
  width: 48px;
  height: 48px;
  display: block;
  margin: 15px auto;
  position: relative;
  color: #a483d7;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;

  &::after,
  &::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    width: 24px;
    height: 24px;
    top: 50%;
    left: 50%;
    transform: scale(0.5) translate(0, 0);
    background-color: #5d95f8;
    border-radius: 50%;
    animation: ${animLoader} 1s infinite ease-in-out;
  }

  &::before {
    background-color: #15c;
    transform: scale(0.5) translate(-48px, -48px);
  }
`;

const LoaderComponent = () => {
  return (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
};

export default LoaderComponent;
