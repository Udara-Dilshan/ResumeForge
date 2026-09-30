import PersonalInfoStep from './PersonalInfoStep'
import SummaryStep from './SummaryStep'

import { useResumeStore } from '../../store/resumeStore'

function ResumeWizard() {
  const currentStep = useResumeStore((state) => state.currentStep)
  const previousStep = useResumeStore((state) => state.previousStep)
  const nextStep = useResumeStore((state) => state.nextStep)

  if (currentStep === 1) {
    return <PersonalInfoStep />
  }

  if (currentStep === 2) {
    return <SummaryStep />
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-slate-50 p-8 text-center">
        <p className="text-sm text-slate-500">
          Step {currentStep}
        </p>

        <h3 className="mt-2 text-xl font-semibold text-slate-900">
          Coming next
        </h3>
      </div>

      <div className="flex justify-between border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={previousStep}
          className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={nextStep}
          className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ResumeWizard