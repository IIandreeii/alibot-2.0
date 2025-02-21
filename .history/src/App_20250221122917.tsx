import React, { Suspense } from "react";
import AppRoutes from "./routes";
import useAppLoad from "../src/common/hooks/useAppLoad";
import AppThemeProvider from "../src/common/"; // Importamos el ThemeProvider personalizado
import "./styles.scss";

const SplashPage = React.lazy(() => import("../src/pages/splash"));

export default function App() {
  const { isLoaded, progress } = useAppLoad();

  return (
    <AppThemeProvider>
      <Suspense fallback={<div>Cargando...</div>}>
        {!isLoaded ? <SplashPage progress={progress} /> : <AppRoutes />}
      </Suspense>
    </AppThemeProvider>
  );
}
