import React from 'react'
import Styles from './styles.module.scss'
import styled from 'styled-components';

export const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 80px;
  @media (max-width: 768px) {
    gap: 40px;
  }
`;

// Estilizado de las imágenes
export const Image = styled.img`
  width: 100%;
  max-width: 250px;  
  height: auto;
  border-radius: 5px;
  object-fit: cover;
`;

export const Services = () => {
    const { container, containerServices } = Styles

  return (
    <div className={container}>
      <h3 style={{ 
          background: 'linear-gradient(94deg, #662483, #2D2E83 73.97%)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          WebkitTextStroke: '0.50px blue', // Borde blanco delgado
        }}>
        ¿Te identificas con esto?
      </h3>
      <div className={containerServices}>
        <div>
          <div>
            <h5>• ¿Agotado de responder manualmente las mismas preguntas que te hacen por WhatsApp?</h5>
            <h5>• ¿Confirmar 50 pedidos al día suele ser una tarea pasada?</h5>
            <h5>• ¿Te bloquean tu WhatsApp constantemente? </h5>
            <h5>• ¿Te cuesta atender a tus clientes por las noches?</h5>
            <h5>• ¿Sientes que al escalar necesitares mas asesores de venta?</h5>
            <h5>• ¿No tienes personal de venta en la madrugada?</h5>
          </div>

          <ImageContainer>
            <Image src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2Fseccion%20-%20imagen%201.jpg?alt=media&token=17534ead-6425-4037-a143-88441ef9d078" alt="" />
            <Image src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2Fseccion%20-%20imagen%202.jpg?alt=media&token=c9432111-c726-48a0-a962-9664bce4b1f5" alt="" />
            <Image src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2Fseccion%20-%20imagen%203.jpg?alt=media&token=18703f2e-75f4-4077-a50f-e17ef716806d" alt="" />
          </ImageContainer>

        </div>

        
      </div>
    </div>
  )
}
