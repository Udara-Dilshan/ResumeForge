import { useState } from 'react'
import TextInput from '../ui/TextInput'
import { useResumeStore } from '../../store/resumeStore'

function SkillsStep() {
  const skills = useResumeStore(
    (state) => state.resume.skills,
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

  const [value, setValue] = useState(
    skills.join(', '),
  )

  const [error, setError] = useState('')

  const handleNext = () => {
    const nextSkills = value
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean)

    updateResume({
      skills: nextSkills,
    })

    setError('')
    nextStep()
  }

  const handleSkip = () => {
    updateResume({
      skills: [],
    })

    setValue('')
    setError('')
    nextStep()
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValue(event.target.value)

    if (error) {
      setError('')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">
          Add your technical and professional skills.
        </p>
      </div>

      <TextInput
        id="skills"
        label="Skills"
        placeholder="React, TypeScript, JavaScript, Git, GitHub, Tailwind CSS"
        value={value}
        onChange={handleChange}
        error={error}
      />

      <div className="rounded-xl bg-slate-50 p-4">
        <p className="text-sm font-medium text-slate-700">
          Separate skills with commas.
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Example: React, TypeScript, Git, Docker
        </p>
      </div>

      {value.trim() && (
        <div>
          <p className="mb-3 text-sm font-medium text-slate-700">
            Preview
          </p>

          <div className="flex flex-wrap gap-2">
            {value
              .split(',')
              .map((skill) => skill.trim())
              .filter(Boolean)
              .map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>
      )}

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

export default SkillsStep