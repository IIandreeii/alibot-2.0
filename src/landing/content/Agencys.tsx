import Carousel from "../components/Carousel";

export const Agencys = () => {
  return (
    <div className="py-20">
      <div className="max-w-screen-xl px-6 m-auto md:px-24">
        <h3 className="text-3xl font-semibold mb-5 text-white text-center md:text-5xl">
          Tenemos más de <span className="text-3xl font-semibold text-primary-default md:text-5xl">18 agencias</span> de aduana y carga registradas
        </h3>
        <p className="text-xl text-white text-center mb-20">
          En Arkabia, solo trabajamos con las mejores agencias en Perú.
        </p>
      </div>

      <div className="flex justify-center items-center h-screen bg-gray-100 mb-8">
        <Carousel />
      </div>

      <div className="text-center">
        <button className="flex items-center justify-center gap-2 border border-white rounded-lg text-white text-xl py-2 px-4 m-auto">
          Ver video
        </button>
      </div>
    </div>
  );
};
