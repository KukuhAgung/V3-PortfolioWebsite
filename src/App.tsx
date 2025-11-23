import { lazy, Suspense } from 'react'
import './App.css'
import { LoadingProvider } from './context/LoadingProvider'

const MainContainer = lazy(() => import("./components/templates/MainContainer"));

function App() {

  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  )
}

export default App
