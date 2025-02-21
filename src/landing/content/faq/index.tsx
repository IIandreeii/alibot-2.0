import React from 'react'
import Styles from './styles.module.scss'
import { Accordion, AccordionTab } from 'primereact/accordion'

export const FAQ = () => {
    const { container, 
     } = Styles

  return (
    <div id="faq" className={container}>
      <h3>¿Tienes preguntas?</h3>

      <div className="containerFaq">
        <Accordion activeIndex={0}>
            <AccordionTab header="¿A quienes les sirve Alibot?">
                <p className="m-0">
                Esta herramienta le sirve a todas aquellas personas que recién estan iniciando en el mundo de las ventas por internet.
                </p>
            </AccordionTab>
            <AccordionTab header="¿Cuánto cuesta Alibot?">
                <p className="m-0">
                Se manejan 2 planes uno básico y otro profesional, principalmente la diferencia es la cantidad de usuarios y cuantas de Whatsap asociadas a la cuenta.
                </p>
            </AccordionTab>
        </Accordion>
      </div>
      <p>
        <a href="https://wa.me/51953168435?text=Hola%20soporte%20técnico%20de%20ALIBOT,%20tengo%20una consulta"
            target="_blank"
            rel="noopener noreferrer">
          ¿Cuentas con dudas? Lo resolvemos de inmediato con un asesor
        </a>
      </p>
  </div>
  )
}
