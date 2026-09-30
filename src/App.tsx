import Header from './components/layout/Header'
import StepIndicator from './components/layout/StepIndicator'
import BuilderPage from './pages/BuilderPage'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <StepIndicator />
      <BuilderPage />
    </div>
  )
}

export default App