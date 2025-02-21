import { useState } from 'react'
import './Custom.css'
export const FAQ = () => {
  const [acordion,setAcordion]=useState(false)
  const [acordion2,setAcordion2]=useState(true)

    const handleclick=()=>{
      setAcordion(!acordion)
    }
    const handleclick2=()=>{
      setAcordion2(!acordion2)
    }
  return (
    
    <div id="faq" className="max-w-screen-xl m-auto px-10 py-20 md:px-24">
      <h3 className="text-3xl font-semibold mb-10 text-white text-center md:text-5xl">¿Tienes preguntas?</h3>

      <div className="containerFaq mb-4">
      <div className='flex flex-col gap-[30px]'>

            <div onClick={handleclick} className={`cursor-pointer m-0 text-lg text-white text-left font-semibold md:text-xl  flex w-full items-start justify-center gap-4 p-2.5 px-7.5  rounded-3xl flex-col py-5  ${acordion? 'border-[6px] border-[#662483;]':'border-[1px] border-[#333;] bg-[#333] '} transition-all duration-300 ease-in`}>
                <h2>¿A quienes les sirve Alibot?</h2>
                <p className={` ${acordion? 'text-[18px] transition-all duration-300 ease-in':'hidden'}`}>  
                Esta herramienta le sirve a todas aquellas personas que recién estan iniciando en el mundo de las ventas por internet.
                </p> 
            </div>

            <div onClick={handleclick2} className={`cursor-pointer m-0 text-lg text-white text-left font-semibold md:text-xl  flex w-full items-start justify-center gap-4 p-2.5 px-7.5  rounded-3xl flex-col py-5  ${acordion2? 'border-[6px] border-[#662483;]':'border-[1px] border-[#333;] bg-[#333] '} transition-all duration-300 ease-in`}>
                <h2>¿Cuánto cuesta Alibot?</h2>
                <p className={` ${acordion2? 'text-[18px] transition-all duration-300 ease-in':'hidden'}`}>  
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
          className="text-white no-underline"
        >
          ¿Cuentas con dudas? Lo resolvemos de inmediato con un asesor
        </a>
      </p>
    </div>
  )
}
