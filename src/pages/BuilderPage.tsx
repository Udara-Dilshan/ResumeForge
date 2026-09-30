import { useState } from 'react'

import ResumeWizard from '../components/wizard/ResumeWizard'
import ResumePreview from '../components/preview/ResumePreview'

type MobileView = 'editor' | 'preview'

function BuilderPage() {
  const [mobileView, setMobileView] =
    useState<MobileView>('editor')

  return (
    <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
      {/* Mobile tabs */}
      <div className="mb-4 lg:hidden">
        <div
          className="grid grid-cols-2 rounded-xl border border-slate-200 bg-white p-1"
          role="tablist"
          aria-label="Resume editor and preview"
        >
          <button
            type="button"
            role="tab"
            aria-selected={
              mobileView === 'editor'
            }
            onClick={() =>
              setMobileView('editor')
            }
            className={[
              'rounded-lg px-4 py-2.5 text-sm font-semibold transition',
              mobileView === 'editor'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-50',
            ].join(' ')}
          >
            Edit
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={
              mobileView === 'preview'
            }
            onClick={() =>
              setMobileView('preview')
            }
            className={[
              'rounded-lg px-4 py-2.5 text-sm font-semibold transition',
              mobileView === 'preview'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-50',
            ].join(' ')}
          >
            Preview
          </button>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6">
        {/* Editor */}
        <section
          className={[
            'rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6',
            mobileView === 'editor'
              ? 'block'
              : 'hidden lg:block',
          ].join(' ')}
        >
          <ResumeWizard />
        </section>

        {/* Preview */}
        <section
          className={[
            'rounded-2xl border border-slate-200 bg-slate-100 p-3 sm:p-6',
            mobileView === 'preview'
              ? 'block'
              : 'hidden lg:block',
          ].join(' ')}
        >
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Live Preview
            </h2>

            <p className="text-sm text-slate-500">
              Your resume updates as you edit.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="mx-auto min-w-[320px] w-full max-w-[794px]">
              <ResumePreview />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default BuilderPage