import React from "react";
import Styles from "./styles.module.scss";

export const Statistics = () => {
  const {
    container,
    containerContent,
    containerDetail,
    containerContent_images,
    containerContent_info,
  } = Styles;

  return (
    <div className={container}>
      <div className={containerDetail}>
        <h3>
          Nuestros usuarios{" "}
          <span
            style={{
              background: "linear-gradient(94deg, #662483, #2D2E83 73.97%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextStroke: "0.50px blue", // Borde blanco delgado
            }}
          >
            aman{" "}
          </span>{" "}
          Alibot
        </h3>
      </div>

      <div className={containerContent}>
        <div className={containerContent_images}>
          <div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2Fwsp%20rese%C3%B1a%201.png?alt=media&token=6a40277b-8228-4094-a88d-fc30308be665"
              alt="Image 1"
            />
          </div>
          <div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2Fwsp%20rese%C3%B1a%202.png?alt=media&token=66637480-09eb-4949-9247-ae501c327b0b"
              alt="Image 1"
            />
          </div>
          <div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2Fwsp%20rese%C3%B1a%203.png?alt=media&token=80061d36-37f8-46dc-9e2e-ca13dc1e9f5c"
              alt="Image 1"
            />
          </div>
        </div>
        <div className={containerContent_info}>
          <h5>Estadísticas de éxito con Alibot</h5>
          <div>
            <p>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 70 70"
                fill="#662483"
                style={{ maxWidth: "70px;", maxHeight: "70px;" }}
              >
                <defs>
                  <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="56.54%" stop-color="#662483"></stop>
                    <stop offset="74.51%" stop-color="#662483"></stop>
                  </linearGradient>
                </defs>
                <circle
                  className="circle-background"
                  cx="35"
                  cy="35"
                  r="31"
                  stroke-width="8px"
                  stroke="#e0e0e0"
                ></circle>
                <circle
                  className="circle-progress"
                  cx="35"
                  cy="35"
                  r="31"
                  fill="#2D2E83"
                  stroke-width="8px"
                  stroke="url(#progress-gradient)"
                  transform="rotate(-90 35 35)"
                  style={{ strokeDasharray: "194.779", strokeDashoffset: "23.3734" }}
                ></circle>
                <text
                  className="big-subheader circle-text"
                  x="50%"
                  y="50%"
                  dy=".3em"
                  text-anchor="middle"
                >
                  97%
                </text>
              </svg>
              Dijeron que escalaron sus ventas fácilmente.
            </p>

            <p>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 70 70"
                fill="#662483"
                style={{ maxWidth: "70px;", maxHeight: "70px;" }}
              >
                <defs>
                  <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="56.54%" stop-color="#662483"></stop>
                    <stop offset="74.51%" stop-color="#662483"></stop>
                  </linearGradient>
                </defs>
                <circle
                  className="circle-background"
                  cx="35"
                  cy="35"
                  r="31"
                  stroke-width="8px"
                  stroke="#e0e0e0"
                ></circle>
                <circle
                  className="circle-progress"
                  cx="35"
                  cy="35"
                  r="31"
                  fill="#2D2E83"
                  stroke-width="8px"
                  stroke="url(#progress-gradient)"
                  transform="rotate(-90 35 35)"
                  style={{ strokeDasharray: "194.779", strokeDashoffset: "23.3734" }}
                ></circle>
                <text
                  className="big-subheader circle-text"
                  x="50%"
                  y="50%"
                  dy=".3em"
                  text-anchor="middle"
                >
                  90%
                </text>
              </svg>
              Dijeron que evitaron contratar + de 1 asesor de venta adicional.
            </p>
          </div>
          <div>
            <small>
              * Resultados obtenidos según usuarios de Alibot. Para obtener mayor información ver
              reseñas.
            </small>
            <p>
              <div />
              <div />
              <div />
              <div />
              <div />
              4.9/5 basado en 27 reseñas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
