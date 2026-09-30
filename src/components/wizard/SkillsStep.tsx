import { useState } from 'react'
import type { ChangeEvent } from 'react'

import TextInput from '../ui/TextInput'
import WizardNavigation from './WizardNavigation'
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

  const updateSkills = (nextValue: string) => {
    const parsedSkills = nextValue
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean)

    updateResume({
      skills: parsedSkills,
    })
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const nextValue = event.target.value

    setValue(nextValue)
    updateSkills(nextValue)

    if (error) {
      setError('')
    }
  }

  const handleNext = () => {
    updateSkills(value)
    setError('')
    nextStep()
  }

  const handleSkip = () => {
    setValue('')
    setError('')

    updateResume({
      skills: [],
    })

    nextStep()
  }

  const previewSkills = value
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Skills
        </h2>

        <p className="mt-1 text-sm text-slate-500">
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

      {previewSkills.length > 0 && (
        <div>
          <p className="mb-3 text-sm font-medium text-slate-700">
            Preview
          </p>

          <div className="flex flex-wrap gap-2">
            {previewSkills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <WizardNavigation
        onBack={previousStep}
        onNext={handleNext}
        onSkip={handleSkip}
        showSkip
      />
    </div>
  )
}

export default SkillsStep