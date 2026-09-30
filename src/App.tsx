import Header from './components/layout/Header'
import StepIndicator from './components/layout/StepIndicator'
import BuilderPage from './pages/BuilderPage'
import { useResumeStore } from './store/resumeStore'

function App() {
  const currentStep = useResumeStore((state) => state.currentStep)

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <StepIndicator currentStep={currentStep} />
      <BuilderPage />
    </div>
  )
}

export default App