import { useState } from 'react'

import TextInput from '../ui/TextInput'

import type { Project } from '../../types/resume'
import { projectItemSchema } from '../../schemas/projectSchema'
import { useResumeStore } from '../../store/resumeStore'

function createProject(): Project {
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    technologies: [],
    liveDemoUrl: '',
    githubUrl: '',
  }
}

function ProjectsStep() {
  const entries = useResumeStore(
    (state) => state.resume.projects,
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
    updates: Partial<Project>,
  ) => {
    const nextEntries = entries.map((entry) =>
      entry.id === id
        ? { ...entry, ...updates }
        : entry,
    )

    updateResume({
      projects: nextEntries,
    })
  }

  const addProject = () => {
    updateResume({
      projects: [
        ...entries,
        createProject(),
      ],
    })
  }

  const removeProject = (id: string) => {
    updateResume({
      projects: entries.filter(
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
        projectItemSchema.safeParse(entry)

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
      projects: [],
    })

    nextStep()
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">
        Add projects that demonstrate your skills and practical work.
      </p>

      {entries.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-sm font-medium text-slate-700">
            No projects added yet.
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
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">
                Project {index + 1}
              </h3>

              <button
                type="button"
                onClick={() =>
                  removeProject(entry.id)
                }
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>

            <div className="space-y-5">
              <TextInput
                id={`project-name-${entry.id}`}
                label="Project Name"
                placeholder="ResumeForge"
                value={entry.name}
                onChange={(event) =>
                  updateEntry(entry.id, {
                    name: event.target.value,
                  })
                }
                error={entryErrors.name}
              />

              <div className="space-y-2">
                <label
                  htmlFor={`project-description-${entry.id}`}
                  className="block text-sm font-medium text-slate-700"
                >
                  Description
                </label>

                <textarea
                  id={`project-description-${entry.id}`}
                  rows={6}
                  value={entry.description}
                  onChange={(event) =>
                    updateEntry(entry.id, {
                      description:
                        event.target.value,
                    })
                  }
                  placeholder="Describe what you built, the problem it solves, and your contribution."
                  className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              <TextInput
                id={`project-technologies-${entry.id}`}
                label="Technologies"
                placeholder="React, TypeScript, Tailwind CSS, Node.js"
                value={entry.technologies.join(', ')}
                onChange={(event) =>
                  updateEntry(entry.id, {
                    technologies:
                      event.target.value
                        .split(',')
                        .map((item) => item.trim())
                        .filter(Boolean),
                  })
                }
              />

              <TextInput
                id={`project-live-demo-${entry.id}`}
                type="url"
                label="Live Demo URL"
                placeholder="https://example.com"
                value={entry.liveDemoUrl}
                onChange={(event) =>
                  updateEntry(entry.id, {
                    liveDemoUrl:
                      event.target.value,
                  })
                }
              />

              <TextInput
                id={`project-github-${entry.id}`}
                type="url"
                label="GitHub Repository URL"
                placeholder="https://github.com/username/project"
                value={entry.githubUrl}
                onChange={(event) =>
                  updateEntry(entry.id, {
                    githubUrl:
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
        onClick={addProject}
        className="w-full rounded-lg border border-dashed border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        + Add Project
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

export default ProjectsStep