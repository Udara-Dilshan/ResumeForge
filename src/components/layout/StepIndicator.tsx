import { useResumeStore } from '../../store/resumeStore'

interface StepIndicatorProps {
  currentStep: number
}

const steps = [
  'Personal',
  'Summary',
  'Experience',
  'Education',
  'Projects',
  'Skills',
  'Certifications',
  'Languages',
  'References',
  'Additional',
]

function StepIndicator({
  currentStep,
}: StepIndicatorProps) {
  const goToStep = useResumeStore(
    (state) => state.goToStep,
  )

  const isReview = currentStep === 11
  const isATS = currentStep === 12
  const isTemplate = currentStep === 13
  const isPDFPreview = currentStep === 14

  const progress =
    isReview ||
    isATS ||
    isTemplate ||
    isPDFPreview
      ? 100
      : currentStep * 10

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              {isReview
                ? 'Review Resume'
                : isATS
                  ? 'ATS Analysis'
                  : isTemplate
                    ? 'Template Selection'
                    : isPDFPreview
                      ? 'PDF Preview'
                      : `Step ${currentStep} of ${steps.length}`}
            </p>

            <h2 className="text-lg font-semibold text-slate-900">
              {isReview
                ? 'Review'
                : isATS
                  ? 'ATS Analysis'
                  : isTemplate
                    ? 'Templates'
                    : isPDFPreview
                      ? 'PDF Preview'
                      : steps[currentStep - 1]}
            </h2>
          </div>

          <span className="text-sm text-slate-500">
            {progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-slate-900 transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="mt-4 hidden gap-2 overflow-x-auto md:flex">
          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isCurrent =
              stepNumber === currentStep
            const isCompleted =
              stepNumber < currentStep

            return (
              <button
                key={step}
                type="button"
                onClick={() =>
                  goToStep(stepNumber)
                }
                className={[
                  'rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition',
                  isCurrent
                    ? 'bg-slate-900 text-white'
                    : isCompleted
                      ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
                ].join(' ')}
              >
                {stepNumber}. {step}
              </button>
            )
          })}

          {isReview && (
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
              Review
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default StepIndicator