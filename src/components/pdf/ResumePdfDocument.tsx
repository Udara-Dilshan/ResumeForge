import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'

import type { Resume } from '../../types/resume'
import type { ResumeTemplate } from '../../store/resumeStore'

interface Props {
  resume: Resume
  template: ResumeTemplate
}

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 9,
    color: '#111827',
    lineHeight: 1.4,
  },

  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#111827',
    paddingBottom: 12,
    marginBottom: 16,
  },

  name: {
    fontSize: 24,
    fontWeight: 700,
  },

  title: {
    fontSize: 12,
    marginTop: 4,
    color: '#475569',
  },

  contact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    fontSize: 8,
    color: '#64748b',
  },

  section: {
    marginTop: 14,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingBottom: 3,
    marginBottom: 6,
  },

  entry: {
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  heading: {
    fontSize: 9.5,
    fontWeight: 700,
  },

  muted: {
    color: '#64748b',
  },

  small: {
    fontSize: 8,
  },

  bullet: {
    flexDirection: 'row',
    marginTop: 2,
  },

  bulletMark: {
    width: 10,
  },

  bulletText: {
    flex: 1,
  },

  skillText: {
    fontSize: 8,
    color: '#475569',
  },
})

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

function sectionTitle(
  title: string,
) {
  return (
    <Text style={styles.sectionTitle}>
      {title}
    </Text>
  )
}

function ResumePdfDocument({
  resume,
  template,
}: Props) {
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

  const compact =
    template === 'compact'

  const modern =
    template === 'modern'

  return (
    <Document
      title={`${personalInfo.fullName || 'Resume'} Resume`}
      author={personalInfo.fullName || 'ResumeForge'}
    >
      <Page
        size="A4"
        style={{
          ...styles.page,
          fontSize: compact ? 8 : 9,
        }}
        wrap
      >
        <View style={styles.header}>
          <Text
            style={{
              ...styles.name,
              fontSize: compact
                ? 20
                : modern
                  ? 27
                  : 24,
            }}
          >
            {personalInfo.fullName ||
              'Your Name'}
          </Text>

          <Text style={styles.title}>
            {personalInfo.professionalTitle ||
              'Professional Title'}
          </Text>

          <View style={styles.contact}>
            {personalInfo.email && (
              <Link
                src={`mailto:${personalInfo.email}`}
              >
                <Text>
                  {personalInfo.email}
                </Text>
              </Link>
            )}

            {personalInfo.phoneNumber && (
              <Text>
                {personalInfo.phoneCountryCode}{' '}
                {personalInfo.phoneNumber}
              </Text>
            )}

            {personalInfo.location && (
              <Text>
                {personalInfo.location}
              </Text>
            )}

            {personalInfo.linkedinUrl && (
              <Link
                src={personalInfo.linkedinUrl}
              >
                <Text>LinkedIn</Text>
              </Link>
            )}

            {personalInfo.githubUrl && (
              <Link
                src={personalInfo.githubUrl}
              >
                <Text>GitHub</Text>
              </Link>
            )}

            {personalInfo.portfolioUrl && (
              <Link
                src={personalInfo.portfolioUrl}
              >
                <Text>Portfolio</Text>
              </Link>
            )}
          </View>
        </View>

        {summary.content && (
          <View style={styles.section}>
            {sectionTitle(
              'Professional Summary',
            )}

            <Text>
              {summary.content}
            </Text>
          </View>
        )}

        {experience.length > 0 && (
          <View style={styles.section}>
            {sectionTitle('Experience')}

            {experience.map((item) => (
              <View
                key={item.id}
                style={styles.entry}
              >
                <View style={styles.row}>
                  <View>
                    <Text style={styles.heading}>
                      {item.jobTitle}
                    </Text>

                    <Text
                      style={styles.muted}
                    >
                      {item.company}
                      {item.location
                        ? ` • ${item.location}`
                        : ''}
                    </Text>
                  </View>

                  <Text style={styles.small}>
                    {formatDate(
                      item.startDate,
                    )}{' '}
                    —{' '}
                    {item.currentlyWorking
                      ? 'Present'
                      : formatDate(
                          item.endDate,
                        )}
                  </Text>
                </View>

                {item.description &&
                  item.description
                    .split('\n')
                    .map((line) =>
                      line.trim(),
                    )
                    .filter(Boolean)
                    .map(
                      (
                        line,
                        index,
                      ) => (
                        <View
                          key={`${item.id}-${index}`}
                          style={styles.bullet}
                        >
                          <Text
                            style={
                              styles.bulletMark
                            }
                          >
                            •
                          </Text>

                          <Text
                            style={
                              styles.bulletText
                            }
                          >
                            {line}
                          </Text>
                        </View>
                      ),
                    )}
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View style={styles.section}>
            {sectionTitle('Education')}

            {education.map((item) => (
              <View
                key={item.id}
                style={styles.entry}
              >
                <View style={styles.row}>
                  <View>
                    <Text style={styles.heading}>
                      {item.degree}
                    </Text>

                    <Text
                      style={styles.muted}
                    >
                      {item.institution}
                      {item.location
                        ? ` • ${item.location}`
                        : ''}
                    </Text>
                  </View>

                  <Text style={styles.small}>
                    {formatDate(
                      item.startDate,
                    )}{' '}
                    —{' '}
                    {item.currentlyStudying
                      ? 'Present'
                      : formatDate(
                          item.endDate,
                        )}
                  </Text>
                </View>

                {item.description && (
                  <Text>
                    {item.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {projects.length > 0 && (
          <View style={styles.section}>
            {sectionTitle('Projects')}

            {projects.map((project) => (
              <View
                key={project.id}
                style={styles.entry}
              >
                <Text style={styles.heading}>
                  {project.name}
                </Text>

                {project.description && (
                  <Text>
                    {project.description}
                  </Text>
                )}

                {project.technologies
                  .length > 0 && (
                  <Text
                    style={styles.small}
                  >
                    Technologies:{' '}
                    {project.technologies.join(
                      ', ',
                    )}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {skills.length > 0 && (
          <View style={styles.section}>
            {sectionTitle('Skills')}

            <Text style={styles.skillText}>
              {skills.join(' • ')}
            </Text>
          </View>
        )}

        {certifications.length > 0 && (
          <View style={styles.section}>
            {sectionTitle(
              'Certifications',
            )}

            {certifications.map(
              (item) => (
                <View
                  key={item.id}
                  style={styles.entry}
                >
                  <Text style={styles.heading}>
                    {item.name}
                  </Text>

                  <Text
                    style={styles.muted}
                  >
                    {item.issuer}
                  </Text>

                  <Text
                    style={styles.small}
                  >
                    {formatDate(
                      item.issueDate,
                    )}
                  </Text>
                </View>
              ),
            )}
          </View>
        )}

        {languages.length > 0 && (
          <View style={styles.section}>
            {sectionTitle('Languages')}

            {languages.map(
              (item) => (
                <Text
                  key={item.id}
                >
                  {item.language} —{' '}
                  {item.proficiency}
                </Text>
              ),
            )}
          </View>
        )}

        {showReferences &&
          references.length > 0 && (
            <View style={styles.section}>
              {sectionTitle(
                'References',
              )}

              {references.map(
                (item) => (
                  <View
                    key={item.id}
                    style={styles.entry}
                  >
                    <Text
                      style={
                        styles.heading
                      }
                    >
                      {item.fullName}
                    </Text>

                    <Text
                      style={
                        styles.muted
                      }
                    >
                      {item.jobTitle}
                      {item.company
                        ? ` • ${item.company}`
                        : ''}
                    </Text>

                    <Text
                      style={
                        styles.small
                      }
                    >
                      {item.email}
                    </Text>
                  </View>
                ),
              )}
            </View>
          )}

        {customSections
          .filter(
            (section) =>
              section.showOnResume,
          )
          .map((section) => (
            <View
              key={section.id}
              style={styles.section}
            >
              {sectionTitle(
                section.title,
              )}

              <Text>
                {section.content}
              </Text>
            </View>
          ))}
      </Page>
    </Document>
  )
}

export default ResumePdfDocument