import type { Resume } from '../../../types/resume'

interface Props {
  resume: Resume
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
        </div>
      </header>

      <div className="mt-4 grid grid-cols-[1.5fr_0.8fr] gap-6">
        <div>
          {summary.content && (
            <section>
              <h2 className="text-xs font-bold uppercase">
                Summary
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-600">
                {summary.content}
              </p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="mt-5">
              <h2 className="text-xs font-bold uppercase">
                Experience
              </h2>

              <div className="mt-2 space-y-4">
                {experience.map((item) => (
                  <article key={item.id}>
                    <div className="flex justify-between gap-2">
                      <div>
                        <h3 className="text-xs font-semibold">
                          {item.jobTitle}
                        </h3>

                        <p className="text-[11px] text-slate-600">
                          {item.company}
                        </p>
                      </div>

                      <span className="text-[10px] text-slate-400">
                        {item.startDate ?? ''} —{' '}
                        {item.currentlyWorking
                          ? 'Present'
                          : item.endDate ?? ''}
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
              <h2 className="text-xs font-bold uppercase">
                Education
              </h2>

              <div className="mt-2 space-y-3">
                {education.map((item) => (
                  <article key={item.id}>
                    <h3 className="text-xs font-semibold">
                      {item.degree}
                    </h3>

                    <p className="text-[11px] text-slate-600">
                      {item.institution}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="mt-5">
              <h2 className="text-xs font-bold uppercase">
                Projects
              </h2>

              <div className="mt-2 space-y-3">
                {projects.map((project) => (
                  <article key={project.id}>
                    <h3 className="text-xs font-semibold">
                      {project.name}
                    </h3>

                    <p className="text-[11px] leading-4 text-slate-600">
                      {project.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside>
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase">
                Skills
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-slate-600">
                {skills.join(', ')}
              </p>
            </section>
          )}

          {certifications.length > 0 && (
            <section className="mt-5">
              <h2 className="text-xs font-bold uppercase">
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
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section className="mt-5">
              <h2 className="text-xs font-bold uppercase">
                Languages
              </h2>

              <div className="mt-2 space-y-1 text-[11px]">
                {languages.map((item) => (
                  <p key={item.id}>
                    {item.language}: {item.proficiency}
                  </p>
                ))}
              </div>
            </section>
          )}

          {showReferences &&
            references.length > 0 && (
              <section className="mt-5">
                <h2 className="text-xs font-bold uppercase">
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
                      </p>
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
            <h2 className="text-xs font-bold uppercase">
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