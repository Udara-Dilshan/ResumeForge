import { useState } from 'react'

import TextInput from '../ui/TextInput'
import WizardNavigation from './WizardNavigation'

import type {
  Language,
  LanguageProficiency,
} from '../../types/resume'

import { languageItemSchema } from '../../schemas/languageSchema'

import { useResumeStore } from '../../store/resumeStore'

const proficiencyOptions: LanguageProficiency[] = [
  'Native',
  'Fluent',
  'Professional',
  'Upper Intermediate',
  'Intermediate',
  'Basic',
  'Beginner',
]

function createLanguage(): Language {
  return {
    id: crypto.randomUUID(),
    language: '',
    proficiency: 'Intermediate',
  }
}

function LanguagesStep() {
  const entries = useResumeStore(
    (state) => state.resume.languages,
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
    updates: Partial<Language>,
  ) => {
    updateResume({
      languages: entries.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              ...updates,
            }
          : entry,
      ),
    })
  }

  const addLanguage = () => {
    updateResume({
      languages: [
        ...entries,
        createLanguage(),
      ],
    })
  }

  const removeLanguage = (id: string) => {
    updateResume({
      languages: entries.filter(
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
        languageItemSchema.safeParse(entry)

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
      languages: [],
    })

    setErrors({})

    nextStep()
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">
        Add the languages you can use professionally or personally.
      </p>

      {entries.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-sm font-medium text-slate-700">
            No languages added yet.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Add a language below or skip this step.
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
                Language {index + 1}
              </h3>

              <button
                type="button"
                onClick={() =>
                  removeLanguage(entry.id)
                }
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput
                id={`language-${entry.id}`}
                label="Language"
                placeholder="English"
                value={entry.language}
                onChange={(event) =>
                  updateEntry(entry.id, {
                    language:
                      event.target.value,
                  })
                }
                error={entryErrors.language}
              />

              <div className="space-y-2">
                <label
                  htmlFor={`proficiency-${entry.id}`}
                  className="block text-sm font-medium text-slate-700"
                >
                  Proficiency
                </label>

                <select
                  id={`proficiency-${entry.id}`}
                  value={entry.proficiency}
                  onChange={(event) =>
                    updateEntry(entry.id, {
                      proficiency:
                        event.target
                          .value as LanguageProficiency,
                    })
                  }
                  className={[
                    'w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2',
                    entryErrors.proficiency
                      ? 'border-red-400 focus:ring-red-100'
                      : 'border-slate-300 focus:border-slate-500 focus:ring-slate-100',
                  ].join(' ')}
                >
                  {proficiencyOptions.map(
                    (option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    ),
                  )}
                </select>

                {entryErrors.proficiency && (
                  <p
                    className="text-sm text-red-600"
                    role="alert"
                  >
                    {entryErrors.proficiency}
                  </p>
                )}
              </div>
            </div>
          </article>
        )
      })}

      <button
        type="button"
        onClick={addLanguage}
        className="w-full rounded-lg border border-dashed border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        + Add Language
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

export default LanguagesStep