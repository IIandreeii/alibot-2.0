import React from 'react'

export const Services = () => {
  return (
    <div className="mx-auto p-4 text-white flex flex-col gap-5">
      <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-800 text-center text-5xl  mb-10">
        ¿Te identificas con esto?
      </h3>
      <div className="space-y-4 w-full flex flex-col gap-y-10">
        <div className='w-[57%] m-auto text-[20px] leading-[45px] font-semibold'>
          <h5>• ¿Agotado de responder manualmente las mismas preguntas que te hacen por WhatsApp?</h5>
          <h5>• ¿Confirmar 50 pedidos al día suele ser una tarea pasada?</h5>
          <h5>• ¿Te bloquean tu WhatsApp constantemente? </h5>
          <h5>• ¿Te cuesta atender a tus clientes por las noches?</h5>
          <h5>• ¿Sientes que al escalar necesitares mas asesores de venta?</h5>
          <h5>• ¿No tienes personal de venta en la madrugada?</h5>
        </div>
        <div className="flex justify-center items-center md:gap-[70px]">
          <img className="w-full max-w-3xs rounded-lg object-cover" src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2Fseccion%20-%20imagen%201.jpg?alt=media&token=17534ead-6425-4037-a143-88441ef9d078" alt="" />
          <img className="w-full max-w-3xs rounded-lg object-cover" src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2Fseccion%20-%20imagen%202.jpg?alt=media&token=c9432111-c726-48a0-a962-9664bce4b1f5" alt="" />
          <img className="w-full max-w-3xs rounded-lg object-cover" src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2Fseccion%20-%20imagen%203.jpg?alt=media&token=18703f2e-75f4-4077-a50f-e17ef716806d" alt="" />
        </div>
      </div>
    </div>
  )
}
