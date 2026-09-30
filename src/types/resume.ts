/**
 * A resume date is stored consistently as:
 *
 * YYYY-MM
 *
 * Example:
 * 2025-02
 */
export type ResumeDate = string

/**
 * Supported profile photo formats.
 */
export type ProfilePhotoMimeType =
  | 'image/jpeg'
  | 'image/png'
  | 'image/webp'

/**
 * Profile photo information.
 *
 * dataUrl will allow us to persist the image in localStorage.
 */
export interface ProfilePhoto {
  dataUrl: string
  fileName: string
  mimeType: ProfilePhotoMimeType
}

/**
 * Personal information shown in the resume header.
 */
export interface PersonalInfo {
  fullName: string
  professionalTitle: string

  photo: ProfilePhoto | null

  email: string

  phoneCountryCode: string
  phoneNumber: string

  location: string

  linkedinUrl: string
  githubUrl: string
  portfolioUrl: string
}

/**
 * Professional summary.
 */
export interface ProfessionalSummary {
  content: string
}

/**
 * One work experience entry.
 */
export interface Experience {
  id: string

  jobTitle: string
  company: string
  location: string

  startDate: ResumeDate | null
  endDate: ResumeDate | null

  currentlyWorking: boolean

  description: string
}

/**
 * One education entry.
 */
export interface Education {
  id: string

  degree: string
  institution: string
  location: string

  startDate: ResumeDate | null
  endDate: ResumeDate | null

  currentlyStudying: boolean

  description: string
}

/**
 * One project entry.
 */
export interface Project {
  id: string

  name: string
  description: string

  technologies: string[]

  liveDemoUrl: string
  githubUrl: string
}

/**
 * One certification entry.
 */
export interface Certification {
  id: string

  name: string
  issuer: string

  issueDate: ResumeDate | null

  credentialUrl: string
}

/**
 * Allowed language proficiency values.
 *
 * We use a union instead of free text so the UI
 * can safely use a dropdown.
 */
export type LanguageProficiency =
  | 'Native'
  | 'Fluent'
  | 'Professional'
  | 'Upper Intermediate'
  | 'Intermediate'
  | 'Basic'
  | 'Beginner'

/**
 * One language entry.
 */
export interface Language {
  id: string

  language: string
  proficiency: LanguageProficiency
}

/**
 * One reference entry.
 */
export interface Reference {
  id: string

  fullName: string
  jobTitle: string
  company: string
  email: string

  phoneCountryCode: string
  phoneNumber: string

  relationship: string
}

/**
 * User-created custom resume section.
 *
 * Examples:
 * Awards
 * Publications
 * Volunteer Experience
 * Hackathons
 * Research
 */
export interface CustomSection {
  id: string

  title: string
  content: string

  showOnResume: boolean
}

/**
 * Complete Resume model.
 */
export interface Resume {
  /**
   * Allows us to safely migrate old saved resumes
   * when the data structure changes in the future.
   */
  schemaVersion: number

  createdAt: string
  updatedAt: string

  personalInfo: PersonalInfo

  summary: ProfessionalSummary

  experience: Experience[]

  education: Education[]

  projects: Project[]

  skills: string[]

  certifications: Certification[]

  languages: Language[]

  references: Reference[]

  showReferences: boolean

  customSections: CustomSection[]
}