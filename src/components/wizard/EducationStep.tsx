import { useState } from 'react'

import DateSelect from '../ui/DateSelect'
import TextInput from '../ui/TextInput'

import type { Education } from '../../types/resume'
import { educationItemSchema } from '../../schemas/educationSchema'
import { useResumeStore } from '../../store/resumeStore'

function createEducation(): Education {
  return {
    id: crypto.randomUUID(),
    degree: '',
    institution: '',
    location: '',
    startDate: null,
    endDate: null,
    currentlyStudying: false,
    description: '',
  }
}

function EducationStep() {
  const entries = useResumeStore(
    (state) => state.resume.education,
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
    Record<string, Record<string, string>>
  >({})

  const updateEntry = (
    id: string,
    updates: Partial<Education>,
  ) => {
    const nextEntries = entries.map((entry) =>
      entry.id === id
        ? { ...entry, ...updates }
        : entry,
    )

    updateResume({
      education: nextEntries,
    })
  }

  const addEducation = () => {
    updateResume({
      education: [
        ...entries,
        createEducation(),
      ],
    })
  }

  const removeEducation = (id: string) => {
    updateResume({
      education: entries.filter(
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
      Record<string, string>
    > = {}

    for (const entry of entries) {
      const result =
        educationItemSchema.safeParse(entry)

      if (!result.success) {
        nextErrors[entry.id] = {}

        for (const issue of result.error.issues) {
          const field = String(issue.path[0])

          if (!nextErrors[entry.id][field]) {
            nextErrors[entry.id][field] =
              issue.message
          }
        }
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

  const handlePrevious = () => {
    previousStep()
  }

  const handleSkip = () => {
    updateResume({
      education: [],
    })

    nextStep()
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">
        Add your academic qualifications and education history.
      </p>

      {entries.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-sm font-medium text-slate-700">
            No education added yet.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Add your first education entry below.
          </p>
        </div>
      )}

      {entries.map((entry, index) => {
        const entryErrors =
          errors[entry.id] ?? {}

        return (
          <article
            key={entry.id}
            className="rounded-2xl border border-slate-200 p-5"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="font-semibold text-slate-900">
                Education {index + 1}
              </h3>

              <button
                type="button"
                onClick={() =>
                  removeEducation(entry.id)
                }
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>

            <div className="space-y-5">
              <TextInput
                id={`degree-${entry.id}`}
                label="Degree / Qualification"
                placeholder="Bachelor of Information and Communication Technology"
                value={entry.degree}
                onChange={(event) =>
                  updateEntry(entry.id, {
                    degree: event.target.value,
                  })
                }
                error={entryErrors.degree}
              />

              <TextInput
                id={`institution-${entry.id}`}
                label="Institution"
                placeholder="University of Colombo"
                value={entry.institution}
                onChange={(event) =>
                  updateEntry(entry.id, {
                    institution:
                      event.target.value,
                  })
                }
                error={entryErrors.institution}
              />

              <TextInput
                id={`education-location-${entry.id}`}
                label="Location"
                placeholder="Colombo, Sri Lanka"
                value={entry.location}
                onChange={(event) =>
                  updateEntry(entry.id, {
                    location: event.target.value,
                  })
                }
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <DateSelect
                  label="Start Date"
                  value={entry.startDate}
                  onChange={(value) =>
                    updateEntry(entry.id, {
                      startDate: value,
                    })
                  }
                  error={entryErrors.startDate}
                />

                {!entry.currentlyStudying && (
                  <DateSelect
                    label="End Date"
                    value={entry.endDate}
                    onChange={(value) =>
                      updateEntry(entry.id, {
                        endDate: value,
                      })
                    }
                    error={entryErrors.endDate}
                  />
                )}
              </div>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={entry.currentlyStudying}
                  onChange={(event) =>
                    updateEntry(entry.id, {
                      currentlyStudying:
                        event.target.checked,
                      endDate: event.target.checked
                        ? null
                        : entry.endDate,
                    })
                  }
                  className="h-4 w-4 rounded border-slate-300"
                />

                <span className="text-sm font-medium text-slate-700">
                  I am currently studying here
                </span>
              </label>

              <div className="space-y-2">
                <label
                  htmlFor={`education-description-${entry.id}`}
                  className="block text-sm font-medium text-slate-700"
                >
                  Description
                </label>

                <textarea
                  id={`education-description-${entry.id}`}
                  rows={6}
                  value={entry.description}
                  onChange={(event) =>
                    updateEntry(entry.id, {
                      description:
                        event.target.value,
                    })
                  }
                  placeholder="Relevant coursework, achievements, activities, or academic details."
                  className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                />
              </div>
            </div>
          </article>
        )
      })}

      <button
        type="button"
        onClick={addEducation}
        className="w-full rounded-lg border border-dashed border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        + Add Education
      </button>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSkip}
            className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Skip for now
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default EducationStep