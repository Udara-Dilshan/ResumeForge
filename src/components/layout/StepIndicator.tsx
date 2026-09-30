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

function StepIndicator() {
  const currentStep = 1

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Step {currentStep} of {steps.length}
            </p>

            <h2 className="text-lg font-semibold text-slate-900">
              {steps[currentStep - 1]}
            </h2>
          </div>

          <span className="text-sm text-slate-500">
            {currentStep * 10}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-slate-900 transition-all"
            style={{
              width: `${currentStep * 10}%`,
            }}
          />
        </div>

        <div className="mt-4 hidden gap-2 overflow-x-auto md:flex">
          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isCurrent = stepNumber === currentStep

            return (
              <div
                key={step}
                className={[
                  'rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap',
                  isCurrent
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-500',
                ].join(' ')}
              >
                {stepNumber}. {step}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default StepIndicator