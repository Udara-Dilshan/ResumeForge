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

function ModernTemplate({ resume }: Props) {
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
    <div className="bg-white p-10 text-slate-900">
      <header className="flex items-start gap-6 border-b-4 border-slate-900 pb-6">
        {personalInfo.photo && (
          <img
            src={personalInfo.photo.dataUrl}
            alt=""
            className="h-24 w-24 shrink-0 rounded-full object-cover"
          />
        )}

        <div className="min-w-0 flex-1">
          <h1 className="text-4xl font-bold">
            {personalInfo.fullName || 'Your Name'}
          </h1>

          <p className="mt-2 text-lg text-slate-600">
            {personalInfo.professionalTitle ||
              'Professional Title'}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
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
      </header>

      {summary.content && (
        <section className="mt-7">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em]">
            Profile
          </h2>

          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
            {summary.content}
          </p>
        </section>
      )}

      <div className="mt-7 grid gap-8 md:grid-cols-[1.7fr_1fr]">
        <div className="min-w-0">
          {experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em]">
                Experience
              </h2>

              <div className="mt-4 space-y-6">
                {experience.map((item) => (
                  <article key={item.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-semibold">
                          {item.jobTitle}
                        </h3>

                        <p className="text-sm text-slate-600">
                          {item.company}
                          {item.location &&
                            ` • ${item.location}`}
                        </p>
                      </div>

                      <p className="shrink-0 text-right text-xs text-slate-400">
                        {formatDate(item.startDate)} —{' '}
                        {item.currentlyWorking
                          ? 'Present'
                          : formatDate(item.endDate)}
                      </p>
                    </div>

                    {item.description && (
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
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
            <section className="mt-7">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em]">
                Education
              </h2>

              <div className="mt-4 space-y-5">
                {education.map((item) => (
                  <article key={item.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-semibold">
                          {item.degree}
                        </h3>

                        <p className="text-sm text-slate-600">
                          {item.institution}
                          {item.location &&
                            ` • ${item.location}`}
                        </p>
                      </div>

                      <p className="shrink-0 text-right text-xs text-slate-400">
                        {formatDate(item.startDate)} —{' '}
                        {item.currentlyStudying
                          ? 'Present'
                          : formatDate(item.endDate)}
                      </p>
                    </div>

                    {item.description && (
                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="mt-7">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em]">
                Projects
              </h2>

              <div className="mt-4 space-y-5">
                {projects.map((project) => (
                  <article key={project.id}>
                    <h3 className="font-semibold">
                      {project.name}
                    </h3>

                    {project.description && (
                      <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-600">
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

                    <div className="mt-2 flex flex-wrap gap-3 text-xs">
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-500 underline hover:text-slate-900"
                        >
                          Live Demo
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-500 underline hover:text-slate-900"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="min-w-0">
          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em]">
                Skills
              </h2>

              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section className="mt-7">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em]">
                Certifications
              </h2>

              <div className="mt-3 space-y-4">
                {certifications.map((item) => (
                  <div key={item.id}>
                    <p className="text-sm font-semibold">
                      {item.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {item.issuer}
                    </p>

                    {item.issueDate && (
                      <p className="text-xs text-slate-400">
                        {formatDate(item.issueDate)}
                      </p>
                    )}

                    {item.credentialUrl && (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-slate-500 underline"
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
            <section className="mt-7">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em]">
                Languages
              </h2>

              <div className="mt-3 space-y-2 text-sm">
                {languages.map((item) => (
                  <p key={item.id}>
                    <span className="font-medium">
                      {item.language}
                    </span>{' '}
                    <span className="text-slate-500">
                      — {item.proficiency}
                    </span>
                  </p>
                ))}
              </div>
            </section>
          )}

          {showReferences && references.length > 0 && (
            <section className="mt-7">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em]">
                References
              </h2>

              <div className="mt-3 space-y-4">
                {references.map((item) => (
                  <div key={item.id}>
                    <p className="font-semibold">
                      {item.fullName}
                    </p>

                    <p className="text-xs text-slate-500">
                      {item.jobTitle}
                      {item.company &&
                        ` • ${item.company}`}
                    </p>

                    {item.relationship && (
                      <p className="text-xs text-slate-400">
                        {item.relationship}
                      </p>
                    )}

                    {item.email && (
                      <p className="text-xs text-slate-500">
                        {item.email}
                      </p>
                    )}

                    {item.phoneNumber && (
                      <p className="text-xs text-slate-500">
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
            className="mt-7"
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.2em]">
              {section.title}
            </h2>

            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
              {section.content}
            </p>
          </section>
        ))}
    </div>
  )
}

export default ModernTemplate
