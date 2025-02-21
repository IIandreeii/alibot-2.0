import React from 'react'
import AppRoutes from './routes'

import useAppLoad from '../src/common/hooks/useAppLoad'
import "./styles.scss";

const SplashPage = React.lazy(() => import('../src/pages/splash'))

export default function App() {
  return <AppRoutes />
}
