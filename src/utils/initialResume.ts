import type {
  PersonalInfo,
  ProfessionalSummary,
  Resume,
} from '../types/resume'

const initialPersonalInfo: PersonalInfo = {
  fullName: '',
  professionalTitle: '',
  photo: null,

  email: '',

  phoneCountryCode: '+94',
  phoneNumber: '',

  location: '',

  linkedinUrl: '',
  githubUrl: '',
  portfolioUrl: '',
}

const initialSummary: ProfessionalSummary = {
  content: '',
}

export const initialResume: Resume = {
  schemaVersion: 1,

  createdAt: '',
  updatedAt: '',

  personalInfo: initialPersonalInfo,

  summary: initialSummary,

  experience: [],

  education: [],

  projects: [],

  skills: [],

  certifications: [],

  languages: [],

  references: [],

  showReferences: false,

  customSections: [],
}