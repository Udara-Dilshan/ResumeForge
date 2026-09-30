import Header from './components/layout/Header'
import StepIndicator from './components/layout/StepIndicator'
import BuilderPage from './pages/BuilderPage'
import ReviewPage from './pages/ReviewPage'
import { useResumeStore } from './store/resumeStore'
import ATSAnalysisPage from './pages/ATSAnalysisPage'
import TemplateSelectionPage from './pages/TemplateSelectionPage'
import TemplatePreviewPage from './pages/TemplatePreviewPage'

function App() {
  const currentStep = useResumeStore(
    (state) => state.currentStep,
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <StepIndicator
        currentStep={currentStep}
      />
      {currentStep === 11 ? (
  <ReviewPage />
) : currentStep === 12 ? (
  <ATSAnalysisPage />
) : currentStep === 13 ? (
  <TemplateSelectionPage />
) : currentStep === 14 ? (
  <TemplatePreviewPage />
) : (
  <BuilderPage />
)}
    </div>
  )
}

export default App