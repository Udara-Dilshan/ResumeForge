import { useResumeStore } from '../../store/resumeStore'

function ResumePreview() {
  const resume = useResumeStore((state) => state.resume)

  const { personalInfo, summary } = resume

  return (
    <div className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white p-10 shadow-xl">
      <header className="border-b border-slate-200 pb-6">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold text-slate-900">
              {personalInfo.fullName || 'Your Name'}
            </h1>

            <p className="mt-2 text-lg text-slate-600">
              {personalInfo.professionalTitle || 'Professional Title'}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
              {personalInfo.email && (
                <span>{personalInfo.email}</span>
              )}

              {personalInfo.phoneNumber && (
                <span>
                  {personalInfo.phoneCountryCode}{' '}
                  {personalInfo.phoneNumber}
                </span>
              )}

              {personalInfo.location && (
                <span>{personalInfo.location}</span>
              )}

              {personalInfo.linkedinUrl && (
                <span>LinkedIn</span>
              )}

              {personalInfo.githubUrl && (
                <span>GitHub</span>
              )}

              {personalInfo.portfolioUrl && (
                <span>Portfolio</span>
              )}
            </div>
          </div>

          {personalInfo.photo && (
            <img
              src={personalInfo.photo.dataUrl}
              alt=""
              className="h-24 w-24 shrink-0 rounded-xl object-cover"
            />
          )}
        </div>
      </header>

      {summary.content && (
        <section className="mt-7">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Professional Summary
          </h2>

          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">
            {summary.content}
          </p>
        </section>
      )}

      <section className="mt-7">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
          Experience
        </h2>

        <p className="mt-3 text-sm text-slate-400">
          Experience entries will appear here.
        </p>
      </section>

      <section className="mt-7">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
          Education
        </h2>

        <p className="mt-3 text-sm text-slate-400">
          Education entries will appear here.
        </p>
      </section>
    </div>
  )
}

export default ResumePreview