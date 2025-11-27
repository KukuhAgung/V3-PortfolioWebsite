import { Fragment, lazy, Suspense } from 'react'
import './App.css'
import { LoadingProvider } from './context/LoadingProvider'
import HeroSection from './components/pages/HeroSection';

const MainContainer = lazy(() => import("./components/templates/MainContainer"));

function App() {

  return (
    <Fragment>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
              <HeroSection />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </Fragment>
  )
}

export default App
