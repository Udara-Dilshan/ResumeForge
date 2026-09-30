import { useState } from 'react'

import DateSelect from '../ui/DateSelect'
import TextInput from '../ui/TextInput'
import WizardNavigation from './WizardNavigation'

import type { Certification } from '../../types/resume'

import { certificationItemSchema } from '../../schemas/certificationSchema'

import { useResumeStore } from '../../store/resumeStore'

function createCertification(): Certification {
  return {
    id: crypto.randomUUID(),
    name: '',
    issuer: '',
    issueDate: null,
    credentialUrl: '',
  }
}

function CertificationsStep() {
  const entries = useResumeStore(
    (state) => state.resume.certifications,
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
    updates: Partial<Certification>,
  ) => {
    const nextEntries = entries.map((entry) =>
      entry.id === id
        ? {
            ...entry,
            ...updates,
          }
        : entry,
    )

    updateResume({
      certifications: nextEntries,
    })
  }

  const addCertification = () => {
    updateResume({
      certifications: [
        ...entries,
        createCertification(),
      ],
    })
  }

  const removeCertification = (id: string) => {
    updateResume({
      certifications: entries.filter(
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
        certificationItemSchema.safeParse(entry)

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

  const handleSkip = () => {
    updateResume({
      certifications: [],
    })

    setErrors({})

    nextStep()
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">
        Add professional certifications, courses, and credentials.
      </p>

      {entries.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-sm font-medium text-slate-700">
            No certifications added yet.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Add a certification below or skip this step.
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
                Certification {index + 1}
              </h3>

              <button
                type="button"
                onClick={() =>
                  removeCertification(entry.id)
                }
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>

            <div className="space-y-5">
              <TextInput
                id={`certification-name-${entry.id}`}
                label="Certification Name"
                placeholder="AWS Certified Cloud Practitioner"
                value={entry.name}
                onChange={(event) =>
                  updateEntry(entry.id, {
                    name: event.target.value,
                  })
                }
                error={entryErrors.name}
              />

              <TextInput
                id={`certification-issuer-${entry.id}`}
                label="Issuer"
                placeholder="Amazon Web Services"
                value={entry.issuer}
                onChange={(event) =>
                  updateEntry(entry.id, {
                    issuer:
                      event.target.value,
                  })
                }
                error={entryErrors.issuer}
              />

              <DateSelect
                label="Issue Date"
                value={entry.issueDate}
                onChange={(value) =>
                  updateEntry(entry.id, {
                    issueDate: value,
                  })
                }
                error={entryErrors.issueDate}
              />

              <TextInput
                id={`credential-url-${entry.id}`}
                type="url"
                label="Credential URL"
                placeholder="https://example.com/credential"
                value={entry.credentialUrl}
                onChange={(event) =>
                  updateEntry(entry.id, {
                    credentialUrl:
                      event.target.value,
                  })
                }
              />
            </div>
          </article>
        )
      })}

      <button
        type="button"
        onClick={addCertification}
        className="w-full rounded-lg border border-dashed border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        + Add Certification
      </button>

      <WizardNavigation
        onBack={previousStep}
        onNext={handleNext}
        onSkip={handleSkip}
        showSkip
      />
    </div>
  )
}

export default CertificationsStep