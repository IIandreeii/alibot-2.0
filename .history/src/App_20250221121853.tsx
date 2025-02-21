// filepath: /c:/Users/andree/Alibot-ubdate/src/App.tsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppRoutes from './routes';
import useAppLoad from '../src/common/hooks/useAppLoad';
import { theme } from './theme';
import "./styles.scss";

const SplashPage = React.lazy(() => import('../src/pages/splash'));

export default function App() {
  const { isLoaded, progress } = useAppLoad();

  if (!isLoaded) {
    return (
      <ThemeProvider theme={theme}>
        <SplashPage progress={progress} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}