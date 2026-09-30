import { useState } from 'react'

import TextInput from '../ui/TextInput'
import WizardNavigation from './WizardNavigation'

import type { CustomSection } from '../../types/resume'

import { customSectionItemSchema } from '../../schemas/customSectionSchema'

import { useResumeStore } from '../../store/resumeStore'

function createCustomSection(): CustomSection {
  return {
    id: crypto.randomUUID(),
    title: '',
    content: '',
    showOnResume: true,
  }
}

function CustomSectionsStep() {
  const entries = useResumeStore(
    (state) => state.resume.customSections,
  )

  const updateResume = useResumeStore(
    (state) => state.updateResume,
  )

  const previousStep = useResumeStore(
    (state) => state.previousStep,
  )

  const nextStep = useResumeStore(
    (state) => state.nextStep,
  )

  const [errors, setErrors] = useState<
    Record<string, string>
  >({})

  const updateEntry = (
    id: string,
    updates: Partial<CustomSection>,
  ) => {
    updateResume({
      customSections: entries.map(
        (entry) =>
          entry.id === id
            ? {
                ...entry,
                ...updates,
              }
            : entry,
      ),
    })
  }

  const addSection = () => {
    updateResume({
      customSections: [
        ...entries,
        createCustomSection(),
      ],
    })
  }

  const removeSection = (id: string) => {
    updateResume({
      customSections: entries.filter(
        (entry) => entry.id !== id,
      ),
    })

    setErrors((current) => {
      const next = { ...current }
      delete next[id]
      return next
    })
  }

  const validate = () => {
    const nextErrors: Record<
      string,
      string
    > = {}

    for (const entry of entries) {
      const result =
        customSectionItemSchema.safeParse(
          entry,
        )

      if (!result.success) {
        nextErrors[entry.id] =
          result.error.issues[0]?.message ??
          'Invalid section'
      }
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  const handleNext = () => {
    if (!validate()) {
      return
    }

    nextStep()
  }

  const handleSkip = () => {
    updateResume({
      customSections: [],
    })

    setErrors({})

    nextStep()
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">
          Add any resume sections that are relevant to you.
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Examples: Awards, Publications, Hackathons, Leadership,
          Research, Volunteer Experience, Courses, Interests.
        </p>
      </div>

      {entries.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-sm font-medium text-slate-700">
            No custom sections added.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            You can add any section you need.
          </p>
        </div>
      )}

      {entries.map((entry, index) => (
        <article
          key={entry.id}
          className="rounded-2xl border border-slate-200 p-5"
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <h3 className="font-semibold text-slate-900">
              Custom Section {index + 1}
            </h3>

            <button
              type="button"
              onClick={() =>
                removeSection(entry.id)
              }
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>

          <div className="space-y-5">
            <TextInput
              id={`custom-title-${entry.id}`}
              label="Section Title"
              placeholder="Awards & Achievements"
              value={entry.title}
              onChange={(event) =>
                updateEntry(entry.id, {
                  title: event.target.value,
                })
              }
              error={errors[entry.id]}
            />

            <div className="space-y-2">
              <label
                htmlFor={`custom-content-${entry.id}`}
                className="block text-sm font-medium text-slate-700"
              >
                Content
              </label>

              <textarea
                id={`custom-content-${entry.id}`}
                rows={7}
                value={entry.content}
                onChange={(event) =>
                  updateEntry(entry.id, {
                    content:
                      event.target.value,
                  })
                }
                placeholder={`Employee of the Year — 2025
Winner of University Hackathon
Volunteer mentor for programming students`}
                className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
              />

              <p className="text-xs text-slate-500">
                Use separate lines for separate achievements or items.
              </p>
            </div>

            <label className="flex items-start gap-3 rounded-lg bg-slate-50 p-4">
              <input
                type="checkbox"
                checked={entry.showOnResume}
                onChange={(event) =>
                  updateEntry(entry.id, {
                    showOnResume:
                      event.target.checked,
                  })
                }
                className="mt-0.5 h-4 w-4 rounded border-slate-300"
              />

              <span>
                <span className="block text-sm font-semibold text-slate-800">
                  Show on resume
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  Keep this section saved without displaying it if unchecked.
                </span>
              </span>
            </label>
          </div>
        </article>
      ))}

      <button
        type="button"
        onClick={addSection}
        className="w-full rounded-lg border border-dashed border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        + Add Custom Section
      </button>

      <WizardNavigation
        onBack={previousStep}
        onNext={handleNext}
        onSkip={handleSkip}
        showSkip
        nextLabel="Review Resume"
      />
    </div>
  )
}

export default CustomSectionsStep