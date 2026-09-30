import type { Resume } from '../types/resume'

export interface ATSCheck {
  id: string
  category:
    | 'Completeness'
    | 'Formatting'
    | 'Readability'
    | 'Contact Information'
    | 'Section Presence'
  passed: boolean
  title: string
  message: string
}

export interface ATSAnalysis {
  checks: ATSCheck[]
  passedCount: number
  totalCount: number
}

export interface KeywordMatchResult {
  matchedKeywords: string[]
  missingKeywords: string[]
  keywordCoverage: number
}

function getResumeText(resume: Resume) {
  const experienceText = resume.experience
    .map(
      (item) =>
        `${item.jobTitle} ${item.company} ${item.location} ${item.description}`,
    )
    .join(' ')

  const educationText = resume.education
    .map(
      (item) =>
        `${item.degree} ${item.institution} ${item.location} ${item.description}`,
    )
    .join(' ')

  const projectText = resume.projects
    .map(
      (item) =>
        `${item.name} ${item.description} ${item.technologies.join(' ')}`,
    )
    .join(' ')

  const certificationText = resume.certifications
    .map(
      (item) =>
        `${item.name} ${item.issuer}`,
    )
    .join(' ')

  const languageText = resume.languages
    .map(
      (item) =>
        `${item.language} ${item.proficiency}`,
    )
    .join(' ')

  const customText = resume.customSections
    .filter((section) => section.showOnResume)
    .map(
      (section) =>
        `${section.title} ${section.content}`,
    )
    .join(' ')

  return [
    resume.personalInfo.fullName,
    resume.personalInfo.professionalTitle,
    resume.personalInfo.location,
    resume.summary.content,
    experienceText,
    educationText,
    projectText,
    resume.skills.join(' '),
    certificationText,
    languageText,
    customText,
  ]
    .join(' ')
    .toLowerCase()
}

function normalizeKeyword(keyword: string) {
  return keyword
    .toLowerCase()
    .replace(/[^\w+#.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractKeywords(text: string) {
  const commonWords = new Set([
    'the',
    'and',
    'for',
    'with',
    'from',
    'that',
    'this',
    'you',
    'your',
    'our',
    'are',
    'will',
    'have',
    'has',
    'was',
    'were',
    'job',
    'role',
    'work',
    'working',
    'team',
    'ability',
    'skills',
    'experience',
    'years',
    'using',
    'use',
    'looking',
    'required',
    'requirements',
    'responsibilities',
  ])

  return Array.from(
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9+#.\s-]/g, ' ')
        .split(/\s+/)
        .map((word) => normalizeKeyword(word))
        .filter(
          (word) =>
            word.length >= 3 &&
            !commonWords.has(word),
        ),
    ),
  )
}

export function analyzeResume(
  resume: Resume,
): ATSAnalysis {
  const checks: ATSCheck[] = []

  const hasName =
    resume.personalInfo.fullName.trim().length > 0

  const hasEmail =
    resume.personalInfo.email.trim().length > 0

  const hasPhone =
    resume.personalInfo.phoneNumber.trim().length > 0

  const hasProfessionalTitle =
    resume.personalInfo.professionalTitle.trim().length > 0

  const hasSummary =
    resume.summary.content.trim().length > 0

  const hasExperience =
    resume.experience.length > 0

  const hasEducation =
    resume.education.length > 0

  const hasSkills =
    resume.skills.length > 0

  const longSummary =
    resume.summary.content.trim().length > 600

  const measurableAchievementExists =
    resume.experience.some((item) =>
      /\b\d+(?:\.\d+)?%|\b\d+\+|\b\d+(?:\.\d+)?\s?(?:x|times)\b/i.test(
        item.description,
      ),
    )

  const allSingleColumnCompatible = true

  checks.push({
    id: 'name',
    category: 'Contact Information',
    passed: hasName,
    title: 'Full name',
    message: hasName
      ? 'Your full name is present.'
      : 'Add your full name.',
  })

  checks.push({
    id: 'email',
    category: 'Contact Information',
    passed: hasEmail,
    title: 'Email address',
    message: hasEmail
      ? 'An email address is present.'
      : 'Add a professional email address.',
  })

  checks.push({
    id: 'phone',
    category: 'Contact Information',
    passed: hasPhone,
    title: 'Phone number',
    message: hasPhone
      ? 'A phone number is present.'
      : 'Add a phone number if it is appropriate for your job search.',
  })

  checks.push({
    id: 'title',
    category: 'Section Presence',
    passed: hasProfessionalTitle,
    title: 'Professional title',
    message: hasProfessionalTitle
      ? 'A professional title is present.'
      : 'Add a clear professional title.',
  })

  checks.push({
    id: 'experience',
    category: 'Section Presence',
    passed: hasExperience,
    title: 'Experience',
    message: hasExperience
      ? 'Experience entries are present.'
      : 'Add relevant experience or use another section to show practical work.',
  })

  checks.push({
    id: 'education',
    category: 'Section Presence',
    passed: hasEducation,
    title: 'Education',
    message: hasEducation
      ? 'Education is present.'
      : 'Add your education.',
  })

  checks.push({
    id: 'skills',
    category: 'Section Presence',
    passed: hasSkills,
    title: 'Skills',
    message: hasSkills
      ? 'Skills are present.'
      : 'Add skills that are genuinely supported by your experience.',
  })

  checks.push({
    id: 'summary',
    category: 'Readability',
    passed: !longSummary,
    title: 'Summary length',
    message: longSummary
      ? 'Your summary is quite long. Consider making it more concise.'
      : hasSummary
        ? 'Your summary length is reasonable.'
        : 'A professional summary is optional, but can help explain your background.',
  })

  checks.push({
    id: 'achievements',
    category: 'Readability',
    passed:
      !hasExperience ||
      measurableAchievementExists,
    title: 'Measurable achievements',
    message:
      !hasExperience
        ? 'Add experience first to evaluate achievement statements.'
        : measurableAchievementExists
          ? 'At least one experience description contains a measurable result.'
          : 'Consider adding real measurable results where they are supported by your experience.',
  })

  checks.push({
    id: 'single-column',
    category: 'Formatting',
    passed: allSingleColumnCompatible,
    title: 'Single-column ATS layout',
    message:
      'The current ATS-friendly layout is designed as a single-column resume.',
  })

  const passedCount = checks.filter(
    (check) => check.passed,
  ).length

  return {
    checks,
    passedCount,
    totalCount: checks.length,
  }
}

export function matchJobDescription(
  resume: Resume,
  jobDescription: string,
): KeywordMatchResult {
  const resumeText = getResumeText(resume)

  const descriptionKeywords =
    extractKeywords(jobDescription)

  const matchedKeywords =
    descriptionKeywords.filter((keyword) =>
      resumeText.includes(keyword),
    )

  const missingKeywords =
    descriptionKeywords.filter(
      (keyword) =>
        !resumeText.includes(keyword),
    )

  const keywordCoverage =
    descriptionKeywords.length === 0
      ? 0
      : Math.round(
          (matchedKeywords.length /
            descriptionKeywords.length) *
            100,
        )

  return {
    matchedKeywords,
    missingKeywords,
    keywordCoverage,
  }
}