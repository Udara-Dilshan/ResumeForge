import { useResumeStore } from '../store/resumeStore'
import type { ResumeTemplate } from '../store/resumeStore'

const templates: {
  id: ResumeTemplate
  name: string
  description: string
  features: string[]
}[] = [
  {
    id: 'ats-classic',
    name: 'ATS Classic',
    description:
      'Simple single-column layout focused on readability and ATS compatibility.',
    features: [
      'Single column',
      'Minimal decoration',
      'No photo by default',
      'Clear section headings',
    ],
  },
  {
    id: 'modern',
    name: 'Modern',
    description:
      'A more visual layout with stronger hierarchy and optional profile photo.',
    features: [
      'Modern typography',
      'Visual hierarchy',
      'Optional photo',
      'Clean accents',
    ],
  },
  {
    id: 'compact',
    name: 'Compact',
    description:
      'Tighter spacing for resumes with a lot of content.',
    features: [
      'Compact spacing',
      'More content per page',
      'Simple typography',
      'Readable layout',
    ],
  },
]

function TemplateSelectionPage() {
  const selectedTemplate = useResumeStore(
    (state) => state.selectedTemplate,
  )

  const setSelectedTemplate =
    useResumeStore(
      (state) => state.setSelectedTemplate,
    )

  const goToStep = useResumeStore(
    (state) => state.goToStep,
  )

  const handleContinue = () => {
    goToStep(14)
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">
          Template Selection
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Choose Your Resume Template
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          You can change the template later without losing your resume information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {templates.map((template) => {
          const selected =
            selectedTemplate === template.id

          return (
            <button
              key={template.id}
              type="button"
              onClick={() =>
                setSelectedTemplate(
                  template.id,
                )
              }
              className={[
                'text-left rounded-2xl border bg-white p-5 shadow-sm transition',
                selected
                  ? 'border-slate-900 ring-2 ring-slate-900'
                  : 'border-slate-200 hover:border-slate-400',
              ].join(' ')}
            >
              <div className="aspect-[210/297] overflow-hidden rounded-lg bg-slate-100 p-4">
                <div className="h-full bg-white p-4 shadow-sm">
                  {template.id === 'ats-classic' && (
                    <>
                      <div className="h-4 w-28 bg-slate-800" />
                      <div className="mt-2 h-2 w-20 bg-slate-300" />

                      <div className="mt-5 space-y-2">
                        <div className="h-2 w-16 bg-slate-700" />
                        <div className="h-1.5 w-full bg-slate-200" />
                        <div className="h-1.5 w-5/6 bg-slate-200" />
                      </div>

                      <div className="mt-5 space-y-2">
                        <div className="h-2 w-20 bg-slate-700" />
                        <div className="h-1.5 w-full bg-slate-200" />
                        <div className="h-1.5 w-4/5 bg-slate-200" />
                        <div className="h-1.5 w-5/6 bg-slate-200" />
                      </div>
                    </>
                  )}

                  {template.id === 'modern' && (
                    <>
                      <div className="flex gap-3">
                        <div className="h-12 w-12 rounded-full bg-slate-300" />

                        <div className="flex-1">
                          <div className="h-4 w-28 bg-slate-800" />
                          <div className="mt-2 h-2 w-20 bg-slate-300" />
                        </div>
                      </div>

                      <div className="mt-5 h-1 bg-slate-800" />

                      <div className="mt-5 space-y-2">
                        <div className="h-2 w-16 bg-slate-700" />
                        <div className="h-1.5 w-full bg-slate-200" />
                        <div className="h-1.5 w-4/5 bg-slate-200" />
                      </div>
                    </>
                  )}

                  {template.id === 'compact' && (
                    <>
                      <div className="h-4 w-28 bg-slate-800" />

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="h-1.5 bg-slate-200" />
                        <div className="h-1.5 bg-slate-200" />
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="h-2 w-14 bg-slate-700" />
                        <div className="h-1 w-full bg-slate-200" />
                        <div className="h-1 w-full bg-slate-200" />
                        <div className="h-1 w-5/6 bg-slate-200" />
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="h-2 w-16 bg-slate-700" />
                        <div className="h-1 w-full bg-slate-200" />
                        <div className="h-1 w-4/5 bg-slate-200" />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-slate-900">
                    {template.name}
                  </h2>

                  {selected && (
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                      Selected
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {template.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {template.features.map(
                    (feature) => (
                      <li
                        key={feature}
                        className="text-xs text-slate-500"
                      >
                        ✓ {feature}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={() => goToStep(12)}
          className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Preview Template
        </button>
      </div>
    </main>
  )
}

export default TemplateSelectionPage