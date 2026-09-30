import type { Resume } from '../../../types/resume'

interface Props {
  resume: Resume
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
            className="h-24 w-24 rounded-full object-cover"
          />
        )}

        <div>
          <h1 className="text-4xl font-bold">
            {personalInfo.fullName || 'Your Name'}
          </h1>

          <p className="mt-2 text-lg text-slate-600">
            {personalInfo.professionalTitle ||
              'Professional Title'}
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
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
        </div>
      </header>

      {summary.content && (
        <section className="mt-7">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em]">
            Profile
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {summary.content}
          </p>
        </section>
      )}

      <div className="mt-7 grid gap-8 md:grid-cols-[1.7fr_1fr]">
        <div>
          {experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em]">
                Experience
              </h2>

              <div className="mt-4 space-y-6">
                {experience.map((item) => (
                  <article key={item.id}>
                    <h3 className="font-semibold">
                      {item.jobTitle}
                    </h3>

                    <p className="text-sm text-slate-600">
                      {item.company}
                      {item.location &&
                        ` • ${item.location}`}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {item.startDate ?? ''} —{' '}
                      {item.currentlyWorking
                        ? 'Present'
                        : item.endDate ?? ''}
                    </p>

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

          {projects.length > 0 && (
            <section className="mt-7">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em]">
                Projects
              </h2>

              <div className="mt-4 space-y-4">
                {projects.map((project) => (
                  <article key={project.id}>
                    <h3 className="font-semibold">
                      {project.name}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {project.description}
                    </p>
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

              <div className="mt-4 space-y-4">
                {education.map((item) => (
                  <article key={item.id}>
                    <h3 className="font-semibold">
                      {item.degree}
                    </h3>

                    <p className="text-sm text-slate-600">
                      {item.institution}
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
              <h2 className="text-sm font-bold uppercase tracking-[0.2em]">
                Skills
              </h2>

              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
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

              <div className="mt-3 space-y-3">
                {certifications.map((item) => (
                  <div key={item.id}>
                    <p className="text-sm font-semibold">
                      {item.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {item.issuer}
                    </p>
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
                    {item.language} —{' '}
                    {item.proficiency}
                  </p>
                ))}
              </div>
            </section>
          )}

          {showReferences &&
            references.length > 0 && (
              <section className="mt-7">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em]">
                  References
                </h2>

                <div className="mt-3 space-y-3 text-sm">
                  {references.map((item) => (
                    <div key={item.id}>
                      <p className="font-semibold">
                        {item.fullName}
                      </p>

                      <p className="text-xs text-slate-500">
                        {item.jobTitle}
                      </p>

                      <p className="text-xs text-slate-500">
                        {item.email}
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