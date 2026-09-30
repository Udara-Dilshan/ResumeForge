import { useResumeStore } from '../../store/resumeStore'

function formatDate(date: string | null) {
  if (!date) {
    return ''
  }

  const [year, month] = date.split('-')

  const dateObject = new Date(
    Number(year),
    Number(month) - 1,
  )

  return dateObject.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

function ResumePreview() {
  const resume = useResumeStore((state) => state.resume)

  const {
    personalInfo,
    summary,
    experience,
    education,
    projects,
    skills,
    certifications,
    languages,
    references,
    showReferences,
    customSections,
  } = resume

  return (
    <div className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white p-10 shadow-xl">
      {/* Header */}
      <header className="border-b border-slate-200 pb-6">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h1 className="break-words text-3xl font-bold text-slate-900">
              {personalInfo.fullName || 'Your Name'}
            </h1>

            <p className="mt-2 text-lg text-slate-600">
              {personalInfo.professionalTitle ||
                'Professional Title'}
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
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900"
                >
                  LinkedIn
                </a>
              )}

              {personalInfo.githubUrl && (
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900"
                >
                  GitHub
                </a>
              )}

              {personalInfo.portfolioUrl && (
                <a
                  href={personalInfo.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900"
                >
                  Portfolio
                </a>
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

      {/* Summary */}
      {summary.content && (
        <section className="mt-7">
          <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-slate-900">
            Professional Summary
          </h2>

          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">
            {summary.content}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mt-7">
          <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-slate-900">
            Experience
          </h2>

          <div className="mt-4 space-y-6">
            {experience.map((item) => (
              <article key={item.id}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900">
                      {item.jobTitle}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      {item.company}
                      {item.location && (
                        <> • {item.location}</>
                      )}
                    </p>
                  </div>

                  <p className="shrink-0 text-right text-xs text-slate-500">
                    {formatDate(item.startDate)}
                    {' — '}
                    {item.currentlyWorking
                      ? 'Present'
                      : formatDate(item.endDate)}
                  </p>
                </div>

                {item.description && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
                    {item.description
                      .split('\n')
                      .map((line) => line.trim())
                      .filter(Boolean)
                      .map((line, index) => (
                        <li key={`${item.id}-${index}`}>
                          {line}
                        </li>
                      ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mt-7">
          <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-slate-900">
            Education
          </h2>

          <div className="mt-4 space-y-5">
            {education.map((item) => (
              <article key={item.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {item.degree}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      {item.institution}
                      {item.location && (
                        <> • {item.location}</>
                      )}
                    </p>
                  </div>

                  <p className="shrink-0 text-right text-xs text-slate-500">
                    {formatDate(item.startDate)}
                    {' — '}
                    {item.currentlyStudying
                      ? 'Present'
                      : formatDate(item.endDate)}
                  </p>
                </div>

                {item.description && (
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                    {item.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mt-7">
          <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-slate-900">
            Projects
          </h2>

          <div className="mt-4 space-y-5">
            {projects.map((project) => (
              <article key={project.id}>
                <h3 className="font-semibold text-slate-900">
                  {project.name}
                </h3>

                {project.description && (
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                    {project.description}
                  </p>
                )}

                {project.technologies.length > 0 && (
                  <p className="mt-2 text-xs text-slate-500">
                    <span className="font-semibold">
                      Technologies:
                    </span>{' '}
                    {project.technologies.join(', ')}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mt-7">
          <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-slate-900">
            Skills
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mt-7">
          <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-slate-900">
            Certifications
          </h2>

          <div className="mt-4 space-y-4">
            {certifications.map((item) => (
              <article key={item.id}>
                <h3 className="font-semibold text-slate-900">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  {item.issuer}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {formatDate(item.issueDate)}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mt-7">
          <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-slate-900">
            Languages
          </h2>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {languages.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm"
              >
                <span className="font-medium text-slate-800">
                  {item.language}
                </span>

                <span className="text-slate-500">
                  {item.proficiency}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {showReferences && references.length > 0 && (
        <section className="mt-7">
          <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-slate-900">
            References
          </h2>

          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {references.map((item) => (
              <article key={item.id}>
                <h3 className="font-semibold text-slate-900">
                  {item.fullName}
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  {item.jobTitle}
                  {item.company && <> • {item.company}</>}
                </p>

                {item.relationship && (
                  <p className="mt-1 text-xs text-slate-500">
                    {item.relationship}
                  </p>
                )}

                {item.email && (
                  <p className="mt-1 text-xs text-slate-500">
                    {item.email}
                  </p>
                )}

                {item.phoneNumber && (
                  <p className="text-xs text-slate-500">
                    {item.phoneCountryCode}{' '}
                    {item.phoneNumber}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections
        .filter((section) => section.showOnResume)
        .map((section) => (
          <section
            key={section.id}
            className="mt-7"
          >
            <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-slate-900">
              {section.title}
            </h2>

            {section.content && (
              <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">
                {section.content}
              </p>
            )}
          </section>
        ))}
    </div>
  )
}

export default ResumePreview