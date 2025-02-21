import React, { Suspense } from "react";
import { ThemeProvider } from "styled-components";
import AppRoutes from "./routes";
import useAppLoad from "../src/common/hooks/useAppLoad";
import { theme } from "./styles"; // Asegúrate de importar bien el tema
import "./styles.scss";

const SplashPage = React.lazy(() => import("../src/pages/splash"));

export default function App() {
  const { isLoaded, progress } = useAppLoad();

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>Cargando...</div>}>
        {!isLoaded ? <SplashPage progress={progress} /> : <AppRoutes />}
      </Suspense>
    </ThemeProvider>
  );
}
