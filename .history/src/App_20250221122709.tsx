import React, { Suspense } from "react";
import { ThemeProvider } from "styled-components";
import AppRoutes from "./routes";
import useAppLoad from "../src/common/hooks/useAppLoad";
import  dark  from "../src/common/theme/dark"; // Asegúrate de importar bien el tema
import "./styles.scss";

const SplashPage = React.lazy(() => import("../src/pages/splash"));

export default function App() {
  const { isLoaded, progress } = useAppLoad();

  return (
    <ThemeProvider theme={dark}>
      <Suspense fallback={<div>Cargando...</div>}>
        {!isLoaded ? <SplashPage progress={progress} /> : <AppRoutes />}
      </Suspense>
    </ThemeProvider>
  );
}
