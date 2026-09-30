import * as z from 'zod'

const proficiencySchema = z.enum([
  'Native',
  'Fluent',
  'Professional',
  'Upper Intermediate',
  'Intermediate',
  'Basic',
  'Beginner',
])

export const languageItemSchema = z.object({
  id: z.string(),

  language: z
    .string()
    .trim()
    .min(2, 'Language is required'),

  proficiency: proficiencySchema,
})

export const languagesSchema = z.object({
  languages: z.array(languageItemSchema),
})