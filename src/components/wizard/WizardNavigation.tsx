interface WizardNavigationProps {
  onBack?: () => void
  onNext?: () => void
  onSkip?: () => void
  nextLabel?: string
  showBack?: boolean
  showSkip?: boolean
  disabled?: boolean
}

function WizardNavigation({
  onBack,
  onNext,
  onSkip,
  nextLabel = 'Next',
  showBack = true,
  showSkip = false,
  disabled = false,
}: WizardNavigationProps) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            disabled={disabled}
            className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>
        )}
      </div>

      <div className="flex gap-3">
        {showSkip && (
          <button
            type="button"
            onClick={onSkip}
            disabled={disabled}
            className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Skip for now
          </button>
        )}

        <button
          type="button"
          onClick={onNext}
          disabled={disabled}
          className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {nextLabel}
        </button>
      </div>
    </div>
  )
}

export default WizardNavigation