import ResumeWizard from '../components/wizard/ResumeWizard'

function BuilderPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <ResumeWizard />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-100 p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Live Preview
            </h2>

            <p className="text-sm text-slate-500">
              Your resume preview will appear here.
            </p>
          </div>

          <div className="mx-auto aspect-[210/297] w-full max-w-[600px] bg-white p-8 shadow-lg">
            <div className="border-b border-slate-200 pb-4">
              <div className="h-6 w-48 rounded bg-slate-200" />
              <div className="mt-2 h-4 w-32 rounded bg-slate-100" />
            </div>

            <div className="mt-6 space-y-3">
              <div className="h-4 w-24 rounded bg-slate-200" />
              <div className="h-3 w-full rounded bg-slate-100" />
              <div className="h-3 w-5/6 rounded bg-slate-100" />
              <div className="h-3 w-4/6 rounded bg-slate-100" />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default BuilderPage