import * as z from 'zod'

const resumeDateSchema = z
  .string()
  .regex(
    /^\d{4}-(0[1-9]|1[0-2])$/,
    'Select a valid month and year',
  )

export const experienceItemSchema = z
  .object({
    id: z.string(),
    jobTitle: z
      .string()
      .trim()
      .min(2, 'Job title is required'),

    company: z
      .string()
      .trim()
      .min(2, 'Company is required'),

    location: z.string(),

    startDate: resumeDateSchema.nullable(),

    endDate: resumeDateSchema.nullable(),

    currentlyWorking: z.boolean(),

    description: z.string(),
  })
  .superRefine((item, context) => {
    if (!item.startDate) {
      context.addIssue({
        code: 'custom',
        path: ['startDate'],
        message: 'Start date is required',
      })
    }

    if (
      !item.currentlyWorking &&
      !item.endDate
    ) {
      context.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'End date is required',
      })
    }

    if (
      item.startDate &&
      item.endDate &&
      item.endDate < item.startDate
    ) {
      context.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'End date must be after the start date',
      })
    }
  })

export const experienceSchema = z.object({
  experience: z.array(
    experienceItemSchema,
  ),
})

export type ExperienceFormData =
  z.infer<typeof experienceSchema>