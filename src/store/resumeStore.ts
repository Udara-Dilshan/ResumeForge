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

interface ResumeStore {
  resume: Resume

  updateResume: (updates: Partial<Resume>) => void

  updatePersonalInfo: (updates: Partial<PersonalInfo>) => void

  resetResume: () => void
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: initialResume,

      updateResume: (updates) =>
        set((state) => ({
          resume: {
            ...state.resume,
            ...updates,
            updatedAt: new Date().toISOString(),
          },
        })),

      updatePersonalInfo: (updates) =>
        set((state) => ({
          resume: {
            ...state.resume,

            personalInfo: {
              ...state.resume.personalInfo,
              ...updates,
            },

            updatedAt: new Date().toISOString(),
          },
        })),

      resetResume: () =>
        set(() => ({
          resume: {
            ...initialResume,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        })),
    }),

    {
      name: 'resumeforge-resume',

      storage: createJSONStorage(() => localStorage),

      version: 1,
    },
  ),
)