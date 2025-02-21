import React from "react";
import Styles from "./styles.module.scss";
import Carousel from "..landing/components/carousel";

export const Agencys = () => {
  const { container, containerCarrousel, containerAction, containerDetail } = Styles;

  return (
    <div className={container}>
      <div className={containerDetail}>
        <h3>
          Tenemos más de <span>18 agencias</span> de aduana y carga registradas
        </h3>
        <p>En Arkabia, solo trabajamos con las mejores agencias en Perú.</p>
      </div>

      <div className={containerCarrousel}>
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <Carousel />
        </div>
      </div>

      <div className={containerAction}>
        <button>Ver video</button>
      </div>
    </div>
  );
};
