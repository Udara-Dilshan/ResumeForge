import type { Resume } from '../../../types/resume'

interface Props {
  resume: Resume
}

function formatDate(date: string | null) {
  if (!date) {
    return ''
  }

  const [year, month] = date.split('-')

  return new Date(
    Number(year),
    Number(month) - 1,
  ).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

function CompactTemplate({ resume }: Props) {
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
    <div className="bg-white p-8 text-slate-900">
      <header className="border-b border-slate-800 pb-4">
        <div className="flex items-start gap-4">
          {personalInfo.photo && (
            <img
              src={personalInfo.photo.dataUrl}
              alt=""
              className="h-16 w-16 shrink-0 rounded-lg object-cover"
            />
          )}

          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold">
              {personalInfo.fullName || 'Your Name'}
            </h1>

            <p className="text-sm text-slate-600">
              {personalInfo.professionalTitle ||
                'Professional Title'}
            </p>

            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
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
                  className="underline hover:text-slate-900"
                >
                  LinkedIn
                </a>
              )}

              {personalInfo.githubUrl && (
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-slate-900"
                >
                  GitHub
                </a>
              )}

              {personalInfo.portfolioUrl && (
                <a
                  href={personalInfo.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-slate-900"
                >
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="mt-4 grid grid-cols-[1.5fr_0.8fr] gap-6">
        <div className="min-w-0">
          {summary.content && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider">
                Summary
              </h2>

              <p className="mt-1 whitespace-pre-line text-xs leading-5 text-slate-600">
                {summary.content}
              </p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider">
                Experience
              </h2>

              <div className="mt-2 space-y-4">
                {experience.map((item) => (
                  <article key={item.id}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-xs font-semibold">
                          {item.jobTitle}
                        </h3>

                        <p className="text-[11px] text-slate-600">
                          {item.company}
                          {item.location &&
                            ` • ${item.location}`}
                        </p>
                      </div>

                      <span className="shrink-0 text-right text-[10px] text-slate-400">
                        {formatDate(item.startDate)} —{' '}
                        {item.currentlyWorking
                          ? 'Present'
                          : formatDate(item.endDate)}
                      </span>
                    </div>

                    {item.description && (
                      <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-4 text-slate-600">
                        {item.description
                          .split('\n')
                          .map((line) => line.trim())
                          .filter(Boolean)
                          .map((line, index) => (
                            <li
                              key={`${item.id}-${index}`}
                            >
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

          {education.length > 0 && (
            <section className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider">
                Education
              </h2>

              <div className="mt-2 space-y-3">
                {education.map((item) => (
                  <article key={item.id}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-xs font-semibold">
                          {item.degree}
                        </h3>

                        <p className="text-[11px] text-slate-600">
                          {item.institution}
                          {item.location &&
                            ` • ${item.location}`}
                        </p>
                      </div>

                      <span className="shrink-0 text-right text-[10px] text-slate-400">
                        {formatDate(item.startDate)} —{' '}
                        {item.currentlyStudying
                          ? 'Present'
                          : formatDate(item.endDate)}
                      </span>
                    </div>

                    {item.description && (
                      <p className="mt-1 whitespace-pre-line text-[11px] leading-4 text-slate-600">
                        {item.description}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider">
                Projects
              </h2>

              <div className="mt-2 space-y-3">
                {projects.map((project) => (
                  <article key={project.id}>
                    <h3 className="text-xs font-semibold">
                      {project.name}
                    </h3>

                    {project.description && (
                      <p className="mt-1 whitespace-pre-line text-[11px] leading-4 text-slate-600">
                        {project.description}
                      </p>
                    )}

                    {project.technologies.length > 0 && (
                      <p className="mt-1 text-[10px] text-slate-500">
                        <span className="font-semibold">
                          Tech:
                        </span>{' '}
                        {project.technologies.join(', ')}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="min-w-0">
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider">
                Skills
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-slate-600">
                {skills.join(', ')}
              </p>
            </section>
          )}

          {certifications.length > 0 && (
            <section className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider">
                Certifications
              </h2>

              <div className="mt-2 space-y-2">
                {certifications.map((item) => (
                  <div key={item.id}>
                    <p className="text-[11px] font-semibold">
                      {item.name}
                    </p>

                    <p className="text-[10px] text-slate-500">
                      {item.issuer}
                    </p>

                    {item.issueDate && (
                      <p className="text-[10px] text-slate-400">
                        {formatDate(item.issueDate)}
                      </p>
                    )}

                    {item.credentialUrl && (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-slate-500 underline"
                      >
                        Credential
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider">
                Languages
              </h2>

              <div className="mt-2 space-y-1 text-[11px]">
                {languages.map((item) => (
                  <p key={item.id}>
                    <span className="font-medium">
                      {item.language}
                    </span>
                    {': '}
                    <span className="text-slate-500">
                      {item.proficiency}
                    </span>
                  </p>
                ))}
              </div>
            </section>
          )}

          {showReferences && references.length > 0 && (
            <section className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider">
                References
              </h2>

              <div className="mt-2 space-y-2">
                {references.map((item) => (
                  <div key={item.id}>
                    <p className="text-[11px] font-semibold">
                      {item.fullName}
                    </p>

                    <p className="text-[10px] text-slate-500">
                      {item.jobTitle}
                      {item.company &&
                        ` • ${item.company}`}
                    </p>

                    {item.email && (
                      <p className="text-[10px] text-slate-500">
                        {item.email}
                      </p>
                    )}

                    {item.phoneNumber && (
                      <p className="text-[10px] text-slate-500">
                        {item.phoneCountryCode}{' '}
                        {item.phoneNumber}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>

      {customSections
        .filter((section) => section.showOnResume)
        .map((section) => (
          <section
            key={section.id}
            className="mt-5"
          >
            <h2 className="text-xs font-bold uppercase tracking-wider">
              {section.title}
            </h2>

            <p className="mt-1 whitespace-pre-line text-[11px] leading-4 text-slate-600">
              {section.content}
            </p>
          </section>
        ))}
    </div>
  )
}

export default CompactTemplate
