import { CtaButton } from "../components/Button"

export const Quote = () => {
  return (
    <div className="max-w-screen-xl m-auto px-6 py-10 md:px-10 w-full">
      <h3 className="text-3xl font-semibold mb-5 text-white text-center md:text-5xl">
        Si respondiste que si, entonces <span className="bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent text-stroke text-stroke-blue-500">
          ALIBOT es la solución
        </span>
      </h3>

      <div className="flex flex-col justify-center items-center gap-20">

      <div className="w-full flex justify-center">
        <div className="w-[80%] flex justify-center items-center gap-10 max-md:w-full max-md:flex-col-reverse">
          <div className="flex justify-end items-center">
            <video className="w-[55vh] max-h-full " controls>
              <source src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2FAutomatizar.mp4?alt=media&token=f6935005-13c1-4aeb-aea0-5b51f55f2071" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex flex-col items-baseline w-full h-full justify-center text-white gap-5">
            <h5 className="text-[38px] leading-13 max-md:text-[25px] max-md:leading-8">
              Autoconfirmación de <strong>pedidos contra entrega</strong> para campañas de conversión por página.
            </h5>
            <ul className="list-disc pl-5 leading-9 text-lg">
              <li>Integración con Shopify.</li>
              <li>Gestión de respuestas rápidas.</li>
              <li>Manejo de plantillas de confirmación.</li>
              <li>Integración con Aliclik.</li>
            </ul>
            <div className="w-full flex justify-start mt-4 max-md:justify-center">
              <CtaButton />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-[80%] flex justify-center items-center gap-10 max-md:w-full max-md:flex-col">
          <div  className="flex flex-col items-baseline w-full h-full justify-center text-white gap-5">
            <h5 className="text-[38px] leading-13 max-md:text-[25px] max-md:leading-8">
              Autoconfirmación de <strong>pedidos envíos por agencia</strong> (previo adelanto) para los campañas de conversión con página.
            </h5>
            <ul className="list-disc pl-5">
              <li>Integración con Shopify.</li>
              <li>Gestión de respuestas rápidas.</li>
              <li>Manejo de plantillas de confirmación.</li>
              <li>Integración con Aliclik.</li>
            </ul>
          </div>
          <div className="flex justify-end items-center">
            <video className="w-[55vh] max-h-full" controls>
              <source src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2FAgencias1.mp4?alt=media&token=f7e19e84-451e-4128-903e-84973b91a035" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-[80%] flex justify-center items-center gap-10 max-md:w-full max-md:flex-col-reverse">
          <div className="flex justify-end items-center">
            <video className="w-[55vh] max-h-full " controls>
              <source src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2FWhatsapp.mp4?alt=media&token=decd7b61-1171-43c8-b970-7a352079a29f" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex flex-col items-baseline w-full h-full justify-center text-white gap-5">
            <h5 className="text-[35px] leading-11 font-semibold">
               Atención con respuestas rápidas automáticas para consultas por Whatsap o para tus campañas de mensajería directa. 
            </h5>
          </div>
        </div>
      </div>

      <div className="">
        <div className="w-full flex justify-center px-5 gap-10 items-center flex-col md:flex-row">
          <div className="h-full flex flex-col items-center text-center md:items-start md:text-left text-white gap-5">
            <h5 className="text-4xl font-semibold leading-11">
              Cierre de venta con IA para tus campañas de mensajería directa a WhatsApp.
            </h5>
            <p>
              Apaláncate de GPT humanizado para esta tarea manual.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <img src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2Fportada%20para%20video%20landing%20alibot.jpg?alt=media&token=5b79cde5-c689-49bd-8ec4-91b6affe375a" alt="Portada para video landing Alibot" className="max-w-full max-h-full rounded-3xl" />
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
