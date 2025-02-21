import { useEffect } from "react";
import { Plans } from "./Content/Plans";
import { Quote } from "./content";
import { Services } from "./Content/Services";
import { Statistics } from "./Content/Statistics";
import { Header } from "./Components/Header";
import { CtaButton } from "./Components/Button";
import { Footer } from "./Components/Footer";
import './styles.css'
export const LandingPage = () => {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.add("show_scroll");
    }
  }, []);

  return (
    <div className="  className='m-0 p-0 w-full h-full'">
      <Header isPage={false} />

      <div className="container-banners my-8 px-6 pt-36 pb-20 lg:px-24">
        <div className="max-w-screen-xl m-auto flex flex-col justify-between grid-cols-12 gap-20 items-center text-center lg:text-left lg:grid">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="font-semibold mb-8 text-white text-3xl text-center lg:text-left lg:text-5xl">
              <span className="font-semibold text-primary-default text-3xl text-center lg:text-left lg:text-4xl">
                Automatiza e integra IA en tu Ecommerce:
              </span>
              <br />
              Aumenta en 40% la productividad de tu asesor de venta Perú
            </h2>
            <p className="text-white text-xl text-center lg:text-left lg:text-2xl lg:pr-16">
              Automatiza la confirmación de pedidos en tu tienda online y <strong>escala</strong>{" "}
              tu negocio fácilmente sin contratar más personal.
            </p>

            <CtaButton />

            <div className="qualify mt-4">
              <small className="flex items-center text-xl text-white md:justify-center">
                Basado en 27 dueños de Ecommerce en Perú.
                <img src="https://www.arkabia.com/images/google-review.png" alt="" className="h-20 ml-5" />
              </small>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 mt-8">
            <video
              className="landing-second-section-video w-full rounded-xl"
              poster="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2Fportada%20para%20video%20landing%20alibot.jpg?alt=media&token=5b79cde5-c689-49bd-8ec4-91b6affe375a"
              controls
            >
              <source
                src="https://firebasestorage.googleapis.com/v0/b/alibot-6d746.appspot.com/o/videos-landing-alibot%2FAlibot%20Presentac%20Ion(1).mp4?alt=media&token=ac0b2b4f-153c-48d3-852b-d160f8fe0511"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      <Services />

      <Quote />

      <Statistics />

      <Plans />
      <FAQ />

      <Footer />
      <div className="whatsappButton">
        <a
          href="https://wa.me/51953168435?text=Hola%20soporte%20técnico%20de%20ALIBOT%20,%20tengo%20una consulta"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
          />
        </a>
      </div>
    </div>
)
};
