import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { summarySchema, type SummaryFormData } from '../../schemas/summarySchema'
import { useResumeStore } from '../../store/resumeStore'

function SummaryStep() {
  const summary = useResumeStore((state) => state.resume.summary)
  const updateResume = useResumeStore((state) => state.updateResume)
  const previousStep = useResumeStore((state) => state.previousStep)
  const nextStep = useResumeStore((state) => state.nextStep)

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              placeholder="Write a concise summary of your professional background, skills, and goals."
              className={`w-full resize-none rounded-lg border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                errors.content
                  ? 'border-red-400 focus:ring-red-100'
                  : 'border-slate-300 focus:border-slate-500 focus:ring-slate-100'
              }`}
            />

            {errors.content && (
              <p className="text-sm text-red-600" role="alert">
                {errors.content.message}
              </p>
            )}
          </div>
        )}
      />

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
            onClick={skipStep}
            className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Skip for now
          </button>

          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  )
}

export default SummaryStep