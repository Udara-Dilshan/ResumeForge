import { useState } from 'react'

import { useResumeStore } from '../../store/resumeStore'

function formatSavedTime(date: string) {
  if (!date) {
    return 'Not saved yet'
  }

  return new Date(date).toLocaleTimeString(
    'en-US',
    {
      hour: '2-digit',
      minute: '2-digit',
    },
  )
}

function Header() {
  const resume = useResumeStore(
    (state) => state.resume,
  )

  const resetResume = useResumeStore(
    (state) => state.resetResume,
  )

  const [showResetConfirm, setShowResetConfirm] =
    useState(false)

  const handleReset = () => {
    resetResume()
    setShowResetConfirm(false)
  }

  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              ResumeForge
            </h1>

            <p className="text-sm text-slate-500">
              Build a professional resume
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-slate-500 sm:block">
              Saved{' '}
              {formatSavedTime(
                resume.updatedAt,
              )}
            </span>

            <button
              type="button"
              onClick={() =>
                setShowResetConfirm(true)
              }
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              New Resume
            </button>
          </div>
        </div>
      </header>

      {showResetConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2
              id="reset-title"
              className="text-xl font-bold text-slate-900"
            >
              Create a new resume?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Your current resume data will be
              cleared from ResumeForge.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setShowResetConfirm(false)
                }
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Create New Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header