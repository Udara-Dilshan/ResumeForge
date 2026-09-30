import * as z from 'zod'

export const summarySchema = z.object({
  content: z
    .string()
    .trim()
    .max(1000, 'Summary must be 1000 characters or less'),
})

export type SummaryFormData = z.infer<typeof summarySchema>