import { create } from 'zustand'
import {
  createJSONStorage,
  persist,
} from 'zustand/middleware'

import type {
  PersonalInfo,
  Resume,
} from '../types/resume'

import { initialResume } from '../utils/initialResume'

export type ResumeTemplate =
  | 'ats-classic'
  | 'modern'
  | 'compact'

interface ResumeStore {
  resume: Resume

  currentStep: number

  selectedTemplate: ResumeTemplate

  updateResume: (
    updates: Partial<Resume>,
  ) => void

  updatePersonalInfo: (
    updates: Partial<PersonalInfo>,
  ) => void

  nextStep: () => void

  previousStep: () => void

  goToStep: (step: number) => void

  setSelectedTemplate: (
    template: ResumeTemplate,
  ) => void

  resetResume: () => void
}

const MAX_STEP = 14

const createFreshResume = (): Resume => ({
  ...initialResume,

  personalInfo: {
    ...initialResume.personalInfo,
  },

  summary: {
    ...initialResume.summary,
  },

  experience: [],

  education: [],

  projects: [],

  skills: [],

  certifications: [],

  languages: [],

  references: [],

  showReferences: false,

  customSections: [],
})

export const useResumeStore =
  create<ResumeStore>()(
    persist(
      (set) => ({
        resume: createFreshResume(),

        currentStep: 1,

        selectedTemplate: 'ats-classic',

        updateResume: (updates) =>
          set((state) => {
            const now = new Date().toISOString()

            return {
              resume: {
                ...state.resume,
                ...updates,
                createdAt:
                  state.resume.createdAt || now,
                updatedAt: now,
              },
            }
          }),

        updatePersonalInfo: (updates) =>
          set((state) => {
            const now = new Date().toISOString()

            return {
              resume: {
                ...state.resume,

                personalInfo: {
                  ...state.resume.personalInfo,
                  ...updates,
                },

                createdAt:
                  state.resume.createdAt || now,
                updatedAt: now,
              },
            }
          }),

        nextStep: () =>
          set((state) => ({
            currentStep: Math.min(
              state.currentStep + 1,
              MAX_STEP,
            ),
          })),

        previousStep: () =>
          set((state) => ({
            currentStep: Math.max(
              state.currentStep - 1,
              1,
            ),
          })),

        goToStep: (step) =>
          set(() => ({
            currentStep: Math.min(
              Math.max(step, 1),
              MAX_STEP,
            ),
          })),

        setSelectedTemplate: (template) =>
          set(() => ({
            selectedTemplate: template,
          })),

        resetResume: () =>
          set(() => {
            const now =
              new Date().toISOString()

            return {
              resume: {
                ...createFreshResume(),
                createdAt: now,
                updatedAt: now,
              },

              currentStep: 1,

              selectedTemplate:
                'ats-classic',
            }
          }),
      }),

      {
        name: 'resumeforge-resume',

        storage: createJSONStorage(
          () => localStorage,
        ),

        version: 2,

        migrate: (persistedState) => {
          const oldState =
            persistedState as Partial<ResumeStore>

          const oldResume =
            oldState.resume as
              | Partial<Resume>
              | undefined

          const mergedResume: Resume = {
            ...createFreshResume(),
            ...oldResume,

            personalInfo: {
              ...createFreshResume()
                .personalInfo,
              ...(oldResume?.personalInfo ?? {}),
            },

            summary: {
              ...createFreshResume().summary,
              ...(oldResume?.summary ?? {}),
            },

            experience:
              oldResume?.experience ?? [],

            education:
              oldResume?.education ?? [],

            projects:
              oldResume?.projects ?? [],

            skills:
              oldResume?.skills ?? [],

            certifications:
              oldResume?.certifications ?? [],

            languages:
              oldResume?.languages ?? [],

            references:
              oldResume?.references ?? [],

            customSections:
              oldResume?.customSections ?? [],

            showReferences:
              oldResume?.showReferences ??
              false,

            schemaVersion:
              oldResume?.schemaVersion ??
              1,
          }

          return {
            resume: mergedResume,

            currentStep:
              oldState.currentStep ?? 1,

            selectedTemplate:
              oldState.selectedTemplate ??
              'ats-classic',
          }
        },
      },
    ),
  )