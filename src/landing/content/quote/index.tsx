import React from 'react'
import Styles from './styles.module.scss'
import { CtaButton } from '../../../landing/components/button'

export const Quote = () => {
    const { container, containerServices,stylePhone,stylePhoneReverse,containerText } = Styles

  return (
    <div className={container}>
      <h3>
        Si respondiste que si, entonces <span style={{ 
          background: 'linear-gradient(94deg, #662483, #2D2E83 73.97%)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          WebkitTextStroke: '0.50px blue', // Borde blanco delgado
        }}>
          ALIBOT es la solución
        </span>
      </h3>

      <div className={containerServices}>
        <div className={`w-full flex justify-center px-5 gap-10 ${stylePhoneReverse}`}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <video style={{
              maxWidth: '100%',
              maxHeight: '100%'
            }} 
            controls>
              <source src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2FAutomatizar.mp4?alt=media&token=f6935005-13c1-4aeb-aea0-5b51f55f2071" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className={`flex flex-col w-1/2 h-full items-baseline justify-center
            max-md:items-center max-md:w-full`}>
            <h5>
              Autoconfirmación de <strong>pedidos contra entrega</strong> para campañas de conversión por página.
            </h5>
            <ul>
              <li>• Integración con Shopify.</li>
              <li>• Gestión de respuestas rápidas.</li>
              <li>• Manejo de plantillas de confirmación.</li>
              <li>• Integración con Aliclik.</li>
            </ul>

            <div className='max-md:full max-md:flex max-md:justify-center'>
            <CtaButton />
            </div>

          </div>
        </div>
      </div>

      <div className={containerServices}>
        <div className={`w-full flex justify-center px-5 gap-10 ${stylePhone}`}>
          <div className='flex flex-col w-1/2 h-full items-baseline justify-center
          max-md:items-center max-md:w-full'>
            <h5>
              Autoconfirmación de <strong>pedidos envíos por agencia</strong> (previo adelanto) para los campañas de conversión con página.
            </h5>
            <ul>
              <li>• Integración con Shopify.</li>
              <li>• Gestión de respuestas rápidas.</li>
              <li>• Manejo de plantillas de confirmación.</li>
              <li>• Integración con Aliclik.</li>
            </ul>
          </div>
          <div className='col-span-8 text-center md:text-left' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <video style={{
              maxWidth: '100%',
              maxHeight: '100%'
            }} 
            controls>
              <source src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2FAgencias1.mp4?alt=media&token=f7e19e84-451e-4128-903e-84973b91a035" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      <div className={containerServices}>
        <div className={`w-full flex justify-center px-5 gap-10 ${stylePhoneReverse}`}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <video style={{
              maxWidth: '100%',
              maxHeight: '100%'
            }} 
            controls>
              <source src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2FWhatsapp.mp4?alt=media&token=decd7b61-1171-43c8-b970-7a352079a29f" type="video/mp4" />
              Your browser does not support the video tag.
              
            </video>
          </div>
          <div className='w-1/2 flex items-center max-md:items-center max-md:w-full'>
            <h5>
              Atención con respuestas rápidas automáticas para consultas por Whatsap o para tus campañas de mensajería directa.
            </h5>
          </div>
        </div>
      </div>

      <div className={containerServices}>
        <div className={`w-full flex justify-center px-5 gap-10 items-center ${stylePhone}`}>
          <div className={`h-full flex flex-col items-center max-md:items-center max-md:w-full max-md:text-center center${containerText}`}>
            <h5>
              Cierre de venta con IA para tus campañas de mensajería directa a WhatsApp.
            </h5>
            <p>
              Apaláncate de GPT humanizado para esta tarea manual.
            </p>
          </div>
          <div className=''>
            <img src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2Fportada%20para%20video%20landing%20alibot.jpg?alt=media&token=5b79cde5-c689-49bd-8ec4-91b6affe375a" alt="" />
          </div>
        </div>
      </div>

    </div>
  )
}
