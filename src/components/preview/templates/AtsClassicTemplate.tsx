import type { Resume } from '../../../types/resume'

interface Props {
  resume: Resume
}

function formatDate(date: string | null) {
  if (!date) return ''

  const [year, month] = date.split('-')

  return new Date(
    Number(year),
    Number(month) - 1,
  ).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

function AtsClassicTemplate({ resume }: Props) {
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
      <header className="border-b-2 border-slate-900 pb-5">
        <h1 className="text-3xl font-bold">
          {personalInfo.fullName || 'Your Name'}
        </h1>

        <p className="mt-1 text-lg">
          {personalInfo.professionalTitle ||
            'Professional Title'}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
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
      </header>

      {summary.content && (
        <section className="mt-6">
          <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase">
            Professional Summary
          </h2>

          <p className="mt-2 whitespace-pre-line text-sm leading-6">
            {summary.content}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mt-6">
          <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase">
            Experience
          </h2>

          <div className="mt-3 space-y-5">
            {experience.map((item) => (
              <article key={item.id}>
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">
                      {item.jobTitle}
                    </h3>

                    <p className="text-sm text-slate-600">
                      {item.company}
                      {item.location &&
                        ` • ${item.location}`}
                    </p>
                  </div>

                  <span className="text-xs text-slate-500">
                    {formatDate(item.startDate)} —{' '}
                    {item.currentlyWorking
                      ? 'Present'
                      : formatDate(item.endDate)}
                  </span>
                </div>

                {item.description && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
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

      {education.length > 0 && (
        <section className="mt-6">
          <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase">
            Education
          </h2>

          <div className="mt-3 space-y-4">
            {education.map((item) => (
              <article key={item.id}>
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">
                      {item.degree}
                    </h3>

                    <p className="text-sm text-slate-600">
                      {item.institution}
                      {item.location &&
                        ` • ${item.location}`}
                    </p>
                  </div>

                  <span className="text-xs text-slate-500">
                    {formatDate(item.startDate)} —{' '}
                    {item.currentlyStudying
                      ? 'Present'
                      : formatDate(item.endDate)}
                  </span>
                </div>

                {item.description && (
                  <p className="mt-2 whitespace-pre-line text-sm leading-6">
                    {item.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mt-6">
          <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase">
            Projects
          </h2>

          <div className="mt-3 space-y-4">
            {projects.map((project) => (
              <article key={project.id}>
                <h3 className="font-semibold">
                  {project.name}
                </h3>

                {project.description && (
                  <p className="mt-1 whitespace-pre-line text-sm leading-6">
                    {project.description}
                  </p>
                )}

                {project.technologies.length > 0 && (
                  <p className="mt-1 text-xs text-slate-600">
                    {project.technologies.join(', ')}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-6">
          <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase">
            Skills
          </h2>

          <p className="mt-2 text-sm leading-6">
            {skills.join(' • ')}
          </p>
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mt-6">
          <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase">
            Certifications
          </h2>

          <div className="mt-3 space-y-3">
            {certifications.map((item) => (
              <article key={item.id}>
                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="text-sm text-slate-600">
                  {item.issuer}
                </p>

                <p className="text-xs text-slate-500">
                  {formatDate(item.issueDate)}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {languages.length > 0 && (
        <section className="mt-6">
          <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase">
            Languages
          </h2>

          <div className="mt-2 space-y-1 text-sm">
            {languages.map((item) => (
              <p key={item.id}>
                <strong>{item.language}</strong> —{' '}
                {item.proficiency}
              </p>
            ))}
          </div>
        </section>
      )}

      {showReferences && references.length > 0 && (
        <section className="mt-6">
          <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase">
            References
          </h2>

          <div className="mt-3 space-y-3">
            {references.map((item) => (
              <article key={item.id}>
                <h3 className="font-semibold">
                  {item.fullName}
                </h3>

                <p className="text-sm text-slate-600">
                  {item.jobTitle} • {item.company}
                </p>

                <p className="text-xs text-slate-500">
                  {item.email}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {customSections
        .filter((section) => section.showOnResume)
        .map((section) => (
          <section
            key={section.id}
            className="mt-6"
          >
            <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase">
              {section.title}
            </h2>

            <p className="mt-2 whitespace-pre-line text-sm leading-6">
              {section.content}
            </p>
          </section>
        ))}
    </div>
  )
}

export default AtsClassicTemplate