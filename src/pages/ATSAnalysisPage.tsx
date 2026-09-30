import { useMemo, useState } from 'react'

import {
  analyzeResume,
  matchJobDescription,
} from '../services/atsService'

import { useResumeStore } from '../store/resumeStore'

function ATSAnalysisPage() {
  const resume = useResumeStore(
    (state) => state.resume,
  )

  const goToStep = useResumeStore(
    (state) => state.goToStep,
  )

  const analysis = useMemo(
    () => analyzeResume(resume),
    [resume],
  )

  const [jobDescription, setJobDescription] =
    useState('')

  const keywordResult = useMemo(
    () =>
      matchJobDescription(
        resume,
        jobDescription,
      ),
    [resume, jobDescription],
  )

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-500">
          ATS Analysis
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Resume Analysis
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          These are transparent ResumeForge checks. They are not an exact score used by every ATS.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Analysis */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">
                Rules passed
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                {analysis.passedCount}
                <span className="text-lg font-medium text-slate-400">
                  {' '}
                  / {analysis.totalCount}
                </span>
              </p>
            </div>

            <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-slate-900"
                style={{
                  width: `${
                    (analysis.passedCount /
                      analysis.totalCount) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {analysis.checks.map((check) => (
              <div
                key={check.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={[
                      'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                      check.passed
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    {check.passed ? '✓' : '!'}
                  </span>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {check.title}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {check.message}
                    </p>

                    <p className="mt-2 text-xs font-medium text-slate-400">
                      {check.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goToStep(11)}
            className="mt-6 rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Back to Review
          </button>
        </section>

        {/* Job Description Matcher */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-slate-900">
              Job Description Matcher
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Paste a real job description to compare its words with your resume.
            </p>
          </div>

          <textarea
            value={jobDescription}
            onChange={(event) =>
              setJobDescription(
                event.target.value,
              )
            }
            rows={12}
            placeholder={`Example:

React
TypeScript
REST API
Git
Docker
SQL`}
            className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
          />

          {jobDescription.trim() && (
            <div className="mt-6 space-y-5">
              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                  Keyword coverage
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900">
                  {keywordResult.keywordCoverage}%
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Based only on the extracted words from the pasted description.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Matched keywords
                </h3>

                {keywordResult.matchedKeywords.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {keywordResult.matchedKeywords.map(
                      (keyword) => (
                        <span
                          key={keyword}
                          className="rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
                        >
                          ✓ {keyword}
                        </span>
                      ),
                    )}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">
                    No matches found yet.
                  </p>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Missing keywords
                </h3>

                {keywordResult.missingKeywords.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {keywordResult.missingKeywords.map(
                      (keyword) => (
                        <span
                          key={keyword}
                          className="rounded-md bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700"
                        >
                          {keyword}
                        </span>
                      ),
                    )}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">
                    No missing keywords from this simple comparison.
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-sm leading-6 text-slate-600">
                  Only add a missing skill or keyword when it is genuinely supported by your real experience.
                  ResumeForge should never invent qualifications for you.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Continue
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Template selection will be added next.
            </p>
          </div>

          <button
  type="button"
  onClick={() => goToStep(13)}
  className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
>
  Choose Template
</button>
        </div>
      </div>
    </main>
  )
}

export default ATSAnalysisPage