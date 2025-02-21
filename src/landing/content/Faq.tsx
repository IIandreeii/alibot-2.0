import React from 'react'
import './Custom.css'
export const FAQ = () => {
  return (
    
    <div id="faq" className="max-w-screen-xl m-auto px-10 py-20 md:px-24">
      <h3 className="text-3xl font-semibold mb-10 text-white text-center md:text-5xl">¿Tienes preguntas?</h3>

      <div className="containerFaq mb-4">
      <div className='flex flex-col gap-[20px]'>
            <div className="m-0 text-lg text-white text-left font-semibold md:text-xl w- flexfull items-start justify-center gap-2.5 p-2.5 px-7.5 border-[6px] border-[#662483;] rounded-3xl flex-col">
                <h2>¿A quienes les sirve Alibot?</h2>
                <p className='text-[18px]' >  
                Esta herramienta le sirve a todas aquellas personas que recién estan iniciando en el mundo de las ventas por internet.
                </p>
            </div>
            <div className="m-0 text-lg text-white text-left font-semibold md:text-xl w-full flex items-start justify-center gap-2.5 p-2.5 px-7.5 border-[6px] border-[#662483;] rounded-3xl flex-col">
            <h2>¿Cuánto cuesta Alibot?</h2>
                <p className='text-[18px]'>
                Se manejan 2 planes uno básico y otro profesional, principalmente la diferencia es la cantidad de usuarios y cuantas de Whatsap asociadas a la cuenta.
                </p>
            </div>
        </div>
      </div>
      <p className="text-lg text-white text-center font-semibold md:text-xl custom-blur">
        <a
          href="https://wa.me/51953168435?text=Hola%20soporte%20técnico%20de%20ALIBOT,%20tengo%20una consulta"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          ¿Cuentas con dudas? Lo resolvemos de inmediato con un asesor
        </a>
      </p>
    </div>
  )
}
