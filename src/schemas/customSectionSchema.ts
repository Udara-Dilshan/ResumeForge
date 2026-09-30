import * as z from 'zod'

export const customSectionItemSchema = z.object({
  id: z.string(),

  title: z
    .string()
    .trim()
    .min(2, 'Section title is required'),

  content: z.string(),

  showOnResume: z.boolean(),
})

export const customSectionsSchema = z.object({
  customSections: z.array(
    customSectionItemSchema,
  ),
})