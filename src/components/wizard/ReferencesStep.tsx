import { useState } from 'react'

import TextInput from '../ui/TextInput'
import CountrySelect from '../ui/CountrySelect'

import type { Reference } from '../../types/resume'
import { referenceItemSchema } from '../../schemas/referenceSchema'
import { useResumeStore } from '../../store/resumeStore'

function createReference(): Reference {
  return {
    id: crypto.randomUUID(),
    fullName: '',
    jobTitle: '',
    company: '',
    email: '',
    phoneCountryCode: '+94',
    phoneNumber: '',
    relationship: '',
  }
}

function ReferencesStep() {
  const references = useResumeStore(
    (state) => state.resume.references,
  )

  const showReferences = useResumeStore(
    (state) => state.resume.showReferences,
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

  const updateReference = (
    id: string,
    updates: Partial<Reference>,
  ) => {
    updateResume({
      references: references.map((reference) =>
        reference.id === id
          ? { ...reference, ...updates }
          : reference,
      ),
    })
  }

  const addReference = () => {
    updateResume({
      references: [
        ...references,
        createReference(),
      ],
    })
  }

  const removeReference = (id: string) => {
    updateResume({
      references: references.filter(
        (reference) => reference.id !== id,
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

    for (const reference of references) {
      const result =
        referenceItemSchema.safeParse(reference)

      if (!result.success) {
        nextErrors[reference.id] = {}

        for (const issue of result.error.issues) {
          const field = String(issue.path[0])

          if (!nextErrors[reference.id][field]) {
            nextErrors[reference.id][field] =
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

  const handleSkip = () => {
    updateResume({
      references: [],
      showReferences: false,
    })

    nextStep()
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">
          References are optional. You can save them without showing them on the resume.
        </p>
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <input
          type="checkbox"
          checked={showReferences}
          onChange={(event) =>
            updateResume({
              showReferences: event.target.checked,
            })
          }
          className="mt-0.5 h-4 w-4 rounded border-slate-300"
        />

        <span>
          <span className="block text-sm font-semibold text-slate-800">
            Show references on resume
          </span>

          <span className="mt-1 block text-xs text-slate-500">
            Reference data remains saved when this is disabled.
          </span>
        </span>
      </label>

      {references.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-sm font-medium text-slate-700">
            No references added yet.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Add a reference below or skip this step.
          </p>
        </div>
      )}

      {references.map((reference, index) => {
        const entryErrors =
          errors[reference.id] ?? {}

        return (
          <article
            key={reference.id}
            className="rounded-2xl border border-slate-200 p-5"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="font-semibold text-slate-900">
                Reference {index + 1}
              </h3>

              <button
                type="button"
                onClick={() =>
                  removeReference(reference.id)
                }
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>

            <div className="space-y-5">
              <TextInput
                id={`reference-name-${reference.id}`}
                label="Full Name"
                placeholder="John Perera"
                value={reference.fullName}
                onChange={(event) =>
                  updateReference(reference.id, {
                    fullName:
                      event.target.value,
                  })
                }
                error={entryErrors.fullName}
              />

              <TextInput
                id={`reference-job-${reference.id}`}
                label="Job Title"
                placeholder="Senior Software Engineer"
                value={reference.jobTitle}
                onChange={(event) =>
                  updateReference(reference.id, {
                    jobTitle:
                      event.target.value,
                  })
                }
                error={entryErrors.jobTitle}
              />

              <TextInput
                id={`reference-company-${reference.id}`}
                label="Company"
                placeholder="ABC Technologies"
                value={reference.company}
                onChange={(event) =>
                  updateReference(reference.id, {
                    company:
                      event.target.value,
                  })
                }
                error={entryErrors.company}
              />

              <TextInput
                id={`reference-email-${reference.id}`}
                type="email"
                label="Email"
                placeholder="john@example.com"
                value={reference.email}
                onChange={(event) =>
                  updateReference(reference.id, {
                    email:
                      event.target.value,
                  })
                }
                error={entryErrors.email}
              />

              <div className="grid gap-4 sm:grid-cols-[1fr_1.5fr]">
                <CountrySelect
                  value={
                    reference.phoneCountryCode
                  }
                  onChange={(value) =>
                    updateReference(reference.id, {
                      phoneCountryCode: value,
                    })
                  }
                  error={
                    entryErrors.phoneCountryCode
                  }
                />

                <TextInput
                  id={`reference-phone-${reference.id}`}
                  type="tel"
                  label="Phone Number"
                  placeholder="771234567"
                  value={
                    reference.phoneNumber
                  }
                  onChange={(event) =>
                    updateReference(reference.id, {
                      phoneNumber:
                        event.target.value,
                    })
                  }
                  error={
                    entryErrors.phoneNumber
                  }
                />
              </div>

              <TextInput
                id={`reference-relationship-${reference.id}`}
                label="Relationship"
                placeholder="Former Manager"
                value={
                  reference.relationship
                }
                onChange={(event) =>
                  updateReference(reference.id, {
                    relationship:
                      event.target.value,
                  })
                }
                error={
                  entryErrors.relationship
                }
              />
            </div>
          </article>
        )
      })}

      <button
        type="button"
        onClick={addReference}
        className="w-full rounded-lg border border-dashed border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        + Add Reference
      </button>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={previousStep}
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

export default ReferencesStep