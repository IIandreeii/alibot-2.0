import React, { useEffect, useState } from 'react'
import Styles from './styles.module.scss'
import { InputSwitch } from 'primereact/inputswitch';

export const Plans = () => {
    const { container, containerForm, containerForm_switch, containerForm__plans,
      cardCustom, cardCustomBest,cardClick
     } = Styles
    const [checked, setChecked] = useState(false)
    const [price,setPrice]=useState(99)
    const [select,setSelected]=useState('Pro')

const handleClick=(click)=>{
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
    <div id="plans" className={container}>
      <h3>
        Elige el plan <span style={{ 
          background: 'linear-gradient(94deg, #662483, #2D2E83 73.97%)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          WebkitTextStroke: '0.50px blue', // Borde blanco delgado
        }}>correcto </span> para ti
      </h3>

    <div className={containerForm}>
      {/*<div className={containerForm_switch}>
        <div>
          <span>USD</span>
          <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
          <span>PEN</span>
        </div>
        <p>Ahorra 30% con el plan anual</p>
      </div>*/}

      <div className={containerForm__plans}>
        <div>
          <div className={`${cardCustom} ${select=='Bas'?cardClick:''}`} onClick={()=>handleClick('Bas')}>
            <h4>Básico</h4>
            <h2>27 <span>USD</span></h2>
            <p>
              <ul>
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

          <div className={`${cardCustom} ${cardCustomBest} ${select=='Pro'?cardClick:''}`} onClick={()=>handleClick('Pro')}>
            <span>Más popular</span>
            <h4>Profesional</h4>
            <h2>99 <span>USD</span></h2>
            <p>
            <ul>
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

        <div>
          <h5>Resumen de pedido</h5>
          <p>
            Plan Prueba gratis
            <span>0 USD</span>
          </p>
          <div>
            <p>
              Subtotal
              
              <span>{price} <small>USD</small></span>
            </p>
          </div>
          <button>
            <a href='https://www.skool.com/alibot/about' target='_blank' rel="noreferrer">Empezar ahora</a>
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}
