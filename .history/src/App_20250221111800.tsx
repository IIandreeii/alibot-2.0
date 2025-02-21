import React from 'react'
import AppRoutes from './routes'

import useAppLoad from '../src/common/hooks/useAppLoad'
import "./styles.scss";

const SplashPage = React.lazy(() => import('../src/'))

export default function App() {
  const { isLoaded, progress } = useAppLoad()

  if (!isLoaded) return <SplashPage progress={progress} />
  return <AppRoutes />
}
