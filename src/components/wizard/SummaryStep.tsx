import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import WizardNavigation from './WizardNavigation'

import {
  summarySchema,
  type SummaryFormData,
} from '../../schemas/summarySchema'

import { useResumeStore } from '../../store/resumeStore'

function SummaryStep() {
  const summary = useResumeStore(
    (state) => state.resume.summary,
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SummaryFormData>({
    resolver: zodResolver(summarySchema),

    defaultValues: {
      content: summary.content,
    },
  })

  const onSubmit = (data: SummaryFormData) => {
    updateResume({
      summary: {
        content: data.content,
      },
    })

    nextStep()
  }

  const skipStep = () => {
    updateResume({
      summary: {
        content: '',
      },
    })

    nextStep()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div>
        <p className="text-sm text-slate-500">
          Write a short professional summary that explains
          who you are and what you can offer.
        </p>
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-800">
          Writing tips
        </p>

        <ul className="mt-2 space-y-1 text-sm text-slate-600">
          <li>• Keep it concise.</li>
          <li>• Mention relevant skills.</li>
          <li>• Mention your experience level.</li>
          <li>• Focus on real strengths.</li>
          <li>• Do not invent achievements.</li>
        </ul>
      </div>

      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-slate-700"
            >
              Professional Summary
            </label>

            <textarea
              id="summary"
              {...field}
              rows={10}
              placeholder="Example: Frontend developer and BICT undergraduate with experience building responsive web applications using React and TypeScript."
              className={[
                'w-full resize-y rounded-lg border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2',
                errors.content
                  ? 'border-red-400 focus:ring-red-100'
                  : 'border-slate-300 focus:border-slate-500 focus:ring-slate-100',
              ].join(' ')}
            />

            <div className="flex items-center justify-between">
              {errors.content ? (
                <p
                  className="text-sm text-red-600"
                  role="alert"
                >
                  {errors.content.message}
                </p>
              ) : (
                <span />
              )}

              <span className="text-xs text-slate-400">
                {field.value.length}/1000
              </span>
            </div>
          </div>
        )}
      />

      <WizardNavigation
        onBack={previousStep}
        onNext={handleSubmit(onSubmit)}
        onSkip={skipStep}
        showSkip
      />
    </form>
  )
}

export default SummaryStep