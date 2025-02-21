import React from "react";

export const Statistics = () => {
  return (
    <div className="w-full container mx-auto p-4 text-white flex justify-center h-auto">
      <div className="w-4/5 h-auto">
        <div className="text-center mb-8 ">
                <h3 className="text-5xl font-bold">
                  Nuestros usuarios{" "}
                  <span
                    className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-700"
                  >
                    aman{" "}
                  </span>
                  Alibot
                </h3>
              </div>

        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-10 h-auto">
          <div className="columns">
            <div className="">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2Fwsp%20rese%C3%B1a%201.png?alt=media&token=6a40277b-8228-4094-a88d-fc30308be665"
                alt="Image 1"
                className="rounded-xl w-[230px] "
              />
            </div>
            <div>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2Fwsp%20rese%C3%B1a%202.png?alt=media&token=66637480-09eb-4949-9247-ae501c327b0b"
                alt="Image 2"
                className="rounded-xl w-[230px]"
              />
            </div>
            <div>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2Fwsp%20rese%C3%B1a%203.png?alt=media&token=80061d36-37f8-46dc-9e2e-ca13dc1e9f5c"
                alt="Image 3"
                className="rounded-xl w-[230px]"
              />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h5 className="text-5xl font-semibold mb-4">Estadísticas de éxito con Alibot</h5>
            <div className="space-y-4 text-xl w-full">
              <p className="flex items-center justify-start gap-2">
                <svg
                  width="70"
                  height="70"
                  viewBox="0 0 70 70"
                  fill="white"
                  className=" w-[25%]"
                >
                  <defs>
                    <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="56.54%" stopColor="#662483"></stop>
                      <stop offset="74.51%" stopColor="#662483"></stop>
                    </linearGradient>
                  </defs>
                  <circle
                    className="circle-background"
                    cx="35"
                    cy="35"
                    r="30"
                    strokeWidth=""
                    stroke=""
                  ></circle>
                  <circle
                    className=""
                    cx="35"
                    cy="35"
                    r="31"
                    fill="#2D2E83"
                    strokeWidth="8px"
                    stroke="url(#progress-gradient)"
                    transform="rotate(-90 35 35)"
                    style={{ strokeDasharray: "194.779", strokeDashoffset: "23.3734" }}
                  ></circle>
                  <text
                    x="50%"
                    y="50%"
                    dy=".3em"
                    textAnchor="middle"
                  >
                    97%
                  </text>
                </svg>
                <span className="text-[18px] w-[100%]">Dijeron que escalaron sus ventas fácilmente.</span>

              </p>

              <p className="flex items-center justify-start gap-2 ">
              <svg
                  width="70"
                  height="70"
                  viewBox="0 0 70 70"
                  fill="white"
                  className="w-[25%]"
                >
                  <defs>
                    <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="56.54%" stopColor="#662483"></stop>
                      <stop offset="74.51%" stopColor="#662483"></stop>
                    </linearGradient>
                  </defs>
                  <circle
                    className="circle-background"
                    cx="35"
                    cy="35"
                    r="30"
                    strokeWidth=""
                    stroke=""
                  ></circle>
                  <circle
                    className=""
                    cx="35"
                    cy="35"
                    r="31"
                    fill="#2D2E83"
                    strokeWidth="8px"
                    stroke="url(#progress-gradient)"
                    transform="rotate(-90 35 35)"
                    style={{ strokeDasharray: "194.779", strokeDashoffset: "23.3734" }}
                  ></circle>
                  <text
                    x="50%"
                    y="50%"
                    dy=".3em"
                    textAnchor="middle"
                  >
                    90%
                  </text>
                </svg>
                <span className="text-[18px] w-[100%]">Dijeron que evitaron contratar + de 1 asesor de venta adicional.</span>
              </p>
            </div>
            <div className="mt-4">
              <small className="block mb-2">
                * Resultados obtenidos según usuarios de Alibot. Para obtener mayor información ver
                reseñas.
              </small>
              <p className="flex items-center">
                <div className="w-4 h-4 bg-yellow-400 rounded-full mr-1"></div>
                <div className="w-4 h-4 bg-yellow-400 rounded-full mr-1"></div>
                <div className="w-4 h-4 bg-yellow-400 rounded-full mr-1"></div>
                <div className="w-4 h-4 bg-yellow-400 rounded-full mr-1"></div>
                <div className="w-4 h-4 bg-yellow-400 rounded-full mr-1"></div>
                4.9/5 basado en 27 reseñas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
