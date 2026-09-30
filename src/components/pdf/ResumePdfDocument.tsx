import {
  Document,
  Image,
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
    paddingTop: 36,
    paddingBottom: 36,
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 9,
    color: '#111827',
    lineHeight: 1.35,
  },

  /* ================= HEADER ================= */

  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#111827',
    paddingBottom: 14,
    marginBottom: 16,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  headerText: {
    flex: 1,
    paddingRight: 14,
  },

  profileImage: {
    width: 76,
    height: 76,
    borderRadius: 8,
    objectFit: 'cover',
    flexShrink: 0,
  },

  name: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1.15,
  },

  title: {
    fontSize: 11,
    lineHeight: 1.35,
    marginTop: 7,
    color: '#475569',
  },

  contact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 9,
    gap: 7,
    fontSize: 8,
    lineHeight: 1.3,
    color: '#64748b',
  },

  /* ================= SECTIONS ================= */

  section: {
    marginTop: 14,
  },

  sectionHeader: {
    marginBottom: 7,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingBottom: 3,
  },

  /* ================= ENTRIES ================= */

  entry: {
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  mainColumn: {
    flex: 1,
    paddingRight: 8,
  },

  date: {
    width: 82,
    flexShrink: 0,
    textAlign: 'right',
    fontSize: 8,
    color: '#64748b',
  },

  heading: {
    fontSize: 9.5,
    fontWeight: 700,
    lineHeight: 1.3,
  },

  muted: {
    color: '#64748b',
    lineHeight: 1.35,
  },

  small: {
    fontSize: 8,
    lineHeight: 1.3,
  },

  bodyText: {
    fontSize: 9,
    lineHeight: 1.4,
  },

  /* ================= BULLETS ================= */

  bulletList: {
    marginTop: 4,
  },

  bullet: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 2,
  },

  bulletMark: {
    width: 9,
    flexShrink: 0,
    fontSize: 9,
  },

  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.35,
  },

  /* ================= COMPACT ================= */

  compactColumns: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  compactLeft: {
    width: '68%',
    paddingRight: 10,
  },

  compactRight: {
    width: '32%',
    paddingLeft: 10,
  },

  skillText: {
    fontSize: 8,
    color: '#475569',
    lineHeight: 1.5,
  },
})

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

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  title,
}: {
  title: string
}) {
  return (
    <View
      style={styles.sectionHeader}
      wrap={false}
    >
      <Text style={styles.sectionTitle}>
        {title}
      </Text>
    </View>
  )
}

/* =========================================================
   BULLET LIST

   Each bullet is kept together so one bullet does not
   split between two PDF pages.
========================================================= */

function BulletList({
  text,
}: {
  text: string
}) {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length === 0) {
    return null
  }

  return (
    <View style={styles.bulletList}>
      {lines.map((line, index) => (
        <View
          key={`${index}-${line}`}
          style={styles.bullet}
          wrap={false}
        >
          <Text style={styles.bulletMark}>
            •
          </Text>

          <Text style={styles.bulletText}>
            {line}
          </Text>
        </View>
      ))}
    </View>
  )
}

/* =========================================================
   EXPERIENCE ENTRY
========================================================= */

function ExperienceEntry({
  item,
}: {
  item: Resume['experience'][number]
}) {
  return (
    <View style={styles.entry}>
      <View
        style={styles.row}
        wrap={false}
      >
        <View style={styles.mainColumn}>
          <Text style={styles.heading}>
            {item.jobTitle}
          </Text>

          <Text style={styles.muted}>
            {item.company}

            {item.location
              ? ` • ${item.location}`
              : ''}
          </Text>
        </View>

        <Text style={styles.date}>
          {formatDate(item.startDate)}
          {' — '}
          {item.currentlyWorking
            ? 'Present'
            : formatDate(item.endDate)}
        </Text>
      </View>

      {item.description && (
        <BulletList
          text={item.description}
        />
      )}
    </View>
  )
}

/* =========================================================
   EDUCATION ENTRY
========================================================= */
function EducationEntry({
  item,
}: {
  item: Resume['education'][number]
}) {
  const descriptionLines = item.description
    .split('\n')
    .map((line) =>
      line
        .replace(/^[\s\p{Cc}\p{Cf}ª¤•●◦▪▫■□►▸‣–—-]+/u, '')
        .trim(),
    )
    .filter(Boolean)

  return (
    <View style={styles.entry}>
      <View
        style={styles.row}
        wrap={false}
      >
        <View style={styles.mainColumn}>
          <Text style={styles.heading}>
            {item.degree}
          </Text>

          <Text style={styles.muted}>
            {item.institution}

            {item.location
              ? ` • ${item.location}`
              : ''}
          </Text>
        </View>

        <Text style={styles.date}>
          {formatDate(item.startDate)}
          {' — '}
          {item.currentlyStudying
            ? 'Present'
            : formatDate(item.endDate)}
        </Text>
      </View>

      {descriptionLines.length > 0 && (
        <View style={styles.bulletList}>
          {descriptionLines.map(
            (line, index) => (
              <View
                key={`${item.id}-${index}`}
                style={styles.bullet}
                wrap={false}
              >
                <Text
                  style={styles.bulletMark}
                >
                  •
                </Text>

                <Text
                  style={styles.bulletText}
                >
                  {line}
                </Text>
              </View>
            ),
          )}
        </View>
      )}
    </View>
  )
}

/* =========================================================
   PROJECT ENTRY
========================================================= */

function ProjectEntry({
  project,
}: {
  project: Resume['projects'][number]
}) {
  return (
    <View style={styles.entry}>
      <Text style={styles.heading}>
        {project.name}
      </Text>

      {project.description && (
        <Text
          style={{
            ...styles.bodyText,
            marginTop: 4,
          }}
        >
          {project.description}
        </Text>
      )}

      {project.technologies.length > 0 && (
        <Text
          style={{
            ...styles.small,
            marginTop: 4,
          }}
        >
          Technologies:{' '}
          {project.technologies.join(
            ', ',
          )}
        </Text>
      )}
    </View>
  )
}

/* =========================================================
   PDF DOCUMENT
========================================================= */

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

  const isCompact =
    template === 'compact'

  const isModern =
    template === 'modern'

  const showProfilePhoto =
    template !== 'ats-classic' &&
    Boolean(personalInfo.photo?.dataUrl)

  return (
    <Document
      title={`${personalInfo.fullName || 'Resume'} Resume`}
      author={
        personalInfo.fullName ||
        'ResumeForge'
      }
      subject="Resume"
    >
      <Page
        size="A4"
        style={styles.page}
        wrap
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <View
          style={styles.header}
          wrap={false}
        >
          <View style={styles.headerRow}>
            <View style={styles.headerText}>
              <Text
                style={{
                  ...styles.name,
                  fontSize: isCompact
                    ? 22
                    : isModern
                      ? 26
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
                    src={
                      personalInfo.linkedinUrl
                    }
                  >
                    <Text>LinkedIn</Text>
                  </Link>
                )}

                {personalInfo.githubUrl && (
                  <Link
                    src={
                      personalInfo.githubUrl
                    }
                  >
                    <Text>GitHub</Text>
                  </Link>
                )}

                {personalInfo.portfolioUrl && (
                  <Link
                    src={
                      personalInfo.portfolioUrl
                    }
                  >
                    <Text>Portfolio</Text>
                  </Link>
                )}
              </View>
            </View>

            {showProfilePhoto &&
              personalInfo.photo?.dataUrl && (
                <Image
                  src={
                    personalInfo.photo.dataUrl
                  }
                  style={styles.profileImage}
                />
              )}
          </View>
        </View>

        {/* =================================================
            SUMMARY

            Entire small section stays together.
        ================================================= */}

        {summary.content && (
          <View
            style={styles.section}
            wrap={false}
          >
            <SectionTitle
              title="Professional Summary"
            />

            <Text style={styles.bodyText}>
              {summary.content}
            </Text>
          </View>
        )}

        {/* =================================================
            EXPERIENCE

            Heading + first item stay together.
            Other entries flow normally.
        ================================================= */}

        {experience.length > 0 && (
          <View style={styles.section}>

            <View wrap={false}>
              <SectionTitle title="Experience" />

              <ExperienceEntry
                item={experience[0]}
              />
            </View>

            {experience
              .slice(1)
              .map((item) => (
                <ExperienceEntry
                  key={item.id}
                  item={item}
                />
              ))}
          </View>
        )}

        {/* =================================================
            EDUCATION
        ================================================= */}

        {education.length > 0 && (
          <View style={styles.section}>

            <View wrap={false}>
              <SectionTitle title="Education" />

              <EducationEntry
                item={education[0]}
              />
            </View>

            {education
              .slice(1)
              .map((item) => (
                <EducationEntry
                  key={item.id}
                  item={item}
                />
              ))}
          </View>
        )}

        {/* =================================================
            PROJECTS

            This specifically prevents:

            PROJECTS
            ----------
            [page break]
            Project 1
        ================================================= */}

        {projects.length > 0 && (
          <View style={styles.section}>

            <View wrap={false}>
              <SectionTitle title="Projects" />

              <ProjectEntry
                project={projects[0]}
              />
            </View>

            {projects
              .slice(1)
              .map((project) => (
                <ProjectEntry
                  key={project.id}
                  project={project}
                />
              ))}
          </View>
        )}

        {/* =================================================
            COMPACT TEMPLATE
        ================================================= */}

        {isCompact ? (
          <View style={styles.compactColumns}>

            <View style={styles.compactLeft}>
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
                    <SectionTitle
                      title={
                        section.title
                      }
                    />

                    <Text
                      style={
                        styles.bodyText
                      }
                    >
                      {section.content}
                    </Text>
                  </View>
                ))}
            </View>

            <View style={styles.compactRight}>

              {/* Skills */}
              {skills.length > 0 && (
                <View
                  style={styles.section}
                >
                  <SectionTitle title="Skills" />

                  <Text
                    style={
                      styles.skillText
                    }
                  >
                    {skills.join(', ')}
                  </Text>
                </View>
              )}

              {/* Certifications */}
              {certifications.length >
                0 && (
                <View
                  style={styles.section}
                >
                  <View wrap={false}>
                    <SectionTitle
                      title="Certifications"
                    />

                    {certifications[0] && (
                      <View
                        style={
                          styles.entry
                        }
                      >
                        <Text
                          style={
                            styles.heading
                          }
                        >
                          {
                            certifications[0]
                              .name
                          }
                        </Text>

                        <Text
                          style={
                            styles.muted
                          }
                        >
                          {
                            certifications[0]
                              .issuer
                          }
                        </Text>

                        <Text
                          style={
                            styles.small
                          }
                        >
                          {formatDate(
                            certifications[0]
                              .issueDate,
                          )}
                        </Text>
                      </View>
                    )}
                  </View>

                  {certifications
                    .slice(1)
                    .map(
                      (item) => (
                        <View
                          key={item.id}
                          style={
                            styles.entry
                          }
                        >
                          <Text
                            style={
                              styles.heading
                            }
                          >
                            {item.name}
                          </Text>

                          <Text
                            style={
                              styles.muted
                            }
                          >
                            {item.issuer}
                          </Text>

                          <Text
                            style={
                              styles.small
                            }
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

              {/* Languages */}
              {languages.length > 0 && (
                <View
                  style={styles.section}
                >
                  <SectionTitle
                    title="Languages"
                  />

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

              {/* References */}
              {showReferences &&
                references.length >
                  0 && (
                  <View
                    style={styles.section}
                  >
                    <View wrap={false}>
                      <SectionTitle
                        title="References"
                      />

                      {references[0] && (
                        <View
                          style={
                            styles.entry
                          }
                        >
                          <Text
                            style={
                              styles.heading
                            }
                          >
                            {
                              references[0]
                                .fullName
                            }
                          </Text>

                          <Text
                            style={
                              styles.muted
                            }
                          >
                            {
                              references[0]
                                .jobTitle
                            }
                          </Text>

                          <Text
                            style={
                              styles.small
                            }
                          >
                            {
                              references[0]
                                .email
                            }
                          </Text>
                        </View>
                      )}
                    </View>

                    {references
                      .slice(1)
                      .map(
                        (item) => (
                          <View
                            key={item.id}
                            style={
                              styles.entry
                            }
                          >
                            <Text
                              style={
                                styles.heading
                              }
                            >
                              {
                                item.fullName
                              }
                            </Text>

                            <Text
                              style={
                                styles.muted
                              }
                            >
                              {
                                item.jobTitle
                              }
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
            </View>
          </View>
        ) : (
          <>
            {/* =================================================
                SKILLS
            ================================================== */}

            {skills.length > 0 && (
              <View
                style={styles.section}
                wrap={false}
              >
                <SectionTitle title="Skills" />

                <Text
                  style={styles.skillText}
                >
                  {skills.join(' • ')}
                </Text>
              </View>
            )}

            {/* =================================================
                CERTIFICATIONS
            ================================================== */}

            {certifications.length >
              0 && (
              <View style={styles.section}>

                <View wrap={false}>
                  <SectionTitle
                    title="Certifications"
                  />

                  {certifications[0] && (
                    <View
                      style={styles.entry}
                    >
                      <View
                        style={styles.row}
                      >
                        <View
                          style={
                            styles.mainColumn
                          }
                        >
                          <Text
                            style={
                              styles.heading
                            }
                          >
                            {
                              certifications[0]
                                .name
                            }
                          </Text>

                          <Text
                            style={
                              styles.muted
                            }
                          >
                            {
                              certifications[0]
                                .issuer
                            }
                          </Text>
                        </View>

                        <Text
                          style={
                            styles.date
                          }
                        >
                          {formatDate(
                            certifications[0]
                              .issueDate,
                          )}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>

                {certifications
                  .slice(1)
                  .map(
                    (item) => (
                      <View
                        key={item.id}
                        style={
                          styles.entry
                        }
                      >
                        <View
                          style={styles.row}
                        >
                          <View
                            style={
                              styles.mainColumn
                            }
                          >
                            <Text
                              style={
                                styles.heading
                              }
                            >
                              {item.name}
                            </Text>

                            <Text
                              style={
                                styles.muted
                              }
                            >
                              {item.issuer}
                            </Text>
                          </View>

                          <Text
                            style={
                              styles.date
                            }
                          >
                            {formatDate(
                              item.issueDate,
                            )}
                          </Text>
                        </View>

                        {item.credentialUrl && (
                          <Link
                            src={
                              item.credentialUrl
                            }
                          >
                            <Text
                              style={{
                                ...styles.small,
                                marginTop: 2,
                              }}
                            >
                              Credential
                            </Text>
                          </Link>
                        )}
                      </View>
                    ),
                  )}
              </View>
            )}

            {/* =================================================
                LANGUAGES
            ================================================== */}

            {languages.length > 0 && (
              <View
                style={styles.section}
                wrap={false}
              >
                <SectionTitle
                  title="Languages"
                />

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

            {/* =================================================
                REFERENCES
            ================================================== */}

            {showReferences &&
              references.length >
                0 && (
                <View style={styles.section}>

                  <View wrap={false}>
                    <SectionTitle
                      title="References"
                    />

                    {references[0] && (
                      <View
                        style={
                          styles.entry
                        }
                      >
                        <Text
                          style={
                            styles.heading
                          }
                        >
                          {
                            references[0]
                              .fullName
                          }
                        </Text>

                        <Text
                          style={
                            styles.muted
                          }
                        >
                          {
                            references[0]
                              .jobTitle
                          }

                          {references[0]
                            .company
                            ? ` • ${references[0].company}`
                            : ''}
                        </Text>

                        <Text
                          style={
                            styles.small
                          }
                        >
                          {
                            references[0]
                              .email
                          }
                        </Text>
                      </View>
                    )}
                  </View>

                  {references
                    .slice(1)
                    .map(
                      (item) => (
                        <View
                          key={item.id}
                          style={
                            styles.entry
                          }
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

            {/* =================================================
                CUSTOM SECTIONS
            ================================================== */}

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
                  <View wrap={false}>
                    <SectionTitle
                      title={
                        section.title
                      }
                    />

                    <Text
                      style={
                        styles.bodyText
                      }
                    >
                      {section.content}
                    </Text>
                  </View>
                </View>
              ))}
          </>
        )}
      </Page>
    </Document>
  )
}

export default ResumePdfDocument