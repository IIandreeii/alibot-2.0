import React, { useEffect, useState } from 'react'
import './Custom.css'

export const Plans = () => {
    const [checked, setChecked] = useState(false)
    const [price,setPrice]=useState(99)
    const [select,setSelected]=useState('Pro')

const handleClick=(click:any)=>{
  setSelected(click)
}

useEffect(()=>{
  switch(select){
    case 'Bas':
      setPrice(27)
      break
    case 'Pro':
      setPrice(99)
      break
    default:
      break
  }
},[select])

  return (
    <div id="plans" className="max-w-screen-xl m-auto px-4 py-10 md:px-10">
      <h3 className="text-3xl font-semibold mb-5 text-white text-center md:text-5xl">
        Elige el plan <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-700">correcto </span> para ti
      </h3>

      <div className="flex items-center w-full justify-center text-white ">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="flex flex-col md:flex-row">
            <div className={`cardCustom p-4 rounded-lg m-2 ${select === 'Bas' ? 'cardClick' : ''}`} onClick={() => handleClick('Bas')}>
              <h4 className="text-xl font-semibold">Básico</h4>
              <h2 className="text-3xl font-bold">27 <span className="text-lg">USD</span></h2>
              <p>
                <ul className="ml-4">
                  <li>• Chat: ∞</li>
                  <li>• Número de Whatsapp API: 1</li>
                  <li>• Envió de mensajes: ∞</li>
                  <li>• Asesores de venta: 10</li>
                  <li>• Respuestas rápidas: ∞</li>
                  <li>• Tiendas: 5</li>
                  <li>• Respuesta con IA: ∞</li>
                  <li>• Autoconfirmación con Shopify: ∞</li>
                </ul>
              </p>
            </div>



            <div className={`relative cardCustom rounded-lg m-2 border-[6px] border-[#662483;] ${select === 'Pro' ? 'cardClick' : ''}`} onClick={() => handleClick('Pro')}>
              <div className="text-sm font-semibold w-full text-center flex justify-center absolute left-0 right-0 top-[-5%]"><span className=' color-morado w-[50%] rounded-md flex items-center h-[30px] text-center justify-center'>Más popular</span></div>
              <h4 className="text-xl font-semibold">Profesional</h4>
              <h2 className="text-3xl font-bold">99 <span className="text-lg">USD</span></h2>
              <p>
                <ul className="list-none ml-4">
                  <li>• Chat: ∞</li>
                  <li>• Número de Whatsapp API: ∞</li>
                  <li>• Envió de mensajes: ∞</li>
                  <li>• Asesores de venta: ∞</li>
                  <li>• Respuestas rápidas: ∞</li>
                  <li>• Tiendas: ∞</li>
                  <li>• Respuesta con IA: ∞</li>
                  <li>• Autoconfirmación con Shopify: ∞</li>
                </ul>
              </p>
            </div>
          </div>

        </div>

        <div className="mt-8 md:mt-0 md:ml-8 p-10 bg-[#2c2c2c] border-[2px] border-gray-600 rounded-lg ">
            <h5 className="text-2xl text-white font-semibold pb-3 mb-3 border-b border-gray-600">Resumen de pedido</h5>
            <p className="flex justify-between text-base text-white mb-5 gap-2" >
              Plan Prueba gratis
              <span className="flex items-center text-4xl md:text-2xl text-white">0 <small className="text-base ml-2">USD</small></span>
            </p>
            <div>
              <p className="flex justify-between text-base text-white">
                Subtotal
                <span className="flex items-center text-4xl md:text-2xl text-white">
                  {price} <small className="text-base ml-2">USD</small>
                </span>
              </p>
            </div>
            <button className="mt-4 px-4 py-2 bg-white text-[#2c2c2c] rounded-lg w-full">
              <a href='https://www.skool.com/alibot/about' target='_blank' rel="noreferrer">Empezar ahora</a>
            </button>
          </div>
        </div>
      </div>

  )
}
