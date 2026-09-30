import ResumePreview from '../components/preview/ResumePreview'
import { useResumeStore } from '../store/resumeStore'

function ReviewPage() {
  const resume = useResumeStore(
    (state) => state.resume,
  )

  const goToStep = useResumeStore(
    (state) => state.goToStep,
  )

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-500">
          Final Review
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Review Your Resume
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Check your information before continuing to ATS analysis.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        {/* Review Summary */}
        <section className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Personal Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {resume.personalInfo.fullName ||
                    'Not completed'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => goToStep(1)}
                className="text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Professional Summary
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {resume.summary.content
                    ? 'Completed'
                    : 'Skipped'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => goToStep(2)}
                className="text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Experience
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {resume.experience.length}{' '}
                  {resume.experience.length === 1
                    ? 'entry'
                    : 'entries'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => goToStep(3)}
                className="text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Education
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {resume.education.length}{' '}
                  {resume.education.length === 1
                    ? 'entry'
                    : 'entries'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => goToStep(4)}
                className="text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Projects
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {resume.projects.length}{' '}
                  {resume.projects.length === 1
                    ? 'entry'
                    : 'entries'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => goToStep(5)}
                className="text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Skills
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {resume.skills.length}{' '}
                  {resume.skills.length === 1
                    ? 'skill'
                    : 'skills'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => goToStep(6)}
                className="text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Certifications
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {resume.certifications.length}{' '}
                  {resume.certifications.length === 1
                    ? 'entry'
                    : 'entries'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => goToStep(7)}
                className="text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Languages
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {resume.languages.length}{' '}
                  {resume.languages.length === 1
                    ? 'entry'
                    : 'entries'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => goToStep(8)}
                className="text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  References
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {resume.references.length}{' '}
                  {resume.references.length === 1
                    ? 'entry'
                    : 'entries'}
                  {' · '}
                  {resume.showReferences
                    ? 'Shown'
                    : 'Hidden'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => goToStep(9)}
                className="text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Additional Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {resume.customSections.length}{' '}
                  {resume.customSections.length === 1
                    ? 'custom section'
                    : 'custom sections'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => goToStep(10)}
                className="text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                Edit
              </button>
            </div>
          </div>

          <button
  type="button"
  onClick={() => goToStep(12)}
  className="w-full rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white hover:bg-slate-800"
>
  Continue to ATS Analysis
</button>
        </section>

        {/* Resume */}
        <section className="rounded-2xl border border-slate-200 bg-slate-100 p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Resume Preview
              </h2>

              <p className="text-sm text-slate-500">
                Final review copy
              </p>
            </div>

            <button
              type="button"
              onClick={() => goToStep(1)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Edit Resume
            </button>
          </div>

          <div className="overflow-auto">
            <ResumePreview />
          </div>
        </section>
      </div>
    </main>
  )
}

export default ReviewPage