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
  currentStep: number

  updateResume: (updates: Partial<Resume>) => void
  updatePersonalInfo: (updates: Partial<PersonalInfo>) => void

  nextStep: () => void
  previousStep: () => void
  goToStep: (step: number) => void

  resetResume: () => void
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: initialResume,
      currentStep: 1,

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

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(
            state.currentStep + 1,
            12,
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
            12,
          ),
        })),

      resetResume: () =>
        set(() => ({
          resume: {
            ...initialResume,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },

          currentStep: 1,
        })),
    }),

    {
      name: 'resumeforge-resume',

      storage: createJSONStorage(
        () => localStorage,
      ),

      version: 1,
    },
  ),
)